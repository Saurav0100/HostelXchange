const Transaction = require("../models/Transaction");
const Product = require("../models/Product");

const getUserId = (req) => req.user?.id || req.user?._id;

// Create a transaction request.
exports.createTransaction = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { productId, rentalStartDate, rentalEndDate, exchangeDetails } =
      req.body;

    if (!userId) {
      return res.status(401).json({ message: "Authentication required." });
    }

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const product = await Product.findOneAndUpdate(
      { _id: productId, status: "Available" },
      { $set: { status: "Reserved" } },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found or is no longer available.",
      });
    }

    if (product.seller.toString() === userId.toString()) {
      await Product.findByIdAndUpdate(productId, { status: "Available" });
      return res.status(400).json({
        message: "You cannot request your own listing.",
      });
    }

    if (
      product.listingType === "Rent" &&
      (!rentalStartDate ||
        !rentalEndDate ||
        new Date(rentalEndDate) <= new Date(rentalStartDate))
    ) {
      await Product.findByIdAndUpdate(productId, { status: "Available" });
      return res.status(400).json({
        message: "Valid rental start and end dates are required.",
      });
    }

    if (product.listingType === "Exchange" && !exchangeDetails?.trim()) {
      await Product.findByIdAndUpdate(productId, { status: "Available" });
      return res.status(400).json({
        message: "Please describe the item you want to exchange.",
      });
    }

    try {
      const transaction = await Transaction.create({
        product: product._id,
        buyer: userId,
        seller: product.seller,
        listingType: product.listingType,
        agreedPrice: product.price,
        rentalStartDate:
          product.listingType === "Rent" ? rentalStartDate : null,
        rentalEndDate: product.listingType === "Rent" ? rentalEndDate : null,
        exchangeDetails:
          product.listingType === "Exchange" ? exchangeDetails.trim() : "",
      });

      const populatedTransaction = await Transaction.findById(transaction._id)
        .populate("product")
        .populate("buyer", "name email")
        .populate("seller", "name email");

      return res.status(201).json({
        message: "Transaction request created successfully.",
        transaction: populatedTransaction,
      });
    } catch (error) {
      await Product.findByIdAndUpdate(productId, { status: "Available" });
      throw error;
    }
  } catch (error) {
    return res.status(500).json({
      message: "Could not create transaction.",
      error: error.message,
    });
  }
};

// Get transactions where the user is buyer or seller.
exports.getMyTransactions = async (req, res) => {
  try {
    const userId = getUserId(req);

    const transactions = await Transaction.find({
      $or: [{ buyer: userId }, { seller: userId }],
    })
      .populate("product")
      .populate("buyer", "name email")
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ transactions });
  } catch (error) {
    return res.status(500).json({
      message: "Could not fetch transactions.",
      error: error.message,
    });
  }
};

// Seller responds to a request; buyer can cancel; buyer confirms completion.
exports.updateTransactionStatus = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { status } = req.body;

    const allowedStatuses = ["Accepted", "Rejected", "Completed", "Cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid transaction status." });
    }

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    const isBuyer = transaction.buyer.toString() === userId.toString();
    const isSeller = transaction.seller.toString() === userId.toString();

    if (!isBuyer && !isSeller) {
      return res
        .status(403)
        .json({ message: "You cannot update this transaction." });
    }

    if (status === "Accepted" || status === "Rejected") {
      if (!isSeller || transaction.status !== "Pending") {
        return res.status(403).json({
          message: "Only the seller can respond to a pending request.",
        });
      }
    }

    if (status === "Cancelled") {
      if (!isBuyer || !["Pending", "Accepted"].includes(transaction.status)) {
        return res.status(403).json({
          message: "Only the buyer can cancel a pending or accepted request.",
        });
      }
    }

    if (status === "Completed") {
      if (!isBuyer || transaction.status !== "Accepted") {
        return res.status(403).json({
          message: "Only the buyer can complete an accepted transaction.",
        });
      }
    }

    transaction.status = status;
    await transaction.save();

    if (["Rejected", "Cancelled"].includes(status)) {
      await Product.findByIdAndUpdate(transaction.product, {
        status: "Available",
      });
    }

    if (status === "Completed") {
      await Product.findByIdAndUpdate(transaction.product, {
        status: transaction.listingType === "Rent" ? "Available" : "Completed",
      });
    }

    const updatedTransaction = await Transaction.findById(transaction._id)
      .populate("product")
      .populate("buyer", "name email")
      .populate("seller", "name email");

    return res.status(200).json({
      message: `Transaction ${status.toLowerCase()} successfully.`,
      transaction: updatedTransaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Could not update transaction.",
      error: error.message,
    });
  }
};

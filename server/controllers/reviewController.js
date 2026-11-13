const Review = require("../models/Review");
const Transaction = require("../models/Transaction");

const getUserId = (req) => req.user?.id || req.user?._id;

// Create a review for a completed transaction.
exports.createReview = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { transactionId, rating, comment } = req.body;

    if (!transactionId || !rating) {
      return res.status(400).json({
        message: "Transaction ID and rating are required.",
      });
    }

    if (
      !Number.isInteger(Number(rating)) ||
      Number(rating) < 1 ||
      Number(rating) > 5
    ) {
      return res.status(400).json({
        message: "Rating must be a whole number from 1 to 5.",
      });
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    if (transaction.status !== "Completed") {
      return res.status(400).json({
        message: "You can review only completed transactions.",
      });
    }

    const isBuyer = transaction.buyer.toString() === userId.toString();
    const isSeller = transaction.seller.toString() === userId.toString();

    if (!isBuyer && !isSeller) {
      return res.status(403).json({
        message: "You were not part of this transaction.",
      });
    }

    const reviewee = isBuyer ? transaction.seller : transaction.buyer;

    const existingReview = await Review.findOne({
      transaction: transactionId,
      reviewer: userId,
    });

    if (existingReview) {
      return res.status(409).json({
        message: "You have already reviewed this transaction.",
      });
    }

    const review = await Review.create({
      transaction: transactionId,
      product: transaction.product,
      reviewer: userId,
      reviewee,
      rating: Number(rating),
      comment: comment || "",
    });

    const populatedReview = await Review.findById(review._id)
      .populate("reviewer", "name")
      .populate("reviewee", "name")
      .populate("product", "title");

    return res.status(201).json({
      message: "Review submitted successfully.",
      review: populatedReview,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already reviewed this transaction.",
      });
    }

    return res.status(500).json({
      message: "Could not submit review.",
      error: error.message,
    });
  }
};

// Get reviews for a product.
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("reviewer", "name")
      .populate("reviewee", "name")
      .sort({ createdAt: -1 });

    const averageRating = reviews.length
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      : 0;

    return res.status(200).json({
      totalReviews: reviews.length,
      averageRating: Number(averageRating.toFixed(1)),
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Could not fetch product reviews.",
      error: error.message,
    });
  }
};

// Get reviews received by the logged-in user.
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewee: getUserId(req) })
      .populate("reviewer", "name")
      .populate("product", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      totalReviews: reviews.length,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Could not fetch your reviews.",
      error: error.message,
    });
  }
};

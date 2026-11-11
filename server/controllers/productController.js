
const Product = require("../models/Product");

// Helper: get authenticated user's ID
const getUserId = (req) => {
    return req.user?.id || req.user?._id;
};

// CREATE PRODUCT LISTING
exports.createProduct = async (req, res) => {
    try {
        const sellerId = getUserId(req);

        if (!sellerId) {
            return res.status(401).json({
                message: "Please log in to create a listing."
            });
        }

        const {
            title,
            description,
            category,
            condition,
            listingType,
            price,
            priceUnit,
            exchangePreference,
            location,
            images
        } = req.body;

        const product = await Product.create({
            title,
            description,
            category,
            condition,
            listingType,
            price: listingType === "Exchange" ? price ?? null : price,
            priceUnit,
            exchangePreference,
            location,
            images,
            seller: sellerId
        });

        return res.status(201).json({
            message: "Product listed successfully!",
            product
        });

    } catch (error) {
        return res.status(400).json({
            message: "Unable to create product listing.",
            error: error.message
        });
    }
};


// GET ALL AVAILABLE PRODUCTS
exports.getAllProducts = async (req, res) => {
    try {
        const { category, listingType, search } = req.query;

        const filter = {
            status: "Available"
        };

        if (category) {
            filter.category = category;
        }

        if (listingType) {
            filter.listingType = listingType;
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        const products = await Product.find(filter)
            .populate("seller", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: products.length,
            products
        });

    } catch (error) {
        return res.status(500).json({
            message: "Unable to fetch products.",
            error: error.message
        });
    }
};


// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("seller", "name email");

        if (!product) {
            return res.status(404).json({
                message: "Product not found."
            });
        }

        return res.status(200).json({ product });

    } catch (error) {
        return res.status(400).json({
            message: "Invalid product ID.",
            error: error.message
        });
    }
};


// GET LOGGED-IN STUDENT'S LISTINGS
exports.getMyProducts = async (req, res) => {
    try {
        const sellerId = getUserId(req);

        if (!sellerId) {
            return res.status(401).json({
                message: "Please log in first."
            });
        }

        const products = await Product.find({
            seller: sellerId
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            count: products.length,
            products
        });

    } catch (error) {
        return res.status(500).json({
            message: "Unable to fetch your listings.",
            error: error.message
        });
    }
};


// UPDATE OWN PRODUCT
exports.updateProduct = async (req, res) => {
    try {
        const sellerId = getUserId(req);

        if (!sellerId) {
            return res.status(401).json({
                message: "Please log in first."
            });
        }

        const allowedFields = [
            "title",
            "description",
            "category",
            "condition",
            "listingType",
            "price",
            "priceUnit",
            "exchangePreference",
            "location",
            "images",
            "status"
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
                seller: sellerId
            },
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found or you don't own this listing."
            });
        }

        return res.status(200).json({
            message: "Product updated successfully!",
            product
        });

    } catch (error) {
        return res.status(400).json({
            message: "Unable to update product.",
            error: error.message
        });
    }
};


// DELETE OWN PRODUCT
exports.deleteProduct = async (req, res) => {
    try {
        const sellerId = getUserId(req);

        if (!sellerId) {
            return res.status(401).json({
                message: "Please log in first."
            });
        }

        const product = await Product.findOneAndDelete({
            _id: req.params.id,
            seller: sellerId
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found or you don't own this listing."
            });
        }

        return res.status(200).json({
            message: "Product deleted successfully!"
        });

    } catch (error) {
        return res.status(400).json({
            message: "Unable to delete product.",
            error: error.message
        });
    }
};

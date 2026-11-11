
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        // Basic product information
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000
        },

        // Product classification
        category: {
            type: String,
            required: true,
            enum: [
                "Books",
                "Electronics",
                "Furniture",
                "Clothing",
                "Sports",
                "Accessories",
                "Stationery",
                "Other"
            ]
        },

        condition: {
            type: String,
            required: true,
            enum: ["New", "Like New", "Good", "Fair"]
        },

        // How the owner wants to list the product
        // Buying is a customer action, not a listing type.
        listingType: {
            type: String,
            required: true,
            enum: ["Sell", "Rent", "Exchange"]
        },

        // Price is optional for an exchange listing.
        price: {
            type: Number,
            min: 0,
            default: null,
            validate: {
                validator: function (value) {
                    if (this.listingType === "Exchange") {
                        return value === null ||
                            value === undefined ||
                            value >= 0;
                    }

                    return value !== null &&
                        value !== undefined &&
                        value >= 0;
                },
                message: "A valid price is required for selling or renting."
            }
        },

        priceUnit: {
            type: String,
            enum: ["One-time", "Per day", "Per week", "Per month"],
            default: "One-time"
        },

        // For exchange listings
        exchangePreference: {
            type: String,
            trim: true,
            maxlength: 300,
            default: ""
        },

        // Product location
        location: {
            type: String,
            required: true,
            trim: true
        },

        // Product photographs (image URLs)
        images: {
            type: [String],
            default: []
        },

        // Student who owns and listed the product
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Listing availability
        status: {
            type: String,
            enum: ["Available", "Reserved", "Completed", "Inactive"],
            default: "Available"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);

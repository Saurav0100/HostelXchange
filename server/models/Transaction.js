
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        listingType: {
            type: String,
            enum: ["Sell", "Rent", "Exchange"],
            required: true
        },
        agreedPrice: {
            type: Number,
            min: 0,
            default: null
        },
        rentalStartDate: {
            type: Date,
            default: null
        },
        rentalEndDate: {
            type: Date,
            default: null
        },
        exchangeDetails: {
            type: String,
            trim: true,
            maxlength: 500,
            default: ""
        },
        status: {
            type: String,
            enum: [
                "Pending",
                "Accepted",
                "Rejected",
                "Completed",
                "Cancelled"
            ],
            default: "Pending"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);

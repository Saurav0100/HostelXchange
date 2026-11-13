const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTransaction,
  getMyTransactions,
  updateTransactionStatus,
} = require("../controllers/transactionController");

router.post("/", protect, createTransaction);
router.get("/my-transactions", protect, getMyTransactions);
router.patch("/:id/status", protect, updateTransactionStatus);

module.exports = router;

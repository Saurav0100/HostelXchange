const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createProduct,
  getAllProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Public routes
router.get("/", getAllProducts);

// Protected route: logged-in student's listings
router.get("/my-listings", protect, getMyProducts);

// Protected route: create listing
router.post("/", protect, createProduct);

// Protected routes: update and delete own listing
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

// Public route: get one product
router.get("/:id", getProductById);

module.exports = router;

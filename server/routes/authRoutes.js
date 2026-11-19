const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getMyProfile,
  updateMyProfile,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected profile routes
router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateMyProfile);

module.exports = router;

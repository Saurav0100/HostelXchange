const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  changePassword,
  getMyProfile,
  updateMyProfile,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, getMyProfile);
router.put("/profile", protect, updateMyProfile);

router.patch("/change-password", protect, changePassword);

module.exports = router;

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Reusable safe user response
const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  studentId: user.studentId || "",
  college: user.college,
  profileImage: user.profileImage || "",
});

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, studentId, college } = req.body;

    if (!name || !email || !password || !college || !studentId) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must contain at least 8 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      studentId: studentId.trim(),
      college: college.trim(),
    });

    return res.status(201).json({
      message: "Registration successful.",
      token: generateToken(user._id),
      user: formatUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Registration failed.",
      error: error.message,
    });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    return res.status(200).json({
      message: "Login successful.",
      token: generateToken(user._id),
      user: formatUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed.",
      error: error.message,
    });
  }
};

// GET LOGGED-IN USER PROFILE
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      user: formatUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to retrieve profile.",
      error: error.message,
    });
  }
};

// UPDATE LOGGED-IN USER PROFILE
exports.updateMyProfile = async (req, res) => {
  try {
    const { name, studentId, college } = req.body;

    if (!name?.trim() || !studentId?.trim() || !college?.trim()) {
      return res.status(400).json({
        message: "Name, Student ID and College are required.",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          name: name.trim(),
          studentId: studentId.trim(),
          college: college.trim(),
        },
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: formatUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to update profile.",
      error: error.message,
    });
  }
};

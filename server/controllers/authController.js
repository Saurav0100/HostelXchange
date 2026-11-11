
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// REGISTER
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, college } = req.body;

        if (!name || !email || !password || !college) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email is already registered."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            college
        });

        return res.status(201).json({
            message: "Registration successful.",
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Registration failed.",
            error: error.message
        });
    }
};

// LOGIN
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        return res.status(200).json({
            message: "Login successful.",
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                college: user.college
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Login failed.",
            error: error.message
        });
    }
};

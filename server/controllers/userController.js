// controllers/userController.js

import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// ✅ Signup new user
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing required details" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Account already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            bio
        });

        const token = generateToken(newUser._id);

        // remove password before sending
        const { password: _, ...userData } = newUser._doc;

        return res.status(201).json({
            success: true,
            userData,
            token,
            message: "Account created successfully"
        });
    } catch (error) {
        console.error("🔥 Signup Error:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ✅ Login existing user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing credentials" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const token = generateToken(user._id);

        // exclude password
        const { password: _, ...userData } = user._doc;

        return res.json({
            success: true,
            userData,
            token,
            message: "Login successful"
        });
    } catch (error) {
        console.error("🔥 Login Error:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ✅ Check if user is authenticated
export const checkAuth = (req, res) => {
    res.json({ success: true, user: req.user });
};

// ✅ Update user profile details
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;

        let updatedUser;
        if (profilePic) {
            // upload image to cloudinary
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { profilePic: upload.secure_url, bio, fullName },
                { new: true }
            ).select("-password");
        } else {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { bio, fullName },
                { new: true }
            ).select("-password");
        }

        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error("🔥 Update Profile Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

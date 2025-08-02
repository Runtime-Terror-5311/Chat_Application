// Middleware to protect routes

import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // ✅ FIXED

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "JWT must be provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ success: false, message: error.message });
  }
};

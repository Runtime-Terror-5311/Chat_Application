import jwt from "jsonwebtoken";

// ✅ Correct function with userId as argument
export const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d", // optional but recommended
    });
    return token;
};

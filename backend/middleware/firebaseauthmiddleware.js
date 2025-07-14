import { Blog } from "../models/blog.js";
import { auth } from "../configs/configs.js"; // Firebase Admin SDK setup

// Middleware to protect routes with Firebase token
export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken; // Firebase decoded token
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

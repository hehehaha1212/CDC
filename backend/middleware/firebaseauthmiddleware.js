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

// // Middleware to check for role
// export const requireRole = (...roles) => {
//   return (req, res, next) => {
//     if (!req.user || !roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     next();
//   };
// };

// // Middleware to check blog ownership
// export const blogownership = async (req, res, next) => {
//   try {
//     const blog = await Blog.findById(req.params.id);

//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     if (blog.author.toString() !== req.user.uid) {
//       return res.status(403).json({ message: "Not the blog owner" });
//     }

//     next();
//   } catch (error) {
//     console.error("Ownership check failed:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

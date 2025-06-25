import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/configs.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await connectDB();
    console.log("MongoDB connection successful");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};

connect();
app.use('api/home', homeRoutes);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("*", (req,res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
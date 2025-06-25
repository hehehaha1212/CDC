//configuratuion or setting up the ,mongo, cloudinary,firebase? ,multer 

import mongoose from "mongoose";
import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary"
const multer = require('multer');

dotenv.config();
//mongo for data storage
export const connectDB = async () => {
  mongoose.connection.on("connected");
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};
//cloudinary for image uploads
export const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
  })
};

//export const connectFirebase = () => {
//logic here
//  console.log("Firebase connection logic goes here");
//};

export const upload = multer({
    storage: multer.memoryStorage(),
    limit: { fileSize: 1024 * 1024 * 10 },
    fileFilter: (file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});


//configuratuion or setting up the ,mongo, cloudinary,firebase ,multer 

import mongoose from "mongoose";
import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary"
import multer from "multer";
import admin from "firebase-admin";
import { readFileSync } from "fs";

dotenv.config();
//---------------------MONGODB--------------------------
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
export const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

//------------------cloudinary for image uploads-------------------
export const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
  });
};

export const uploadToCloudinary = async (Path, folder)=>{
  try{
    const data= await cloudinary.uploader.upload(Path,{folder:folder});
    return{url:data.secure_url,publicID:data.public_id};
  }catch(error){
    console.error("failed to upload",error);
  }
};

//-------------------------FIREBASE----------------------
let auth = null;
try {
  if (!admin.apps.length) { 
    const serviceAccount = JSON.parse(
      readFileSync("./firebaseServiceAccountKey.json")
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("Firebase Admin SDK initialized successfully !!");
  } else {
    console.log("Firebase Admin SDK already initialized !!");
  }

  auth = admin.auth();
} catch (error) {
  console.error("Failed to initialize Firebase Admin SDK !! :", error.message);
}
export { auth };


//--------------------MULTER---------------------
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


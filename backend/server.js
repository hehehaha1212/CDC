import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/configs.js";
import routes from './routes/index.js'


dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

async () => {
  try {
    await connectDB();
    console.log("Mongo connection good");
  } catch (err) {
    console.error("Mongo connection bad", err);
  }
};

// Use Routes
app.use('/api', routes);
//on opening the site
app.get("/", (req, res) => {
  res.send("API working");
});

//listens to port for req 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


//is any other route
app.use('/{*any}', (req,res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
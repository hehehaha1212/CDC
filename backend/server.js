import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/configs.js";
import userRouter from "./routes/userRoutes.js";
import membersRouter from "./routes/membersRoutes.js";
import authRouter from "./routes/authRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import resourceRouter from "./routes/resourceRoutes.js";
import teamRouter from  "./routes/teamRouter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
r
app.use(express.json());
app.use(cors());

async () => {
  try {
    await connectDB();
    console.log("Mongo connection good");
  } catch (err) {
    console.log("error mongo");
    console.error("Mongo connection bad", err);
  }
};

app.use('/user', userRouter);
app.use('/members', membersRouter);
app.use('/auth', authRouter);
app.use('/event', eventRouter);
app.use('/resource',resourceRouter);
app.use('/team',teamRouter);


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
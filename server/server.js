import express, { Router } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import ConnectDb from "./config/Mongodb.js";
import authRouter from "./Routes/AuthRoute.js";
import userRouter from "./Routes/UserRoute.js";
import Striperouter from "./Routes/StripeRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

ConnectDb();
app.use(express.json());
app.use(cookieParser());

// ✅ Updated CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ecommerce-frontend-uknj.onrender.com"
  ],
  credentials: true
}));

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/stripe", Striperouter);

// ✅ Server listen
app.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});

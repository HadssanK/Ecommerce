
import express from "express"
import { getUserData } from "../Controller/UserController.js";
import { UserAuth } from "../Midelware/UserAuth.js";

const userRouter = express.Router();

userRouter.get("/Data",UserAuth, getUserData);

export default userRouter;
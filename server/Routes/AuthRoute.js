import express from "express"
import { GetAllUsers, IsAuthenticated, Login, Logout, Register, ResetPassword, sendResetOtp, SendVerifyOtp, VerifyEmail } from "../Controller/AuthController.js";
import { UserAuth } from "../Midelware/UserAuth.js";

const authRouter = express.Router();

authRouter.post("/register" , Register)
authRouter.post("/login" , Login)
authRouter.post("/logout" , Logout)
authRouter.post("/send-verify-Otp" , UserAuth, SendVerifyOtp)
authRouter.post("/verify-account" , UserAuth, VerifyEmail)
authRouter.get("/is-auth" , UserAuth, IsAuthenticated)
authRouter.post("/send-reset-Otp" ,  sendResetOtp)
authRouter.post("/reset-password" ,  ResetPassword)
authRouter.get('/all-users', GetAllUsers);



export default authRouter
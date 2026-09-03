import express from "express";
import * as AuthController from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/send-otp", AuthController.sendOtp);
authRouter.post("/verify-otp", AuthController.verifyOTP);
// authRouter.post("/logout", AuthController.logout);

export default authRouter;

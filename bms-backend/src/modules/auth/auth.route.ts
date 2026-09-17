import express from "express";
import * as AuthController from "./auth.controller";
import { isVerifiedUser } from "../../middlewares/auth.middleware";

const authRouter = express.Router();

authRouter.post("/send-otp", AuthController.sendOtp);
authRouter.post("/verify-otp", AuthController.verifyOTP);
authRouter.get("/refresh-token", AuthController.refreshToken);
authRouter.post("/logout", isVerifiedUser, AuthController.logout);

export default authRouter;

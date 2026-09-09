import express from "express";
import * as UserController from "./user.controller";
import { isVerifiedUser } from "../../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.post("/", UserController.createUser);
userRouter.get("/", UserController.getAllUsers);
userRouter.get("/me", isVerifiedUser, UserController.getUserById);
userRouter.put("/activate/:id", isVerifiedUser, UserController.activateUser);

export default userRouter;

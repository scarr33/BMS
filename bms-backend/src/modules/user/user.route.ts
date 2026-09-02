import { express } from "express";
import * as UserController from "./user.controller";

const userRouter = express.Router();

userRouter.post("/", UserController.createUser);
userRouter.get("/", UserController.getAllUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.put("/activate/:id", UserController.activateUser);

export default userRouter;

import { Router } from "express";
import userController from "./userController";
const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

export default userRouter;

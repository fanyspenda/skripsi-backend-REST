import { Router } from "express";
import userController from "./userController";
const userRouter = Router();
import paginate from "express-paginate";
import verifyToken from "modules/verifyToken";

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

export default userRouter;

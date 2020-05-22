import { Router } from "express";
import userController from "./userController";
const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/", userController.showAll);
userRouter.put("/:id", userController.updateOne);
userRouter.put("/resetPass/:id", userController.resetPass);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;

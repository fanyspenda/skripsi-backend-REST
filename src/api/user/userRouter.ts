import paginate from "express-paginate";
import { Router } from "express";
import userController from "./userController";
import verifyToken from "modules/verifyToken";
const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get(
	"/",
	verifyToken,
	paginate.middleware(40, 60),
	userController.showAll
);
userRouter.put("/:id", verifyToken, userController.updateOne);
userRouter.put("/resetPass/:id", verifyToken, userController.resetPass);
userRouter.delete("/:id", verifyToken, userController.deleteUser);

export default userRouter;

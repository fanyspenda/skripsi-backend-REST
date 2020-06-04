import { Router } from "express";
import { counterController } from "./counterController";
import verifyToken from "modules/verifyToken";
const counterRouter = Router();

counterRouter.get("/countAll", verifyToken, counterController.countAll);
counterRouter.get(
	"/countNotWorking",
	verifyToken,
	counterController.countNotWorking
);
counterRouter.get("/countWorking", verifyToken, counterController.countWorking);
counterRouter.get(
	"/countLinkedin",
	verifyToken,
	counterController.countLinkedin
);
counterRouter.get("/countAlumni", verifyToken, counterController.countAlumni);

export default counterRouter;

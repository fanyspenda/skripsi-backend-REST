import { Router } from "express";
import { counterController } from "./counterController";
const counterRouter = Router();

counterRouter.get("/countAll", counterController.countAll);
counterRouter.get("/countNotWorking", counterController.countNotWorking);
counterRouter.get("/countWorking", counterController.countWorking);
counterRouter.get("/countLinkedin", counterController.countLinkedin);
counterRouter.get("/countAlumni", counterController.countAlumni);

export default counterRouter;

import { Router } from "express";
import ControllerFacebookAlumni from "./alumniFacebookController";
const FacebookRouter = Router();

FacebookRouter.get("/", ControllerFacebookAlumni.index);
FacebookRouter.get("/:id", ControllerFacebookAlumni.show);
FacebookRouter.post("/", ControllerFacebookAlumni.store);
// AlumniRouter.delete("/", ControllerFacebookAlumni.clear);

export default FacebookRouter;

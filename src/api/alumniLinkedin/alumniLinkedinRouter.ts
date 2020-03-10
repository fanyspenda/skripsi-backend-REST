import { Router } from "express";
import ControllerLinkedinAlumni from "./alumniLinkedinController";
const LinkedinRouter = Router();

LinkedinRouter.get("/", ControllerLinkedinAlumni.index);
LinkedinRouter.get("/:id", ControllerLinkedinAlumni.show);
LinkedinRouter.post("/", ControllerLinkedinAlumni.store);
// AlumniRouter.delete("/", ControllerFacebookAlumni.clear);

export default LinkedinRouter;

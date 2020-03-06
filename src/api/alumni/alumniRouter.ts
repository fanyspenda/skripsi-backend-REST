import { Router } from "express";
import ControllerAlumni from "./alumniController";
const AlumniRouter = Router();

AlumniRouter.get("/", ControllerAlumni.index);
AlumniRouter.get("/:id", ControllerAlumni.show);
AlumniRouter.post("/", ControllerAlumni.store);
AlumniRouter.put("/:id", ControllerAlumni.update);

export default AlumniRouter;

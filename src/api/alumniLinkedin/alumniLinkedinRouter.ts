import { Router } from "express";
import ControllerLinkedinAlumni from "./alumniLinkedinController";
const LinkedinRouter = Router();
import paginate from "express-paginate";

LinkedinRouter.get(
	"/",
	paginate.middleware(20, 50),
	ControllerLinkedinAlumni.index
);
LinkedinRouter.get("/:id", ControllerLinkedinAlumni.show);
// LinkedinRouter.post("/", ControllerLinkedinAlumni.store);
// AlumniRouter.delete("/", ControllerFacebookAlumni.clear);

export default LinkedinRouter;

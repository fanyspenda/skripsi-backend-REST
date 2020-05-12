import { Router } from "express";
import ControllerLinkedinAlumni from "./alumniLinkedinController";
const LinkedinRouter = Router();
import paginate from "express-paginate";

LinkedinRouter.get(
	"/",
	paginate.middleware(40, 60),
	ControllerLinkedinAlumni.showAll
);
LinkedinRouter.get("/:id", ControllerLinkedinAlumni.showOne);

export default LinkedinRouter;

import paginate from "express-paginate";
import { Router } from "express";
import ControllerAlumni from "./alumniController";
const alumniRouter = Router();

alumniRouter.get("/", paginate.middleware(40, 60), ControllerAlumni.index);
alumniRouter.get("/:id", ControllerAlumni.show);
alumniRouter.post("/", ControllerAlumni.store);
alumniRouter.put("/:id", ControllerAlumni.update);

export default alumniRouter;

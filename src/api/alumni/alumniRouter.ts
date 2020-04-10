import paginate from "express-paginate";
import { Router } from "express";
import ControllerAlumni from "./alumniController";
import verifyToken from "modules/verifyToken";
const alumniRouter = Router();

alumniRouter.get("/", paginate.middleware(40, 60), ControllerAlumni.showAll);
alumniRouter.get("/:id", ControllerAlumni.showOne);
alumniRouter.post("/", ControllerAlumni.addOne);
alumniRouter.put("/:id", ControllerAlumni.updateOne);

export default alumniRouter;

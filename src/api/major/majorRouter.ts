import { Router } from "express";
import { majorController } from "./majorController";
const majorRouter = Router();
import paginate from "express-paginate";
import verifyToken from "modules/verifyToken";

majorRouter.get("/", paginate.middleware(40, 60), majorController.showAll);
majorRouter.get("/:id", majorController.showOne);
majorRouter.post("/", majorController.addOne);
majorRouter.delete("/:id", majorController.deleteOne);
majorRouter.put("/:id", majorController.updateOne);

export default majorRouter;

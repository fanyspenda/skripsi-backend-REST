import { Router } from "express";
const router = Router();
import AlumniRouter from "../api/alumni/alumniRouter";

router.use("/alumni", AlumniRouter);

export default router;

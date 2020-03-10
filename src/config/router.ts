import { Router } from "express";
const router = Router();
import AlumniRouter from "api/alumni/alumniRouter";
import alumniFacebookRouter from "api/alumniFacebook/alumniFacebookRouter";
import alumniLinkedinRouter from "api/alumniLinkedin/alumniLinkedinRouter";

router.use("/alumni", AlumniRouter);
router.use("/alumniFacebook", alumniFacebookRouter);
router.use("/alumniLinkedin", alumniLinkedinRouter);
export default router;

import { Router } from "express";
const router = Router();
import AlumniRouter from "api/alumni/alumniRouter";
import alumniFacebookRouter from "api/alumniFacebook/alumniFacebookRouter";
import alumniLinkedinRouter from "api/alumniLinkedin/alumniLinkedinRouter";
import verifyToken from "modules/verifyToken";
import userRouter from "api/user/userRouter";

router.use("/alumni", verifyToken, AlumniRouter);
// router.use("/alumniFacebook", alumniFacebookRouter);
router.use("/alumniLinkedin", verifyToken, alumniLinkedinRouter);
router.use("/user", userRouter);

export default router;

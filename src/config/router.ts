import { Router } from "express";
const router = Router();
import AlumniRouter from "api/alumni/alumniRouter";
import alumniLinkedinRouter from "api/alumniLinkedin/alumniLinkedinRouter";
import verifyToken from "modules/verifyToken";
import userRouter from "api/user/userRouter";
import majorRouter from "api/major/majorRouter";

//verifyToken ditaruh di sini karena semua endpoint dari route butuh authorisasi
router.use("/alumni", verifyToken, AlumniRouter);
router.use("/alumniLinkedin", verifyToken, alumniLinkedinRouter);
router.use("/user", userRouter);
router.use("/major", verifyToken, majorRouter);

export default router;

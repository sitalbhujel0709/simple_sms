import {Router} from "express";
import authRouter from "../modules/auth/auth.route";
import studentRouter from "../modules/students/student.route";

const router = Router();

router.use("/auth",authRouter)
router.use("/students",studentRouter)
export default router;
import {Router} from "express";
import authRouter from "../modules/auth/auth.route";
import studentRouter from "../modules/students/student.route";
import teacherRouter from "../modules/teachers/teacher.route";

const router = Router();

router.use("/auth",authRouter)
router.use("/students",studentRouter)
router.use("/teachers",teacherRouter)
export default router;
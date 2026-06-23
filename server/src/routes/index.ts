import {Router} from "express";
import authRouter from "../modules/auth/auth.route";
import studentRouter from "../modules/students/student.route";
import teacherRouter from "../modules/teachers/teacher.route";
import classroomRouter from "../modules/classroom/class.route";
import subjectRouter from "../modules/subjects/subject.route";

const router = Router();

router.use("/auth",authRouter)
router.use("/students",studentRouter)
router.use("/teachers",teacherRouter)
router.use("/classrooms", classroomRouter);
router.use("/subjects", subjectRouter);
export default router;
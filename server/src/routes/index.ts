import {Router} from "express";
import authRouter from "../modules/auth/auth.route";
import studentRouter from "../modules/students/student.route";
import teacherRouter from "../modules/teachers/teacher.route";
import classroomRouter from "../modules/classroom/class.route";
import subjectRouter from "../modules/subjects/subject.route";
import AcademicYearRouter from "../modules/academic_years/academicyear.route";
import EnrollmentRouter from "../modules/enrollments/enrollment.route";

const router = Router();

router.use("/auth",authRouter)
router.use("/students",studentRouter)
router.use("/teachers",teacherRouter)
router.use("/classrooms", classroomRouter);
router.use("/subjects", subjectRouter);
router.use("/academic-years",AcademicYearRouter)
router.use("/enrollments",EnrollmentRouter)
export default router;
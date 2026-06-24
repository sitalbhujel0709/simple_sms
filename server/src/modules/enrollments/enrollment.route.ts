import {Router} from "express";
import {EnrollmentController} from "./enrollment.controller";
import { requireAuth } from "../../middleware/requireAuth";

const EnrollmentRouter:Router = Router();
const enrollmentController = new EnrollmentController();

EnrollmentRouter.post('/student/:id',requireAuth, enrollmentController.enrollStudent);
EnrollmentRouter.get('/student/:id',requireAuth, enrollmentController.getEnrollmentsByStudentId);
EnrollmentRouter.get('/class/:classId/academic-year/:academicYearId',requireAuth, enrollmentController.getEnrollmentsByClassId);
EnrollmentRouter.delete('/:id',requireAuth, enrollmentController.deleteEnrollment);

export default EnrollmentRouter;
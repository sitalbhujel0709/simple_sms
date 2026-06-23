import {Router} from "express";
import { TeacherController } from "./teacher.controller";
import { requireAuth } from "../../middleware/requireAuth";

const teacherController = new TeacherController();
const teacherRouter:Router = Router();

teacherRouter.post("/",requireAuth,teacherController.createTeacher)
teacherRouter.get("/",requireAuth,teacherController.getAllTeachers)
teacherRouter.get("/:id",requireAuth,teacherController.getTeacherById)
teacherRouter.patch("/:id",requireAuth,teacherController.updateTeacher)

export default teacherRouter;
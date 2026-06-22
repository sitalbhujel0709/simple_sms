import {Router} from "express";
import {StudentController} from "./student.controller"
import { requireAuth } from "../../middleware/requireAuth";

const studentController = new StudentController();
const studentRouter:Router = Router();

studentRouter.post("/",requireAuth,studentController.createStudent)
studentRouter.get("/",requireAuth,studentController.getAllStudents)
studentRouter.get("/:id",requireAuth,studentController.getStudentById)
studentRouter.patch("/:id",requireAuth,studentController.updateStudent)

export default studentRouter;
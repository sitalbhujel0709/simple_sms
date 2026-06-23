import {Router} from "express";
import { ClassroomController } from "./class.controller";
import { requireAuth } from "../../middleware/requireAuth";

const classroomController = new ClassroomController();
const classroomRouter: Router = Router();

classroomRouter.post("/", requireAuth, classroomController.createClassroom);
classroomRouter.get("/", requireAuth, classroomController.getAllClassrooms);
classroomRouter.get("/:id", requireAuth, classroomController.getClassroomById);
classroomRouter.patch("/:id", requireAuth, classroomController.updateClassroom);

export default classroomRouter;
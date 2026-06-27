import {Router} from "express";
import { SubjectController } from "./subject.controller";
import { requireAuth } from "../../middleware/requireAuth";

const subjectController = new SubjectController();
const subjectRouter: Router = Router();

subjectRouter.post("/", requireAuth, subjectController.createSubject);
subjectRouter.get("/", requireAuth, subjectController.getAllSubjects);
subjectRouter.get("/:id", requireAuth, subjectController.getSubjectById);
subjectRouter.patch("/:id", requireAuth, subjectController.updateSubject);
subjectRouter.delete("/:id", requireAuth, subjectController.deleteSubject);

export default subjectRouter;
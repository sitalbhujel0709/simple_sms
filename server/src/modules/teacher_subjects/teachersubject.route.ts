import {Router} from 'express';
import {requireAuth} from '../../middleware/requireAuth';
import { TeacherSubjectController } from './teachersubject.controller';

const TeacherSubjectRouter:Router = Router();
const teacherSubjectController = new TeacherSubjectController();

TeacherSubjectRouter.post('/assign/:subjectId',requireAuth, teacherSubjectController.assignSubjectToTeacher);
TeacherSubjectRouter.get('/subjects/:teacherId',requireAuth, teacherSubjectController.getSubjectsByTeacherId);
TeacherSubjectRouter.delete('/remove/:teacherId/:subjectId',requireAuth, teacherSubjectController.removeSubjectFromTeacher);

export default TeacherSubjectRouter;


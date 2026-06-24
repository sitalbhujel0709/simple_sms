import type {Request, Response} from 'express';
import { TeacherSubjectService } from './teachersubject.service';

export class TeacherSubjectController {
  private teacherSubjectService = new TeacherSubjectService();

  assignSubjectToTeacher = async (req: Request, res: Response): Promise<Response | void> => {
    const {subjectId} = req.params;
    const {teacherId} = req.body;
    try {
      const subjectTeacher = await this.teacherSubjectService.assignSubjectToTeacher({teacherId, subjectId: Number(subjectId)});
      return res.status(201).json(subjectTeacher);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  getSubjectsByTeacherId = async (req: Request, res: Response): Promise<Response | void> => {
    const {teacherId} = req.params;
    try {
      const subjects = await this.teacherSubjectService.getSubjectsByTeacherId(Number(teacherId));
      return res.status(200).json(subjects);
    }
    catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  removeSubjectFromTeacher = async (req: Request, res: Response): Promise<Response | void> => {
    const {teacherId, subjectId} = req.params;
    try {
      await this.teacherSubjectService.removeSubjectFromTeacher({teacherId: Number(teacherId), subjectId: Number(subjectId)});
      return res.status(200).json({ message: "Subject removed from teacher successfully" });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
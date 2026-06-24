import {EnrollmentService} from "./enrollment.service";
import type { Request, Response } from 'express';

export class EnrollmentController {
  private enrollmentService = new EnrollmentService();

  enrollStudent = async (req: Request, res: Response) => {
    const {classId, academicYearId} = req.body;
    const {id: studentId} = req.params;
    try {
      const enrollment = await this.enrollmentService.enrollStudent(Number(studentId), Number(classId), Number(academicYearId));
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  getEnrollmentsByStudentId = async (req: Request, res: Response) => {
    const {id: studentId} = req.params;
    try {
      const enrollments = await this.enrollmentService.getEnrollmentsByStudentId(Number(studentId));
      res.status(200).json(enrollments);
    }
    catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  getEnrollmentsByClassId = async (req: Request, res: Response) => {
    const {classId, academicYearId} = req.params;
    try {
      const enrollments = await this.enrollmentService.getEnrollmentsByClassId(Number(classId), Number(academicYearId));
      res.status(200).json(enrollments);
    }
    catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  deleteEnrollment = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
      const enrollment = await this.enrollmentService.deleteEnrollment(Number(id));
      res.status(200).json(enrollment);
    }
    catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
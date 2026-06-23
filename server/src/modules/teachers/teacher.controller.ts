import { TeacherService } from "./teacher.service";
import type { Request, Response } from "express";

export class TeacherController {
  private teacherService = new TeacherService();

  createTeacher = async (
    req: Request,
    res: Response,
  ): Promise<void | Response> => {
    const { name, email, password, dateOfBirth, address, gender, phoneNumber } =
      req.body;
    try {
      const teacher = await this.teacherService.createTeacher({
        name,
        email,
        password,
        dateOfBirth: new Date(dateOfBirth),
        address,
        gender,
        phoneNumber,
      });
      res.status(201).json(teacher);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
  getAllTeachers = async (
    req: Request,
    res: Response,
  ): Promise<void | Response> => {
    try {
      const teachers = await this.teacherService.getAllTeachers();
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
  getTeacherById = async (
    req: Request,
    res: Response,
  ): Promise<void | Response> => {
    const teacherId = req.params.id;
    try {
      const teacher = await this.teacherService.getTeacherById(
        Number(teacherId),
      );
      if (!teacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }
      return res.status(200).json(teacher);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  };
  updateTeacher = async (
    req: Request,
    res: Response,
  ): Promise<void | Response> => {
    const teacherId = req.params.id;
    try {
      const teacher = await this.teacherService.updateTeacher(
        Number(teacherId),
        req.body,
      );
      return res.status(200).json(teacher);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  };
}

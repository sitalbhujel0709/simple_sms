import { ClassroomService } from "./class.service";
import type { Request, Response } from "express";

export class ClassroomController {
  private classroomService = new ClassroomService();

  createClassroom = async (req: Request, res: Response): Promise<Response | void> => {
    const { name, section } = req.body;
    try {
      const classroom = await this.classroomService.createClassroom(
        name,
        section,
      );
      return res.status(201).json(classroom);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  getAllClassrooms = async (req: Request, res: Response): Promise<Response> => {
    try {
      const classrooms = await this.classroomService.getAllClassrooms();
      return res.status(200).json(classrooms);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  getClassroomById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const classroom = await this.classroomService.getClassroomById(Number(id));
      if (!classroom) {
        return res.status(404).json({ message: "Classroom not found" });
      }
      return res.status(200).json(classroom);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  updateClassroom = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const updatedClassroom = await this.classroomService.updateClassroom(
        Number(id),
        req.body
      );
      return res.status(200).json(updatedClassroom);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}

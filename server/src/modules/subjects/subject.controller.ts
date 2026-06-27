import { SubjectService } from "./subject.service";
import type { Request, Response } from "express";

export class SubjectController {
  private subjectService = new SubjectService();

  createSubject = async (req:Request, res:Response)=>{
    const {subjectName, subjectCode, classId} = req.body;
    try {
      const subject = await this.subjectService.createSubject({subjectName, subjectCode, classId});
      return res.status(201).json(subject);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
  getAllSubjects = async (req:Request, res:Response)=>{

    try {
      const subjects = await this.subjectService.getAllSubjects();
      return res.status(200).json(subjects);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  getSubjectById = async (req:Request, res:Response)=>{
    const { id } = req.params;
    try {
      const subject = await this.subjectService.getSubjectById(Number(id));
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
      return res.status(200).json(subject);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  updateSubject = async (req:Request, res:Response)=>{
    const { id } = req.params;
    try {
      const { subjectName, subjectCode, classId } = req.body;
      const updatedSubject = await this.subjectService.updateSubject(Number(id), { subjectName, subjectCode, classId });
      return res.status(200).json(updatedSubject);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  deleteSubject = async (req:Request, res:Response)=>{
    const { id } = req.params;
    try {
      const deletedSubject = await this.subjectService.deleteSubject(Number(id));
      return res.status(200).json(deletedSubject);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
import { StudentService } from "./student.service";
import type {Request,Response} from "express";

export class StudentController {
  private studentService = new StudentService();

  createStudent = async (req:Request,res:Response):Promise<void | Response>=>{
    const {name,email,password,dateOfBirth,address,gender,phoneNumber} = req.body;
    try {
      const student = await this.studentService.createStudent({
        name,
        email,
        password,
        dateOfBirth: new Date(dateOfBirth),
        address,
        gender,
        phoneNumber
      })
      return res.status(201).json(student);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  getAllStudents = async (req:Request,res:Response):Promise<void | Response>=>{
    try {
      const students = await this.studentService.getAllStudents();
      return res.status(200).json(students);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
  getStudentById = async (req:Request,res:Response):Promise<void | Response>=>{
    const studentId = req.params.id;
    try {
      const student = await this.studentService.getStudentById(Number(studentId));
      if(!student){
        return res.status(404).json({ error: "Student not found" });
      }
      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
  updateStudent = async (req:Request,res:Response):Promise<void | Response>=>{
    const studentId = req.params.id;
    try {
      const student = await this.studentService.updateStudent(Number(studentId),req.body);
      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}
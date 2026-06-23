import { prisma } from "../../config/prisma";
import { Subject } from "../../generated/prisma/client";

export class SubjectService {
  private prisma = prisma;

  async createSubject(data:{subjectName: string,subjectCode: string,classId: number}):Promise<Subject>{
    const existingSubject = await this.prisma.subject.findUnique({
      where: {
        subjectCode: data.subjectCode,
      },
    });
    if (existingSubject) {
      throw new Error("Subject with this code already exists");
    }
    const subject = await this.prisma.subject.create({
      data: {
        subjectName: data.subjectName,
        subjectCode: data.subjectCode,
        classId: data.classId,
      }
    });
    return subject;
  }
  async getAllSubjects(): Promise<Subject[]> {
    const subjects = await this.prisma.subject.findMany({});
    return subjects;
  }
  async getSubjectById(id: number): Promise<Subject | null> {
    const subject = await this.prisma.subject.findUnique({
      where: {
        id: id,
      },
    });
    if (!subject) {
      return null;
    }
    return subject;
  }

  async updateSubject(id: number, data: { subjectName?: string; subjectCode?: string; classId?: number }): Promise<Subject> {
    const existingSubject = await this.prisma.subject.findUnique({
      where: {
        id: id,
      },    });
    if (!existingSubject) {
      throw new Error("Subject not found");
    }
    const updatedSubject = await this.prisma.subject.update({
      where: {
        id: id,
      },
      data: {
        subjectName: data.subjectName,
        subjectCode: data.subjectCode,
        classId: data.classId,
      },
    });
    return updatedSubject;
  }
}
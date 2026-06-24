import {prisma} from "../../config/prisma"
import { Enrollment } from "../../generated/prisma/client";

export class EnrollmentService {
  private prisma = prisma;

  async enrollStudent(studentId: number, classId: number, academicYearId: number):Promise<Enrollment> {
    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: {
        studentId_classId_academicYearId: {
          studentId,
          classId,
          academicYearId
        }
      }
    })
    if(existingEnrollment) {
      throw new Error(`Student with ID ${studentId} is already enrolled in class with ID ${classId} for academic year with ID ${academicYearId}.`);
    }
    const enrollment = await this.prisma.enrollment.create({
      data: {
        studentId,
        classId,
        academicYearId
      }
    })
    return enrollment;
  }
  async getEnrollmentsByStudentId(studentId: number):Promise<Enrollment[]> {
    const enrollments = await this.prisma.enrollment.findMany({
      where: {
        studentId
      },
      include: {
        class: true,
        academicYear: true,
        student: true
      }

    })
    return enrollments;
  }

  async getEnrollmentsByClassId(classId: number, academicYearId: number):Promise<Enrollment[]> {
    const enrollments = await this.prisma.enrollment.findMany({
      where: {
        classId,
        academicYearId
      },
      include: {
        student: true,
        academicYear: true,
        class: true
      }
    })
    return enrollments;
  }

  async deleteEnrollment(id: number):Promise<Enrollment> {
    const enrollment = await this.prisma.enrollment.delete({
      where: {
        id
      }
    })
    return enrollment;
  }
}
        
import { prisma } from "../../config/prisma";
import { StudentProfile } from "../../generated/prisma/client";
import {
  createStudentDTO,
  getStudentByIdResponse,
  StudentResponse,
} from "./student.types";
import bcrypt from "bcrypt";

export class StudentService {
  private prisma = prisma;

  async createStudent(data: createStudentDTO): Promise<StudentResponse> {
    const existingStudent = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existingStudent) {
      throw new Error("Student with this email already exists");
    }
    const passwordHash = await bcrypt.hash(data.password, 10);
    const student = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash,
        },
      });
      const studentProfile = await tx.studentProfile.create({
        data: {
          userId: user.id,
          dateOfBirth: data.dateOfBirth,
          address: data.address,
          gender: data.gender,
          phoneNumber: data.phoneNumber,
        },
      });
      const { passwordHash: _, ...studentProfileWithoutPassword } = user;
      return { user: studentProfileWithoutPassword, studentProfile };
    });
    return student;
  }
  async getAllStudents(): Promise<StudentProfile[]> {
    const students = await this.prisma.studentProfile.findMany({});
    return students;
  }

  async getStudentById(
    studentId: number,
  ): Promise<getStudentByIdResponse | null> {
    const student = await this.prisma.studentProfile.findUnique({
      where: {
        userId: studentId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
    if (!student) {
      return null;
    }
    const { user, ...studentProfile } = student;
    return { ...user, ...studentProfile };
  }
  async updateStudent(
    studentId: number,
    data: Partial<createStudentDTO>,
  ): Promise<StudentProfile> {
    const student = await this.prisma.studentProfile.update({
      where: {
        userId: studentId,
      },
      data: {
        ...(data.dateOfBirth && {
          dateOfBirth: new Date(data.dateOfBirth),
        }),
        ...(data.address && {
          address: data.address,
        }),
        ...(data.gender && {
          gender: data.gender,
        }),
        ...(data.phoneNumber && {
          phoneNumber: data.phoneNumber,
        }),

        user:
          data.name || data.email
            ? {
                update: {
                  ...(data.name && { name: data.name }),
                  ...(data.email && { email: data.email }),
                },
              }
            : undefined,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
    return student;
  }
}

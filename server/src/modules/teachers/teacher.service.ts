import { prisma } from "../../config/prisma";
import { TeacherProfile } from "../../generated/prisma/client";
import { createTeacherDTO, getTeacherByIdResponse, TeacherResponse } from "./teacher.types";
import bcrypt from "bcrypt";
export class TeacherService {
  private prisma = prisma;

  async createTeacher(data: createTeacherDTO): Promise<TeacherResponse> {
    const existingTeacher = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existingTeacher) {
      throw new Error("Teacher with this email already exists");
    }
    const passwordHash = await bcrypt.hash(data.password, 10);
    const teacher = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash: passwordHash,
          role: "TEACHER",
        },
      });
      const teacherProfile = await tx.teacherProfile.create({
        data: {
          userId: user.id,
          dateOfBirth: data.dateOfBirth,
          address: data.address,
          gender: data.gender,
          phoneNumber: data.phoneNumber,
        },
      });
      return { user, teacherProfile };
    });
    return teacher;
  }
  async getAllTeachers(): Promise<TeacherProfile[]> {
    const teachers = await this.prisma.teacherProfile.findMany({});
    return teachers;
  }
  async getTeacherById(id: number): Promise<getTeacherByIdResponse | null> {
    const teacher = await this.prisma.teacherProfile.findUnique({
      where: {
        userId: id,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
          }
        }
      }
    });
    if(!teacher) {
      return null;
    }
    const { user, ...teacherProfile } = teacher;
    return { ...user, ...teacherProfile };
  }
  async updateTeacher(id: number, data: Partial<createTeacherDTO>): Promise<TeacherProfile> {
    const teacher = await this.prisma.teacherProfile.update({
      where: {
        userId: id,
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
    return teacher;
  }
}

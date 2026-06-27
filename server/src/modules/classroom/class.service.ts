import { prisma } from "../../config/prisma";
import { Class } from "../../generated/prisma/client";

export class ClassroomService {
  private prisma = prisma;

  async createClassroom(name: string, section: string):Promise<Class> {
    const existingClassroom = await this.prisma.class.findUnique({
      where: {
        name_section: {
          name: name,
          section: section,
        },
      },
    });
    if (existingClassroom) {
      throw new Error("Classroom with this name and section already exists");
    }
    const classroom = await this.prisma.class.create({
      data: {
        name: name,
        section: section,
      }
    })
    return classroom;
  }
  async getAllClassrooms(): Promise<Class[]> {
    const classrooms = await this.prisma.class.findMany({});
    return classrooms;
  }
  async getClassroomById(id: number): Promise<Class | null> {
    const classroom = await this.prisma.class.findUnique({
      where: {
        id: id,
      },
    });
    if (!classroom) {
      return null;
    }
    return classroom;
  }
  async updateClassroom(id: number, data: { name?: string; section?: string }): Promise<Class | null> {
    const existingClassroom = await this.prisma.class.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingClassroom) {
      return null;
    }
    const updatedClassroom = await this.prisma.class.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        section: data.section,
      },
    });
    return updatedClassroom;
  }
  async deleteClassroom(id: number): Promise<Class> {
    const existingClassroom = await this.prisma.class.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingClassroom) {
      throw new Error("Classroom not found");
    }
    const deletedClassroom = await this.prisma.class.delete({
      where: {
        id: id,
      },
    });
    return deletedClassroom;
  }
}

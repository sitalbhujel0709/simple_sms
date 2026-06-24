import {prisma} from "../../config/prisma";
import { AcademicYear } from "../../generated/prisma/client";

export class AcademicYearService {

  private prisma = prisma;
  async createAcademicYear(data: { year: string}):Promise<AcademicYear>{
    const existingAcademicYear = await this.prisma.academicYear.findUnique({
      where: {
        year: data.year,
      },
    });

    if(existingAcademicYear){
      throw new Error(`Academic year ${data.year} already exists.`);
    }

    const academicYear = await this.prisma.academicYear.create({
      data: {
        year: data.year,
      }
    });

    return academicYear;

  }

  async getAllAcademicYears(): Promise<AcademicYear[]> {
    const academicYears = await this.prisma.academicYear.findMany();
    return academicYears;
  }
}
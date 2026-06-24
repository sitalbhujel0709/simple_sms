import {prisma} from "../../config/prisma"
import { SubjectTeacher } from "../../generated/prisma/browser";

export class TeacherSubjectService {

  async assignSubjectToTeacher({teacherId, subjectId}: {teacherId: number, subjectId: number}) : Promise<SubjectTeacher>{
    const existingSubjectTeacher = await prisma.subjectTeacher.findUnique({
      where: {
        teacherId_subjectId: {
          teacherId,
          subjectId
        }
      }
    })
    if (existingSubjectTeacher) {
      throw new Error("Subject is already assigned to this teacher")
    }
    const subjectTeacher = await prisma.subjectTeacher.create({
      data: {
        teacherId,
        subjectId
      }
    })
    return subjectTeacher
  }

  async getSubjectsByTeacherId(teacherId: number): Promise<SubjectTeacher[]>{
    const subjects = await prisma.subjectTeacher.findMany({
      where:{
        teacherId
      },
      include: {
        subject: true
      }
    })
    return subjects
  }

  async removeSubjectFromTeacher({teacherId, subjectId}: {teacherId: number, subjectId: number}): Promise<void>{
    await prisma.subjectTeacher.delete({
      where: {
        teacherId_subjectId: {
          teacherId,
          subjectId
        }
      }
    })
  }
}
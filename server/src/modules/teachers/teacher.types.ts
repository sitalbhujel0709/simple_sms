import { User,TeacherProfile } from "../../generated/prisma/client";

interface createTeacherDTO {
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  address: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  phoneNumber: string;
}

interface TeacherResponse {
  user: Omit<User, "passwordHash">;
  teacherProfile: TeacherProfile;
}

interface getTeacherByIdResponse extends TeacherProfile {
  name: string;
  email: string;
  role: string;
}

export type {createTeacherDTO,TeacherResponse,getTeacherByIdResponse}
import { StudentProfile, User } from "../../generated/prisma/browser";

interface createStudentDTO {
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  address: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  phoneNumber: string;
}
interface StudentResponse {
  user: Omit<User, "passwordHash">;
  studentProfile:StudentProfile;
}

interface getStudentByIdResponse extends StudentProfile {
  name: string;
  email: string;
  role: string;
}
export type {createStudentDTO,StudentResponse,getStudentByIdResponse}
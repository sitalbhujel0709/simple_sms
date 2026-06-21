interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "STUDENT" | "TEACHER";
}


export type {RegisterDTO}
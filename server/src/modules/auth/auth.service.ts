import { prisma } from "../../config/prisma";
import { User } from "../../generated/prisma/client";
import { RegisterDTO } from "./auth.types";
import bcrypt from "bcrypt";

export class AuthService {
  private prisma = prisma;
  async registerUser({name,email,password}: RegisterDTO):Promise<Omit<User, "passwordHash">>{
    const existingUser = await this.prisma.user.findUnique({
      where:{
        email
      }
    });
    if(existingUser){
      throw new Error("User with this email already exists");
    }
    const passwordHash = await bcrypt.hash(password,10);
    const user = await this.prisma.user.create({
      data:{
        name,
        email,
        passwordHash,
        role: "ADMIN"
      }
    })
    const {passwordHash:_,...userWithoutPassword} = user;
    return userWithoutPassword;
  }

  async loginUser(email: string, password: string):Promise<Omit<User, "passwordHash">>{
    const user = await this.prisma.user.findUnique({
      where:{
        email
      }
    });
    if(!user){
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if(!isPasswordValid){
      throw new Error("Invalid email or password");
    }
    const {passwordHash:_,...userWithoutPassword} = user;
    return userWithoutPassword;
  }
  async getProfile(id:number):Promise<Omit<User,"passwordHash">>{
    const user = await this.prisma.user.findUnique({
      where:{
        id
      }
    })
    if(!user){
      throw new Error("User not found");
    }
    const {passwordHash:_,...userWithoutPassword} = user;
    return userWithoutPassword;
  }
}
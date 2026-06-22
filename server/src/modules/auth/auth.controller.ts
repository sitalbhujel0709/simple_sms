import { generateToken } from "../../utils/jwt";
import { AuthService } from "./auth.service";
import type {Request, Response} from "express";

export class AuthController {
  private authSevice = new AuthService();

  registerUser = async (req: Request,res: Response):Promise<void | Response>=>{
    const {name,email,password} = req.body;
    try {
      const user = await this.authSevice.registerUser({name,email,password});
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({error: "Internal server error"});
    }
  }
  loginUser = async (req: Request,res: Response):Promise<void | Response>=>{
    const {email,password} = req.body;
    try {
      const user = await this.authSevice.loginUser(email,password);
      if(!user){
        return res.status(400).json({error: "Invalid email or password"});
      }
      const token = await generateToken({userId: user.id, role: user.role});
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      return res.status(200).json({user, token});
    } catch (error) {
      return res.status(500).json({error: "Internal server error"});
    }
  }
}
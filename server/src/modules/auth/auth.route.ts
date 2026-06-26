import {Router} from "express";
import {AuthController} from "./auth.controller";
import { requireAuth } from "../../middleware/requireAuth";

const authRouter: Router = Router();
const authController = new AuthController();

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);
authRouter.get("/profile",requireAuth,authController.getProfile)
authRouter.post("/logout",requireAuth,authController.logoutUser)
export default authRouter;
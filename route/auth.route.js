import { Router } from "express";
import signUP from "../controller/auth/signUp.controller.js"; 
import signIn from "../controller/auth/signIn.controller.js";
import signOut from "../controller/auth/signOut.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUP);

authRouter.post("/sign-in", signIn);

authRouter.post("/sign-out", signOut);


export default authRouter;
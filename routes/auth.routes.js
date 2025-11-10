import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const authRouther = Router();

//Path: /api/v1/auth/sign-up(POST) 
authRouther.post('/sign-up', signUp);
authRouther.post('/sign-in', signIn)
authRouther.post('/sign-out', signOut)

export default authRouther;
import { Router } from "express";

const authRouther = Router();

authRouther.post('/sign-up', (req,res) => {
    res.send("Sign-up")
})
authRouther.post('/sign-in', (req,res) => {
    res.send("Sign-in")
})
authRouther.post('/sign-out', (req,res) => {
    res.send("Sign-out")
})

export default authRouther;
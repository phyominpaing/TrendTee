import type { Request, Response } from "express";
import { User } from "../models/user.ts";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists with this email address");
  }
  
};

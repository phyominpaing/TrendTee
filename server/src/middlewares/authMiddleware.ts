import jwt, { type JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import { User } from "../models/user.ts";
import  { Types } from "mongoose";

interface User {
  _id: string | Types.ObjectId;
  name: string;
  email: string;
  role: "customer" | "admin";
}

export interface AuthRequest extends Request {
  user?: User;
}

export const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.token;

    if (!token) {
      res.status(401);
      throw new Error("Not authorized. Please log in.");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      if (!decoded) {
        res.status(401);
        throw new Error("Not authorized. Invalid token.");
      }

      req.user = (await User.findById(decoded.userId).select(
        "-password",
      )) as User;

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized. Invalid token.");
    }
  },
);

export const isAdmin = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "admin") {
      res.status(403);
      throw new Error("Not authorized. You are not an admin.");
    }
    next();
  },
);

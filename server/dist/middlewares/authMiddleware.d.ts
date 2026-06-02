import type { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { Types } from "mongoose";
interface User {
    _id: string | Types.ObjectId;
    name: string;
    email: string;
    role: "customer" | "admin";
}
export interface AuthRequest extends Request {
    user?: User;
}
export declare const protect: (req: Request, res: Response, next: NextFunction) => void;
export declare const isAdmin: (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=authMiddleware.d.ts.map
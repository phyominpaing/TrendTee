import type { Request, Response } from "express";
export declare const registerUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const loginUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const logoutUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const uploadAvatar: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const getUserInfo: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const updateUserProfile: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const updatePassword: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const sendForgotPasswordEmail: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const resetPassword: (req: Request, res: Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=user.d.ts.map
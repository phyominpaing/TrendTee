import jwt, {} from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.js";
import { Types } from "mongoose";
export const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.token;
    if (!token) {
        res.status(401);
        throw new Error("Not authorized. Please log in.");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            res.status(401);
            throw new Error("Not authorized. Invalid token.");
        }
        req.user = (await User.findById(decoded.userId).select("-password"));
        next();
    }
    catch (error) {
        res.status(401);
        throw new Error("Not authorized. Invalid token.");
    }
});
export const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user?.role !== "admin") {
        res.status(403);
        throw new Error("Not authorized. You are not an admin.");
    }
    next();
});
//# sourceMappingURL=authMiddleware.js.map
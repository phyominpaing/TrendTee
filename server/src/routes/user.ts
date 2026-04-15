import { Router } from "express";
import {
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  uploadAvatar,
} from "../controllers/user.ts";
import { protect } from "../middlewares/authMiddleware.ts";
import {
  loginValidator,
  registerValidator,
  uploadImageValidator,
} from "../validators/user.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";

const router = Router();

router.post("/register", registerValidator, validateRequest, registerUser);
router.post("/login", loginValidator, validateRequest, loginUser);
router.post("/logout", logoutUser);

router.post(
  "/upload",
  uploadImageValidator,
  validateRequest,
  protect,
  uploadAvatar,
);

router.get("/me", protect, getUserInfo);

export default router;

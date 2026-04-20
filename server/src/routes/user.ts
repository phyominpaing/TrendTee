import { Router } from "express";
import {
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  updateUserProfile,
  uploadAvatar,
} from "../controllers/user.ts";
import { protect } from "../middlewares/authMiddleware.ts";
import {
  loginValidator,
  registerValidator,
  updatePasswordValidator,
  uploadImageValidator,
  userInfoUpdateValidator,
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

router.post(
  "/user/update",
  protect,
  userInfoUpdateValidator,
  validateRequest,
  updateUserProfile,
);

router.post(
  "/update-password",
  protect,
  updatePasswordValidator,
  validateRequest,
  updatePassword,
);

export default router;

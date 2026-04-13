import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  uploadAvatar,
} from "../controllers/user.ts";
import { protect } from "../middlewares/authMiddleware.ts";
import { uploadImageValidator } from "../validators/user.ts";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.post("/upload", uploadImageValidator, protect, uploadAvatar);

export default router;

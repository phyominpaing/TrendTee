import { Router } from "express";
import { getUserInfo, loginUser, logoutUser, registerUser, resetPassword, sendForgotPasswordEmail, updatePassword, updateUserProfile, uploadAvatar, } from "../controllers/user.js";
import { protect } from "../middlewares/authMiddleware.js";
import { loginValidator, passwordChangeValidator, passwordResetValidator, registerValidator, updatePasswordValidator, uploadImageValidator, userInfoUpdateValidator, } from "../validators/user.js";
import { validateRequest } from "../middlewares/validateRequest.js";
const router = Router();
router.post("/register", registerValidator, validateRequest, registerUser);
router.post("/login", loginValidator, validateRequest, loginUser);
router.post("/logout", logoutUser);
router.post("/upload", uploadImageValidator, validateRequest, protect, uploadAvatar);
router.get("/me", protect, getUserInfo);
router.post("/user/update", protect, userInfoUpdateValidator, validateRequest, updateUserProfile);
router.post("/update-password", protect, updatePasswordValidator, validateRequest, updatePassword);
router.post("/forgot-password", passwordResetValidator, validateRequest, sendForgotPasswordEmail);
router.post("/reset-password/:token", passwordChangeValidator, validateRequest, resetPassword);
export default router;
//# sourceMappingURL=user.js.map
import { body, param } from "express-validator";

export const registerValidator = [
  body("name").notEmpty().isString().withMessage("Username is required."),
  body("email").isEmail().withMessage("Valid email is required."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Valid email is required."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
];

export const uploadImageValidator = [
  body("image_url").notEmpty().withMessage("Image should not be empty."),
];

export const userInfoUpdateValidator = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("Valid email is required"),
];

export const updatePasswordValidator = [
  body("oldPassword").notEmpty().withMessage("Old password is required"),

  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  // body("confirmPassword")
  //   .notEmpty()
  //   .withMessage("Confirm password is required"),
];

export const passwordResetValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
];

export const passwordChangeValidator = [
  param("token").notEmpty().withMessage("Token is required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New Password must be at least 6 characters"),
];

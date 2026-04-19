import { body } from "express-validator";

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
]

export const userInfoUpdateValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),
];
import { body, param } from "express-validator";
import mongoose from "mongoose";

export const createProductValidator = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("description").notEmpty().withMessage("Product description is required"),
  body("price").isNumeric().notEmpty().withMessage("Product price is required"),
  body("instock_count")
    .isInt()
    .notEmpty()
    .withMessage("Product instock_count is required"),
  body("category").notEmpty().withMessage("Product category is required"),
  body("sizes")
    .isArray({ min: 1 })
    .notEmpty()
    .withMessage("Product sizes is required"),
  body("colors")
    .isArray({ min: 1 })
    .notEmpty()
    .withMessage("Product colors is required"),
  body("images")
    .isArray({ min: 1 })
    .notEmpty()
    .withMessage("Product images is required"),
  body("images.*.url")
    .isString()
    .notEmpty()
    .withMessage("Each image url must has url"),
  body("images.*.public_alt")
    .isString()
    .notEmpty()
    .withMessage("Each image url must has public_alt"),
  body("is_new_arrival")
    .isBoolean()
    .notEmpty()
    .withMessage("Product is_new_arrival is required"),
  body("is_feature").isBoolean().withMessage("Product is_feature is required"),
  body("rating_count")
    .isInt()
    .notEmpty()
    .withMessage("Product rating_count is required"),
];

export const updateProductValidator = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("price").optional().isNumeric().withMessage("Price must be a number"),
  body("instock_count")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock count must be a non-negative integer"),
  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),
  body("sizes")
    .optional()
    .isArray()
    .withMessage("Sizes must be an array of strings"),
  body("colors")
    .optional()
    .isArray()
    .withMessage("Colors must be an array of strings"),
  body("images").optional().isArray().withMessage("Images must be an array"),
  body("images.*.url")
    .optional()
    .isString()
    .withMessage("Each image must have a URL"),
  body("images.*.public_alt")
    .optional()
    .isString()
    .withMessage("Each image must have a public_alt"),
  body("is_new_arrival")
    .optional()
    .isBoolean()
    .withMessage("is_new_arrival must be a boolean"),
  body("is_feature")
    .optional()
    .isBoolean()
    .withMessage("is_feature must be a boolean"),
  body("rating_count")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Rating count must be a non-negative integer"),
];

export const deleteProductValidator = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product ID"),
];
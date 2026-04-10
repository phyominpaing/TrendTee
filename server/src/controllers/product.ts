import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import { Product } from "../models/product.ts";
import type { AuthRequest } from "../middlewares/authMiddleware.ts";

export const createProduct = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const {
      name,
      description,
      price,
      instock_count,
      category,
      sizes,
      colors,
      images,
      is_new_arrival,
      is_feature,
      rating_count,
    } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      price,
      instock_count,
      category,
      sizes,
      colors,
      images,
      is_new_arrival,
      is_feature,
      rating_count,
      userId: req.user?._id,
    });

    if (newProduct) {
      res.status(201).json({
        message: `Product ${newProduct.name} created successfully.`,
      });
    } else {
      res.status(400);
      throw new Error("Failed to create product.");
    }
  },
);

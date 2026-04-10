import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import { Product } from "../models/product.ts";
import type { AuthRequest } from "../middlewares/authMiddleware.ts";

// @route POST - api/products
// @desc Create a new product
// @access Private
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
        product: newProduct,
      });
    } else {
      res.status(400);
      throw new Error("Failed to create product.");
    }
  },
);

// @route PUT - api/products/:id
// @desc Update an existing product
// @access Private
export const updateProduct = asyncHandler(
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

    const { id } = req.params;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      res.status(404);
      throw new Error("Product not found.");
    }

    existingProduct.name = name || existingProduct.name;
    existingProduct.description = description || existingProduct.description;
    existingProduct.price = price || existingProduct.price;
    existingProduct.instock_count =
      instock_count || existingProduct.instock_count;
    existingProduct.category = category || existingProduct.category;
    existingProduct.sizes = sizes || existingProduct.sizes;
    existingProduct.colors = colors || existingProduct.colors;
    existingProduct.images = images || existingProduct.images;
    existingProduct.is_new_arrival =
      is_new_arrival || existingProduct.is_new_arrival;
    existingProduct.is_feature = is_feature || existingProduct.is_feature;
    existingProduct.rating_count = rating_count || existingProduct.rating_count;

    const updatedProduct = await existingProduct.save();

    if (updatedProduct) {
      res.status(200).json({
        message: `Product ${updatedProduct.name} updated successfully.`,
        product: updatedProduct,
      });
    } else {
      res.status(400);
      throw new Error("Failed to update product.");
    }
  },
);

// @route DELETE - api/products/:id
// @desc Delete an existing product
// @access Private/Admin
export const deleteProduct = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      res.status(404);
      throw new Error("Product not found.");
    }

    await existingProduct.deleteOne();

    res.status(200).json({
      message: `Product ${existingProduct.name} deleted successfully.`,
    });
  },
);

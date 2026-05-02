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

// @route GET - api/products
// @desc Get all products with pagination and filtering
// @access Public

// /api/products?key=value&key=value&...&keyword=shirt&page=1&limit=10
export const getProductsWithFilters = asyncHandler(
  async (req: Request, res: Response) => {
    const { keyword, category, minPrice, maxPrice, size, color, sortBy } =
      req.query;

    let query: any = {};

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (size) {
      query.sizes = { $in: [size] };
    }

    if (color) {
      query.colors = { $in: [color] };
    }

    //sorting
    let sortOption: any = {};

    if (sortBy === "price_asc") {
      sortOption.price = 1;
    }

    if (sortBy === "price_desc") {
      sortOption.price = -1;
    }

    if (sortBy === "latest") {
      sortOption.createdAt = -1;
    }

    if (sortBy === "rating") {
      sortOption.rating_count = -1;
    }

    const products = await Product.find(query).sort(sortOption);

    res.status(200).json(products);
  },
);

// @route GET - api/products/new
// @desc Get all new arrival products
// @access Public
export const getNewArrivalsProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await Product.find({ is_new_arrival: true }).sort({
      createdAt: -1,
    });

    res.status(200).json(products);
  },
);

// @route GET - api/products/featured
// @desc Get all featured products
// @access Public
export const getFeaturedProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await Product.find({ is_feature: true });

    res.status(200).json(products);
  },
);

// @route GET - api/products/:id
// @desc Get product by id
// @access Public
export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found.");
    }

    res.status(200).json(product);
  },
);

// @route GET - api/filters/meta
// @desc Get product metadata (categories, sizes, colors)
// @access Public
export const getProductsMeta = asyncHandler(
  async (req: Request, res: Response) => {
    const colors = await Product.distinct("colors");
    const sizes = await Product.distinct("sizes");

    const priceRange = await Product.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);

    res.status(200).json({
      colors,
      sizes,
      minPrice: priceRange[0]?.minPrice || 0,
      maxPrice: priceRange[0]?.maxPrice || 0,
    });
  },
);

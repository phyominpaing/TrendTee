import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { Product } from "../models/product.js";
import type { AuthRequest } from "../middlewares/authMiddleware.js";
import { deleteImage, uploadSingleImage } from "../utils/cloudinary.js";

type ProductImageInput = {
  file?: string;
  url?: string;
  public_alt?: string;
};

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

    // const ValidSizes = Array.isArray(sizes) ? sizes : [sizes];
    // const ValidColors = Array.isArray(colors) ? colors : [colors];

    // const ValidPrice = Number(price);
    // const ValidInstock_count = Number(instock_count);
    // const ValidRating_count = Number(rating_count);

    // const ValidIs_new_arrival = Boolean(is_new_arrival);
    // const ValidIs_feature = Boolean(is_feature);

    // const files = req.files as Express.Multer.File[];

    const uploadedImages = await Promise.all(
      images.map(async (image: { file?: string; public_alt?: string }) => {
        if (image.file) {
          const uploadedImg = await uploadSingleImage(
            image.file,
            "trendtee.com/products",
          );
          return {
            url: uploadedImg.image_url,
            public_alt: uploadedImg.public_alt,
          };
        }

        return image;
      }),
    );

    const newProduct = await Product.create({
      name,
      description,
      price,
      instock_count,
      category,
      sizes,
      colors,
      images: uploadedImages,
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

    const incomingImages = Array.isArray(images)
      ? (images as ProductImageInput[])
      : undefined;

    const imagesToDelete = incomingImages
      ? existingProduct.images.filter((image) => {
          return !incomingImages.some(
            (img) => img.public_alt === image.public_alt,
          );
        })
      : [];

    // upload new images
    const uploadedImages: { url: string; public_alt: string }[] | undefined =
      incomingImages
        ? await Promise.all(
            incomingImages.map(async (image) => {
              if (image.file) {
                const uploadedImg = await uploadSingleImage(
                  image.file,
                  "trendtee.com/products",
                );
                return {
                  url: uploadedImg.image_url,
                  public_alt: uploadedImg.public_alt,
                };
              }

              if (!image.url || !image.public_alt) {
                res.status(400);
                throw new Error(
                  "Existing product images must include url and public_alt.",
                );
              }

              return {
                url: image.url,
                public_alt: image.public_alt,
              };
            }),
          )
        : undefined;

    existingProduct.name = name ?? existingProduct.name;
    existingProduct.description = description ?? existingProduct.description;
    existingProduct.price = price ?? existingProduct.price;
    existingProduct.instock_count =
      instock_count ?? existingProduct.instock_count;
    existingProduct.category = category ?? existingProduct.category;
    existingProduct.sizes = sizes ?? existingProduct.sizes;
    existingProduct.colors = colors ?? existingProduct.colors;
    existingProduct.images = uploadedImages ?? existingProduct.images;
    existingProduct.is_new_arrival =
      is_new_arrival ?? existingProduct.is_new_arrival;
    existingProduct.is_feature = is_feature ?? existingProduct.is_feature;
    existingProduct.rating_count = rating_count ?? existingProduct.rating_count;

    const updatedProduct = await existingProduct.save();

    if (updatedProduct) {
      if (imagesToDelete.length > 0) {
        await Promise.all(
          imagesToDelete.map(async (image) => {
            if (image.public_alt) {
              try {
                await deleteImage(image.public_alt);
              } catch (error) {
                console.log(
                  `Error deleting image ${image.public_alt}: ${error}`,
                );
              }
            }
          }),
        );
      }

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

    const imagesToDelete = existingProduct.images.map(
      (image) => image.public_alt,
    );

    try {
      await existingProduct.deleteOne();

      if (imagesToDelete.length > 0) {
        await Promise.all(
          imagesToDelete.map(async (publicId) => {
            try {
              await deleteImage(publicId);
            } catch (error) {
              console.log(`Error deleting image ${publicId}: ${error}`);
            }
          }),
        );
      }
    } catch (error) {
      res.status(400);
      throw new Error("Failed to delete product.");
    }

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
      const sizes = Array.isArray(size) ? size : [size];
      query.sizes = { $in: sizes };
    }

    if (color) {
      const colors = Array.isArray(color) ? color : [color];
      query.colors = { $in: colors };
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

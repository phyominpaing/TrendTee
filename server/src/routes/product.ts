import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getFeaturedProducts,
  getNewArrivalsProducts,
  getProductById,
  getProductsMeta,
  getProductsWithFilters,
  updateProduct,
} from "../controllers/product.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";
import {
  createProductValidator,
  deleteProductValidator,
  updateProductValidator,
} from "../validators/product.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { upload } from "../utils/upload.js";

const router = Router();

router.post(
  "/products",
  protect,
  isAdmin,
  createProductValidator,
  validateRequest,
  upload.array("images"),
  createProduct,
);

router.put(
  "/products/:id",
  protect,
  isAdmin,
  updateProductValidator,
  validateRequest,
  updateProduct,
);

router.delete(
  "/products/:id",
  protect,
  isAdmin,
  deleteProductValidator,
  validateRequest,
  deleteProduct,
);

router.get("/products", getProductsWithFilters);
router.get("/products/new", getNewArrivalsProducts);
router.get("/products/featured", getFeaturedProducts);
router.get("/products/:id", getProductById);

router.get("/filters/meta", getProductsMeta);

export default router;

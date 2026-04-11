import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.ts";
import { isAdmin, protect } from "../middlewares/authMiddleware.ts";
import {
  createProductValidator,
  deleteProductValidator,
  updateProductValidator,
} from "../validators/product.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";

const router = Router();

router.post(
  "/products",
  protect,
  isAdmin,
  createProductValidator,
  validateRequest,
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

export default router;

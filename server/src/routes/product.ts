import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.ts";
import { isAdmin, protect } from "../middlewares/authMiddleware.ts";
import { createProductValidator } from "../validators/product.ts";
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
router.put("/products/:id", protect, isAdmin, updateProduct);
router.delete("/products/:id", protect, isAdmin, deleteProduct);

export default router;

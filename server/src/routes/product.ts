import { Router } from "express";
import { createProduct } from "../controllers/product.ts";
import { isAdmin, protect } from "../middlewares/authMiddleware.ts";

const router = Router();

router.post("/products", protect, isAdmin,  createProduct);

export default router;
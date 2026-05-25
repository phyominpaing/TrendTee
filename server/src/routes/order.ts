import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.ts";
import { createOrderAndCheckOutSession } from "../controllers/order.ts";
import { orderCreateValidator } from "../validators/order.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";

const router = Router();

router.post(
  "/create-order",
  protect,
  orderCreateValidator,
  validateRequest,
  createOrderAndCheckOutSession,
);

export default router;

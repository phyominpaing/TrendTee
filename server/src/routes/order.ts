import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.ts";
import {
  confirmSessionId,
  createOrderAndCheckOutSession,
} from "../controllers/order.ts";
import {
  confirmSessionIdValidator,
  orderCreateValidator,
} from "../validators/order.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";

const router = Router();

router.post(
  "/create-order",
  protect,
  orderCreateValidator,
  validateRequest,
  createOrderAndCheckOutSession,
);

router.get(
  "/confirm-order/:session_id",
  protect,
  confirmSessionIdValidator,
  validateRequest,
  confirmSessionId,
);
export default router;

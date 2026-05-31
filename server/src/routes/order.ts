import { Router } from "express";
import { isAdmin, protect } from "../middlewares/authMiddleware.ts";
import {
  changeOrderStatus,
  confirmSessionId,
  createOrderAndCheckOutSession,
  getAllOrders,
  getOrderByUser,
} from "../controllers/order.ts";
import {
  confirmSessionIdValidator,
  orderCreateValidator,
  orderIdValidator,
  orderStatusValidator,
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

router.get("/orders", protect, getOrderByUser);
router.get("/orders/all", protect, isAdmin, getAllOrders);
router.patch(
  "/order/:orderId",
  orderIdValidator,
  orderStatusValidator,
  validateRequest,
  protect,
  isAdmin,
  changeOrderStatus,
);

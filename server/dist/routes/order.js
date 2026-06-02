import { Router } from "express";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";
import { changeOrderStatus, confirmSessionId, createOrderAndCheckOutSession, getAllOrders, getOrderByUser, } from "../controllers/order.js";
import { confirmSessionIdValidator, orderCreateValidator, orderIdValidator, orderStatusValidator, } from "../validators/order.js";
import { validateRequest } from "../middlewares/validateRequest.js";
const router = Router();
router.post("/create-order", protect, orderCreateValidator, validateRequest, createOrderAndCheckOutSession);
router.get("/confirm-order/:session_id", protect, confirmSessionIdValidator, validateRequest, confirmSessionId);
export default router;
router.get("/orders", protect, getOrderByUser);
router.get("/orders/all", protect, isAdmin, getAllOrders);
router.patch("/order/:orderId", orderIdValidator, orderStatusValidator, validateRequest, protect, isAdmin, changeOrderStatus);
//# sourceMappingURL=order.js.map
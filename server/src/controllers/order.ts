import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import type { AuthRequest } from "../middlewares/authMiddleware.ts";
import Stripe from "stripe";
import type { OrderItem } from "../models/order.ts";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

// @route GET - api/create-order
// @desc Add new order and request stripe section
// @access Private/User
export const createOrderAndCheckOutSession = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { items, bill } = req.body;
    const customerId = req.user?._id;

    const line_items = items.map((item: OrderItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          metadata: {
            productId: item.productId,
            color: item.color,
            size: item.size,
          },
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/order-cancelled`,
      metadata: {
        customerId: customerId?.toString()!,
        bill: bill.toString(),
      },
    });

    res.status(200).json({ url: session.url });
  },
);

export const confirmSessionId = asyncHandler(
  async (req: Request, res: Response) => {
    const sessionId = req.params.session_id as string;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== "paid") {
      res
        .status(403)
        .json({ message: "Payment not successful or session not found" });
    }
  },
);

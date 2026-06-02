import express, { json, type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/dbConnect.js";

import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import errorHandler from "./middlewares/errorHandler.js";
import stripe from "stripe";
import Order from "./models/order.js";
import TempCart from "./models/tempCart.js";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    let event = req.body;

    if (endpointSecret) {
      const signature = req.headers["stripe-signature"] as string;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret,
        );
      } catch (err: any) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        res.sendStatus(400);
      }
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        try {
          const session = event.data.object;
          const userId = session.metadata.customerId;
          const email = session.metadata.customer;
          const bill = Number(session.metadata.bill);
          const tempCartId = session.metadata.tempCartId;

          if (!userId || !email || !bill || !tempCartId) {
            throw new Error("Missing required session metadata");
          }

          const tempCart = await TempCart.findById(tempCartId)!;

          await Order.create({
            userId,
            customer: email,
            bill,
            paymentIntendId: session.payment_intent,
            stripeSessionId: session.id,
            items: tempCart?.items,
            status: "paid",
          });

          await TempCart.findByIdAndDelete(tempCartId);
        } catch (error) {
          console.log(
            "Error processing checkout.session.completed event:",
            error,
          );
        }

        break;

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
  },
);

app.use(json({ limit: "10mb" }));
app.use(cookieParser());

// routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || "8000";
app.listen(PORT, () => {
  // database connection
  connectDB();
  console.log("Server is running :", PORT);
});

// stripe listen --forward-to localhost:4000/stripe/webhook

// whsec_bf9fecada321660fa2ffd3cb8121943d5d805ee91192bb0e400253752a18fb92

// stripe trigger checkout.session.completed

import express, { json, type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/dbConnect.ts";

import userRoutes from "./routes/user.ts";
import productRoutes from "./routes/product.ts";
import orderRoutes from "./routes/order.ts";
import errorHandler from "./middlewares/errorHandler.ts";
import stripe from "stripe";

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

app.use(json({ limit: "10mb" }));
app.use(cookieParser());

const endpointSecret = "whsec_...";
app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  (req: Request, res: Response) => {
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
        const session = event.data.object;
        console.log(session);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
  },
);

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

// http://localhost:4000/
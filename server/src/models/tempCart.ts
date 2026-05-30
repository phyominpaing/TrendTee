import mongoose, { Schema, Types } from "mongoose";
import { orderItemSchema } from "./order.ts";

const tempCartSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  items: { type: [orderItemSchema], required: true },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 60 * 1000),
    index: { expires: 0 },
  }, // Document will be automatically removed after 30 minutes
});

const TempCart = mongoose.model("TempCart", tempCartSchema);
export default TempCart;

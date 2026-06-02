import mongoose, { Schema } from "mongoose";
export const orderItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
}, { _id: false });
const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
    bill: { type: Number, required: true },
    customer: { type: String, required: true },
    status: {
        type: String,
        enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    paymentIntendId: { type: String },
    stripeSessionId: { type: String },
}, { timestamps: true });
const Order = mongoose.model("Order", orderSchema);
export default Order;
//# sourceMappingURL=order.js.map
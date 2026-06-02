import mongoose, { Document, Schema, Types } from "mongoose";
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    instock_count: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sizes: {
        type: [String],
        required: true,
    },
    colors: {
        type: [String],
        required: true,
    },
    images: {
        type: [
            {
                url: String,
                public_alt: String,
            },
        ],
        required: true,
    },
    is_new_arrival: {
        type: Boolean,
        required: true,
    },
    is_feature: {
        type: Boolean,
        required: true,
    },
    rating_count: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
export const Product = mongoose.model("Product", productSchema);
//# sourceMappingURL=product.js.map
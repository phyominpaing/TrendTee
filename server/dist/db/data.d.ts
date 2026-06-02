import mongoose from "mongoose";
export declare const products: {
    name: string;
    description: string;
    category: string;
    colors: string[];
    sizes: string[];
    price: number;
    images: {
        url: string;
        public_alt: string;
    }[];
    is_new_arrival: boolean;
    is_feature: boolean;
    instock_count: number;
    rating_count: number;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}[];
//# sourceMappingURL=data.d.ts.map
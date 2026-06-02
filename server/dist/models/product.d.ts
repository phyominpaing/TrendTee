import mongoose, { Document, Types } from "mongoose";
interface Image {
    url: string;
    public_alt: string;
}
interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    instock_count: number;
    category: string;
    sizes: string[];
    colors: string[];
    images: Image[];
    is_new_arrival: boolean;
    is_feature: boolean;
    rating_count: number;
    userId: Types.ObjectId;
}
export declare const Product: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct, {}, mongoose.DefaultSchemaOptions> & IProduct & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IProduct>;
export {};
//# sourceMappingURL=product.d.ts.map
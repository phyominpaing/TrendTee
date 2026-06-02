import mongoose, { Types } from "mongoose";
declare const TempCart: mongoose.Model<{
    userId: Types.ObjectId;
    items: Types.DocumentArray<import("./order.js").OrderItem, Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, import("./order.js").OrderItem, {}, {}> & import("./order.js").OrderItem>;
    expiresAt: NativeDate;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userId: Types.ObjectId;
    items: Types.DocumentArray<import("./order.js").OrderItem, Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, import("./order.js").OrderItem, {}, {}> & import("./order.js").OrderItem>;
    expiresAt: NativeDate;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userId: Types.ObjectId;
    items: Types.DocumentArray<import("./order.js").OrderItem, Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, import("./order.js").OrderItem, {}, {}> & import("./order.js").OrderItem>;
    expiresAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: Types.ObjectId;
    items: Types.DocumentArray<import("./order.js").OrderItem, Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, import("./order.js").OrderItem, {}, {}> & import("./order.js").OrderItem>;
    expiresAt: NativeDate;
}, mongoose.Document<unknown, {}, {
    userId: Types.ObjectId;
    items: Types.DocumentArray<import("./order.js").OrderItem, Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, import("./order.js").OrderItem, {}, {}> & import("./order.js").OrderItem>;
    expiresAt: NativeDate;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userId: Types.ObjectId;
    items: Types.DocumentArray<import("./order.js").OrderItem, Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, import("./order.js").OrderItem, {}, {}> & import("./order.js").OrderItem>;
    expiresAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    userId: Types.ObjectId;
    items: Types.DocumentArray<{
        productId: Types.ObjectId;
        name: string;
        price: number;
        quantity: number;
        size: string;
        color: string;
    }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        productId: Types.ObjectId;
        name: string;
        price: number;
        quantity: number;
        size: string;
        color: string;
    }, {}, {}> & {
        productId: Types.ObjectId;
        name: string;
        price: number;
        quantity: number;
        size: string;
        color: string;
    }>;
    expiresAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>, {
    userId: Types.ObjectId;
    items: Types.DocumentArray<{
        productId: Types.ObjectId;
        name: string;
        price: number;
        quantity: number;
        size: string;
        color: string;
    }, Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        productId: Types.ObjectId;
        name: string;
        price: number;
        quantity: number;
        size: string;
        color: string;
    }, {}, {}> & {
        productId: Types.ObjectId;
        name: string;
        price: number;
        quantity: number;
        size: string;
        color: string;
    }>;
    expiresAt: NativeDate;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export default TempCart;
//# sourceMappingURL=tempCart.d.ts.map
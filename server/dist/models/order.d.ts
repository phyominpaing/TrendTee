import mongoose, { type Document, type Types } from "mongoose";
export interface OrderItem {
    productId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
}
export interface OrderDocument extends Document {
    userId: Types.ObjectId;
    items: OrderItem[];
    bill: number;
    customer: string;
    status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
    paymentIntendId?: string;
    stripeSessionId?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const orderItemSchema: mongoose.Schema<OrderItem, mongoose.Model<OrderItem, any, any, any, any, any, OrderItem>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, OrderItem, mongoose.Document<unknown, {}, OrderItem, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<OrderItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    productId?: mongoose.SchemaDefinitionProperty<Types.ObjectId, OrderItem, mongoose.Document<unknown, {}, OrderItem, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    name?: mongoose.SchemaDefinitionProperty<string, OrderItem, mongoose.Document<unknown, {}, OrderItem, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    price?: mongoose.SchemaDefinitionProperty<number, OrderItem, mongoose.Document<unknown, {}, OrderItem, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    quantity?: mongoose.SchemaDefinitionProperty<number, OrderItem, mongoose.Document<unknown, {}, OrderItem, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    size?: mongoose.SchemaDefinitionProperty<string, OrderItem, mongoose.Document<unknown, {}, OrderItem, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    color?: mongoose.SchemaDefinitionProperty<string, OrderItem, mongoose.Document<unknown, {}, OrderItem, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, OrderItem>;
declare const Order: mongoose.Model<OrderDocument, {}, {}, {}, mongoose.Document<unknown, {}, OrderDocument, {}, mongoose.DefaultSchemaOptions> & OrderDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, OrderDocument>;
export default Order;
//# sourceMappingURL=order.d.ts.map
import mongoose, { Document } from "mongoose";
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "customer" | "admin";
    avatar?: {
        url: string;
        public_alt: string;
    };
    resetPasswordToken?: string | undefined;
    resetPasswordExpire?: string | Date;
    matchPassword(enteredPassword: string): boolean;
    generatePasswordResetToken(): string;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export {};
//# sourceMappingURL=user.d.ts.map
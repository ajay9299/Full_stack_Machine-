import { Model, Schema, Document, model } from "mongoose";
import { IUser } from "../dto/user.dto";

// Extends IUser with mongoose in built properties
export interface IUserDoc extends IUser, Document { }

// UserSchema contain all information related to User onboard
const UserSchema: Schema<IUserDoc> = new Schema<IUserDoc>(
    {
        userName: { type: String, trim: true, required: true, unique: true },
        password: { type: String, trim: true, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(doc, ret) {
                ret.userId = ret._id;
                delete ret.password;
                delete ret._id;
            },
        },
    }
);

// Create the Mongoose model using the schema
export const UserModel: Model<IUserDoc> = model<IUserDoc>(
    "User",
    UserSchema
);

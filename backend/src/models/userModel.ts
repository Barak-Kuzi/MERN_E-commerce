import mongoose from "mongoose";
import {Product} from "./productModel";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        default: "GENERAL",
    },
    cart: [
        {
            productId: {
                type: String,
                unique: true,
            },
            quantity: {
                type: Number,
                default: 1
            },
        },
    ],
}, {
    timestamps: true
});

const userModer = mongoose.model("user", userSchema);

export default userModer;

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    profileImage?: string;
    role?: string;
    cart?: Product[];
    createdAt?: Date;
    updatedAt?: Date;
}
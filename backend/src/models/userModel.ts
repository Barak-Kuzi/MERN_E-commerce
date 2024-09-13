import mongoose from "mongoose";
import {Product} from "./productModel.js";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

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
    cart: [cartItemSchema],
}, {
    timestamps: true
});

// this line guarantees that a specific product can appear only once in a user's cart, preventing duplication.
// userSchema.index({ 'cart.productId': 1, _id: 1 }, { unique: true });

const userModel = mongoose.model("user", userSchema);

export default userModel;

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
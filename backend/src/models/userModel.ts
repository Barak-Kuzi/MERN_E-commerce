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

const wishlistSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

const addressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
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
    phone: {
        type: String,
        default: "",
    },
    birthDate: {
        type: Date,
        default: '1970-01-01',
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Unspecified'],
        default: 'Unspecified',
    },
    cart: [cartItemSchema],
    wishlist: [wishlistSchema],
    address: addressSchema,
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true
});

const userModel = mongoose.model("user", userSchema);

export default userModel;

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    profileImage?: string;
    role?: string;
    phone?: string;
    gender?: 'Male' | 'Female' | 'Unspecified';
    cart?: Product[];
    wishlist?: { productId: string }[];
    address?: {
        firstName: string;
        lastName: string;
        email: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        phone: string;
    };
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
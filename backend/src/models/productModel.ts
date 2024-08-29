import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productSellingPrice: {
        type: Number,
        required: true,
    },
    productImages: {
        type: [String],
        required: true,
    },
    productBrand: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const productModel = mongoose.model("product", productSchema);

export default productModel;

export interface Product {
    _id: string;
    productName: string;
    productDescription: string;
    productCategory: string;
    productPrice: number;
    productSellingPrice: number;
    productImages: string[];
    productBrand: string;
    createdAt?: Date;
    updatedAt?: Date;
}
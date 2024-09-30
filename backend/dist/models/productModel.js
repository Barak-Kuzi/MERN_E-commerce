import mongoose from "mongoose";
const ratingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});
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
    },
    ratings: {
        type: [ratingSchema],
        default: [],
    },
    averageRating: {
        type: Number,
        default: 0.0
    }
}, {
    timestamps: true
});
const productModel = mongoose.model("product", productSchema);
export default productModel;

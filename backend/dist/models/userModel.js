import mongoose from "mongoose";
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
    wishlist: [wishlistSchema]
}, {
    timestamps: true
});
// this line guarantees that a specific product can appear only once in a user's cart, preventing duplication.
// userSchema.index({ 'cart.productId': 1, _id: 1 }, { unique: true });
const userModel = mongoose.model("user", userSchema);
export default userModel;

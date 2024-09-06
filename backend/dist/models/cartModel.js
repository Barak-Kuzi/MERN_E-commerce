import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, default: 1 },
        },
    ],
});
export default mongoose.model("cart", cartSchema);

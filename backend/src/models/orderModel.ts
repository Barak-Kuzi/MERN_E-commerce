import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        products: {
            type: Array,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        address: {
            type: Object,
            required: true,
        },
        status: {
            type: String,
            default: "pending",
        },
        date: {
            type: Date,
            default: Date.now(),
        },
        payment: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
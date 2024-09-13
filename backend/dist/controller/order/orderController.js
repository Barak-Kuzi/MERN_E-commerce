import Stripe from "stripe";
import dotenv from 'dotenv';
import orderModel from "../../models/orderModel.js";
import userModel from "../../models/userModel.js";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const placeOrder = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { products, amount, address } = req.body;
        const newOrder = new orderModel({
            userId,
            products,
            amount,
            address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cart: [] });
        const line_items = products.map((product) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.productName,
                    images: [product.productImages[0]]
                },
                unit_amount: product.productSellingPrice * 100
            },
            quantity: product.quantity
        }));
        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: 10 * 100 // 10 USD
            },
            quantity: 1
        });
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`
        });
        res.status(200).json({
            success: true,
            error: false,
            message: 'Order placed successfully',
            data: session.url
        });
    }
    catch (error) {
        console.error('Failed to place order', error);
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || 'Failed to place order'
        });
    }
};
const verifyOrder = async (req, res) => {
    try {
        const { orderId, success } = req.body;
        if (success) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true, status: 'confirmed' });
            res.status(200).json({
                success: true,
                error: false,
                message: 'Order paid successfully'
            });
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.status(200).json({
                success: true,
                error: false,
                message: 'Order cancelled successfully'
            });
        }
    }
    catch (error) {
        console.error('Failed to verify order', error);
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || 'Failed to verify order'
        });
    }
};
const fetchOrders = async (req, res) => {
    try {
        const currentUserId = req.user?.id;
        if (!currentUserId) {
            return res.status(401).json({
                error: true,
                success: false,
                message: "Unauthorized",
            });
        }
        const orders = await orderModel.find({ userId: currentUserId });
        res.status(200).json({
            success: true,
            error: false,
            message: 'Orders fetched successfully',
            data: orders
        });
    }
    catch (error) {
        console.error('Failed to fetch orders', error);
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || 'Failed to fetch orders'
        });
    }
};
export { placeOrder, verifyOrder, fetchOrders };

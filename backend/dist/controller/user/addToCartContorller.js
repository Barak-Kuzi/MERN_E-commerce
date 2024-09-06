import CartModel from "../../models/cartModel.js";
const addToCartController = async (req, res) => {
    try {
        const currentUserId = req.user?.id;
        if (!currentUserId) {
            return res.status(401).json({
                error: true,
                success: false,
                message: "Unauthorized",
            });
        }
        const { productId } = req.body;
        console.log(productId);
        const productAlreadyInCart = await CartModel.findOne({ userId: currentUserId, "products.productId": productId });
        if (productAlreadyInCart) {
            await CartModel.updateOne({
                userId: currentUserId,
                "products.productId": productId
            }, { $inc: { "products.$.quantity": 1 } });
            return res.status(200).json({
                error: false,
                success: true,
                message: "Product quantity updated in cart",
            });
        }
        else {
            await CartModel.updateOne({ userId: currentUserId }, { $push: { products: { productId, quantity: 1 } } });
            return res.status(200).json({
                error: false,
                success: true,
                message: "Product added to cart successfully",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: error.message,
        });
    }
};
export default addToCartController;

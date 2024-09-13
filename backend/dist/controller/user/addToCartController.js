import UserModel from "../../models/userModel.js";
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
        if (!productId) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Product ID is required",
            });
        }
        const user = await UserModel.findById(currentUserId);
        if (!user) {
            return res.status(404).json({
                error: true,
                success: false,
                message: "User not found",
            });
        }
        const productIndex = user.cart.findIndex(item => item.productId?.toString() === productId);
        let message;
        let updatedProduct;
        if (productIndex > -1) {
            user.cart[productIndex].quantity += 1;
            message = "The product quantity was updated successfully";
            updatedProduct = {
                productId,
                quantity: user.cart[productIndex].quantity
            };
        }
        else {
            user.cart.push({ productId, quantity: 1 });
            message = "The product was added to the cart successfully";
            updatedProduct = {
                productId,
                quantity: 1
            };
        }
        await user.save();
        return res.status(200).json({
            error: false,
            success: true,
            message: message,
            data: {
                productId,
                quantity: updatedProduct.quantity
            }
        });
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

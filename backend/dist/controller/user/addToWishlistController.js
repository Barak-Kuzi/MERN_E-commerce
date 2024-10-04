import userModel from "../../models/userModel.js";
import productModel from "../../models/productModel.js";
const addToWishlistController = async (req, res) => {
    try {
        const userSession = req.user?.id;
        if (!userSession) {
            return res.status(401).json({
                success: false,
                error: true,
                message: "Unauthorized",
            });
        }
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Product ID is required",
            });
        }
        const user = await userModel.findById(userSession);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User not found"
            });
        }
        const productIndex = user.wishlist.findIndex(item => item.productId.toString() === productId);
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Product not found"
            });
        }
        const productLovedByUser = product.inUsersWishlist.findIndex(lovedProduct => lovedProduct.userId.toString() === userSession);
        let message;
        let wishlistAction;
        if (productIndex > -1) {
            user.wishlist.splice(productIndex, 1);
            message = "Product removed from wishlist successfully";
            wishlistAction = "remove";
        }
        else {
            user.wishlist.push({ productId });
            message = "Product added to wishlist successfully";
            wishlistAction = "add";
        }
        if (productLovedByUser > -1) {
            product.inUsersWishlist.splice(productLovedByUser, 1);
        }
        else {
            product.inUsersWishlist.push({ userId: userSession });
        }
        await user.save();
        await product.save();
        return res.status(200).json({
            success: true,
            error: false,
            message: message,
            data: {
                action: wishlistAction,
                product
            }
        });
    }
    catch (error) {
        console.log("Error in addToWishlistController.ts: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal Server Error",
        });
    }
};
export default addToWishlistController;

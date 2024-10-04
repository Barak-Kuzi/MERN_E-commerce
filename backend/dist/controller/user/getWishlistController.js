import userModel from "../../models/userModel.js";
import productModel from "../../models/productModel.js";
const getWishlistController = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const wishlistProductIds = user.wishlist.map(item => item.productId);
        const wishlistProducts = await productModel.find({ _id: { $in: wishlistProductIds } });
        return res.status(200).json({ success: true, data: wishlistProducts });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
export default getWishlistController;

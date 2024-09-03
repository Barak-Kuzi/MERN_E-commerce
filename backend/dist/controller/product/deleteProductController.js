import AdminPermission from "../../utils/AdminPermission.js";
import productModel from "../../models/productModel.js";
const deleteProductController = async (req, res) => {
    try {
        const sessionUser = req.user;
        if (sessionUser && !await AdminPermission(sessionUser.id)) {
            res.status(401).json({
                error: true,
                message: 'You are not authorized to perform this action',
                success: false,
            });
        }
        const { productId } = req.params;
        const deletedProduct = await productModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({
                message: 'Product not found',
                success: false,
                error: true
            });
        }
        res.status(200).json({
            message: 'Product deleted successfully',
            success: true,
            error: false
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        });
    }
};
export default deleteProductController;

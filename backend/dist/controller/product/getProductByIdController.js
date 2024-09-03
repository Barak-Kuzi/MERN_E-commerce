import ProductModel from "../../models/productModel.js";
const getProductByIdController = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) {
            throw new Error("Product ID is required");
        }
        const product = await ProductModel.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        res.json({
            error: false,
            success: true,
            message: "Product fetched successfully",
            data: product
        });
    }
    catch (error) {
        res.json({
            error: true,
            success: false,
            message: error.message,
            data: null
        });
    }
};
export default getProductByIdController;

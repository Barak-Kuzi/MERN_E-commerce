import productModel from "../models/productModel.js";
const getAllProductsController = async (req, res) => {
    try {
        const allProducts = await productModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: 'All products fetched successfully',
            success: true,
            error: false,
            data: allProducts,
        });
    }
    catch (error) {
        res.status(400).json({
            error: true,
            message: error.message,
            success: false,
        });
    }
};
export default getAllProductsController;

import productModel from "../../models/productModel.js";
const getFilteredProductsController = async (req, res) => {
    const { categories } = req.body;
    if (!Array.isArray(categories) || categories.length === 0) {
        return res.status(400).json({
            success: false,
            error: true,
            message: "Categories must be a non-empty array"
        });
    }
    try {
        const filteredProducts = await productModel.find({
            productCategory: {
                $in: categories
            }
        });
        return res.status(200).json({
            success: true,
            error: false,
            message: "Filtered products",
            data: filteredProducts
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error"
        });
    }
};
export default getFilteredProductsController;

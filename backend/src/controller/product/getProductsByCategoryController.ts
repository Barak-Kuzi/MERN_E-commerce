import {CustomRequest, CustomResponse} from "../../utils";
import productModel from "../../models/productModel.js";

const getProductsByCategoryController = async (req: CustomRequest, res: CustomResponse) => {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({
                error: true,
                message: 'Category is required',
                success: false,
            });
        }

        const products = await productModel.find({ productCategory: category });

        res.status(200).json({
            error: false,
            message: 'Products fetched successfully',
            success: true,
            data: products
        });

    } catch (error: any) {
        res.status(400).json({
            error: true,
            message: error.message,
            success: false,
        })
    }
}

export default getProductsByCategoryController;
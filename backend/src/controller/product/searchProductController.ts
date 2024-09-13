import {CustomRequest, CustomResponse} from "../../utils";
import ProductModel from "../../models/productModel.js";

const searchProductController = async (req: CustomRequest, res: CustomResponse) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== 'string') {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Query parameter is required and must be a string",
            });
        }

        const regularExpression = new RegExp(query, 'ig');

        const products = await ProductModel.find({
            $or: [
                { productName: { $regex: regularExpression } },
                { category: { $regex: regularExpression } },
                { brand: { $regex: regularExpression } },
            ],
        });

        return res.status(200).json({
            error: false,
            success: true,
            message: "Products fetched successfully",
            data: products,
        });

    } catch (error: any) {
        return res.status(500).json({
            error: true,
            success: false,
            message: error.message,
        });
    }
};

export default searchProductController;
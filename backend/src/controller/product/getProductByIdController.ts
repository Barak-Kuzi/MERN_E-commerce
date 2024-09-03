import {CustomRequest, CustomResponse} from "../../utils";
import ProductModel from "../../models/productModel.js";

const getProductByIdController = async (req: CustomRequest, res: CustomResponse) => {
    try {

        const {productId} = req.params;

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

    } catch (error: any) {
        res.json({
            error: true,
            success: false,
            message: error.message,
            data: null
        })
    }

}

export default getProductByIdController;
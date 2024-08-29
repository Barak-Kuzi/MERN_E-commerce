import {CustomRequest, CustomResponse} from "../utils";
import AdminPermission from "../utils/AdminPermission.js";
import productModel from "../models/productModel.js";

const uploadProductController = async (req: CustomRequest, res: CustomResponse) => {
    try {

        const sessionUser = req.user;

        if (sessionUser && !(await AdminPermission(sessionUser?.id))) {
            res.status(400).json({
                error: true,
                message: 'You are not authorized to perform this action',
                success: false,
            })
        }

        const newProduct = new productModel(req.body);
        const saveProduct = await newProduct.save();

        res.status(201).json({
            data: saveProduct,
            message: 'Product uploaded successfully',
            success: true,
            error: false,
        })

    } catch (error: any) {
        res.status(400).json({
            error: true,
            message: error.message,
            success: false,
        })
    }
}

export default uploadProductController;
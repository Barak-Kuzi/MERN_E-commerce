import {CustomRequest, CustomResponse} from "../../utils";
import productModel from "../../models/productModel.js";
import AdminPermission from "../../utils/AdminPermission.js";

const updateProductController = async (req: CustomRequest, res: CustomResponse) => {
    try {
        const sessionUser = req.user;
        if (sessionUser && !(await AdminPermission(sessionUser?.id))) {
            res.status(401).json({
                error: true,
                message: 'You are not authorized to perform this action',
                success: false,
            })
        }

        const {_id, ...resBody} = req.body;

        const updatedProduct = await productModel.findByIdAndUpdate(_id, resBody, {new: true});

        res.status(200).json({
            data: updatedProduct,
            message: 'Product updated successfully',
            success: true,
            error: false,
        });

    } catch (error: any) {
        res.status(400).json({
            error: true,
            message: error.message,
            success: false,
        })
    }
}

export default updateProductController;

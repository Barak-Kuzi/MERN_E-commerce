import {CustomRequest, CustomResponse} from "../../utils";
import UserModel from "../../models/userModel.js";

const deleteFromCartController = async (req: CustomRequest, res: CustomResponse) => {
    try {
        const currentUserId = req.user?.id;
        if (!currentUserId) {
            return res.status(401).json({
                error: true,
                success: false,
                message: "Unauthorized",
            });
        }

        const { productId } = req.body;

        const productAlreadyInCart = await UserModel.findOne({
            _id: currentUserId,
            "cart.productId": productId
        });

        if (!productAlreadyInCart) {
            return res.status(404).json({
                error: true,
                success: false,
                message: "The product is not in the cart",
            });
        }

        await UserModel.updateOne(
            {
                _id: currentUserId,
                "cart.productId": productId
            },
            { $pull: { cart: { productId } } }
        );

        const updatedUser = await UserModel.findById(currentUserId);

        if (!updatedUser) {
            return res.status(404).json({
                error: true,
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            message: "The product was removed from the cart successfully",
            data: updatedUser.cart,
        });

    } catch (error: any) {
        return res.status(500).json({
            error: true,
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}

export default deleteFromCartController;
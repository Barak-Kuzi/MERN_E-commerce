// import {CustomRequest, CustomResponse} from "../../utils";
// import CartModel from "../../models/cartModel.js";
//
// const getQuantityProductsInCart = async (req: CustomRequest, res: CustomResponse) => {
//     try {
//         const currentUserId = req.user?.id;
//         if (!currentUserId) {
//             return res.status(401).json({
//                 error: true,
//                 success: false,
//                 message: "Unauthorized",
//             });
//         }
//
//         const cart = await CartModel.findOne({userId: currentUserId});
//         const quantityProducts = cart ? cart.products.length : 0;
//
//         return res.status(200).json({
//             error: false,
//             success: true,
//             data: quantityProducts,
//         });
//
//     } catch (error: any) {
//         return res.status(500).json({
//             error: true,
//             success: false,
//             message: error.message,
//         });
//     }
// }
//
// export default getQuantityProductsInCart;
import UserModel from "../../models/userModel.js";
const getQuantityProductsInCart = async (req, res) => {
    try {
        const currentUserId = req.user?.id;
        if (!currentUserId) {
            return res.status(401).json({
                error: true,
                success: false,
                message: "Unauthorized",
            });
        }
        const user = await UserModel.findOne({ _id: currentUserId });
        const quantityProducts = user ? user.cart.reduce((total, product) => total + product.quantity, 0) : 0;
        return res.status(200).json({
            error: false,
            success: true,
            data: quantityProducts,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: error.message,
        });
    }
};
export default getQuantityProductsInCart;

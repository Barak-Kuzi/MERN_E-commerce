// import {CustomRequest, CustomResponse} from "../../utils";
// import CartModel from "../../models/cartModel.js";
//
// const addToCartController = async (req: CustomRequest, res: CustomResponse) => {
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
//         const {productId} = req.body;
//
//         const productAlreadyInCart = await CartModel.findOne({userId: currentUserId, "products.productId": productId});
//
//         if (productAlreadyInCart) {
//             await CartModel.updateOne(
//                 {
//                     userId: currentUserId,
//                     "products.productId": productId
//                 },
//                 {$inc: {"products.$.quantity": 1}}
//             );
//
//             return res.status(200).json({
//                 error: false,
//                 success: true,
//                 message: "The product quantity was updated successfully",
//             });
//         } else {
//             await CartModel.updateOne(
//                 {userId: currentUserId},
//                 {$push: {products: {productId, quantity: 1}}},
//                 {upsert: true}
//             );
//             return res.status(200).json({
//                 error: false,
//                 success: true,
//                 message: "The product was added to the cart successfully",
//             });
//         }
//
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
// export default addToCartController;
import UserModel from "../../models/userModel.js";
const addToCartController = async (req, res) => {
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
        console.log(productId);
        const productAlreadyInCart = await UserModel.findOne({
            _id: currentUserId,
            "cart.productId": productId
        });
        if (productAlreadyInCart) {
            const resData = await UserModel.updateOne({
                _id: currentUserId,
                "cart.productId": productId
            }, { $inc: { "cart.$.quantity": 1 } });
            console.log(resData);
            return res.status(200).json({
                error: false,
                success: true,
                message: "The product quantity was updated successfully",
            });
        }
        else {
            const resData = await UserModel.updateOne({ _id: currentUserId }, { $push: { cart: { productId, quantity: 1 } } }, { upsert: true });
            console.log(resData);
            return res.status(200).json({
                error: false,
                success: true,
                message: "The product was added to the cart successfully",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: error.message,
        });
    }
};
export default addToCartController;

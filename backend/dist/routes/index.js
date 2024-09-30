import { Router } from "express";
import userSignUpController from "../controller/user/userSignUpController.js";
import userSignInController from "../controller/user/userSignInController.js";
import userDetailsController from "../controller/user/userDetailsController.js";
import authToken from "../middleware/authToken.js";
import userLogoutController from "../controller/user/userLogoutController.js";
import allUsersController from "../controller/user/allUsersController.js";
import updateUserController from "../controller/user/updateUserController.js";
import uploadProductController from "../controller/product/uploadProductController.js";
import getAllProductsController from "../controller/product/getAllProductsController.js";
import updateProductController from "../controller/product/updateProductContorller.js";
import deleteProductController from "../controller/product/deleteProductController.js";
import getProductsByCategoryController from "../controller/product/getProductsByCategoryController.js";
import getProductByIdController from "../controller/product/getProductByIdController.js";
import addToCartController from "../controller/user/addToCartController.js";
import deleteFromCartController from "../controller/user/deleteFromCartController.js";
import searchProductController from "../controller/product/searchProductController.js";
import getFilteredProductsController from "../controller/product/getFilteredProductsController.js";
import { placeOrder, verifyOrder, fetchOrders } from "../controller/order/orderController.js";
import addToWishlistController from "../controller/user/addToWishlistController.js";
import changePasswordController from "../controller/user/changePasswordController.js";
import ratingProductController from "../controller/product/ratingProductController.js";
const router = Router();
// User routes
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get('/user-details', authToken, userDetailsController);
router.post('/change-password', authToken, changePasswordController);
router.get('/userLogout', userLogoutController);
// Admin routes
router.get('/all-users', authToken, allUsersController);
router.post('/update-user', authToken, updateUserController);
// Product routes
router.post('/upload-product', authToken, uploadProductController);
router.post('/update-product', authToken, updateProductController);
router.delete('/delete-product/:productId', authToken, deleteProductController);
router.get('/all-products', getAllProductsController);
router.get('/products-by-category', getProductsByCategoryController);
router.get('/product-details/:productId', getProductByIdController);
router.get('/search', searchProductController);
router.post('/filter-products', getFilteredProductsController);
router.post('/add-to-wishlist', authToken, addToWishlistController);
router.post('/rate-product', authToken, ratingProductController);
// Cart routes
router.post('/add-to-cart', authToken, addToCartController);
router.post('/delete-product-from-cart', authToken, deleteFromCartController);
// Order routes
router.post('/place-order', authToken, placeOrder);
router.post('/verify', verifyOrder);
router.get('/user-orders', authToken, fetchOrders);
export default router;

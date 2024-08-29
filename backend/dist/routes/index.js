import { Router } from "express";
import userSignUpController from "../controller/userSignUpController.js";
import userSignInController from "../controller/userSignInController.js";
import userDetailsController from "../controller/userDetailsController.js";
import authToken from "../middleware/authToken.js";
import userLogoutController from "../controller/userLogoutController.js";
import allUsersController from "../controller/allUsersController.js";
import updateUserController from "../controller/updateUserController.js";
import uploadProductController from "../controller/uploadProductController.js";
import getAllProductsController from "../controller/getAllProductsController.js";
import updateProductController from "../controller/updateProductContorller.js";
import deleteProductController from "../controller/deleteProductController.js";
const router = Router();
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get('/user-details', authToken, userDetailsController);
router.get('/userLogout', userLogoutController);
// Admin routes
router.get('/all-users', authToken, allUsersController);
router.post('/update-user', authToken, updateUserController);
// Product routes
router.post('/upload-product', authToken, uploadProductController);
router.get('/all-products', getAllProductsController);
router.post('/update-product', authToken, updateProductController);
router.delete('/delete-product/:productId', authToken, deleteProductController);
export default router;

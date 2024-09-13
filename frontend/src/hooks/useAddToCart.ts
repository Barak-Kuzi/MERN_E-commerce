import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import handleAddToCart from "../utils/handleAddToCart";
import { fetchProductById } from "../utils/fetchProductById";
import { setUserCart } from "../store/userSlice";
import { AppDispatch, RootState } from "../store/store";

const useAddToCart = () => {
    const dispatch: AppDispatch = useDispatch();
    const userCart = useSelector((state: RootState) => state.user?.cart.products);

    const handleAddToCartButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const productId = e.currentTarget.getAttribute('product-id');
        if (!productId) {
            return;
        }

        const resData = await handleAddToCart({ productId });

        if (resData.success) {
            toast.success(resData.message);
            const productDetails = await fetchProductById(productId);
            if (productDetails.success) {
                const product = { ...productDetails.data, quantity: resData.data.quantity };
                const existingProductIndex = userCart.findIndex(item => item._id === productId);

                let updatedCart;
                if (existingProductIndex > -1) {
                    updatedCart = userCart.map((item, index) =>
                        index === existingProductIndex ? { ...item, quantity: product.quantity } : item
                    );
                } else {
                    updatedCart = [...userCart, product];
                }
                dispatch(setUserCart(updatedCart));
            } else {
                toast.error("Failed to fetch product details");
            }
        }

        if (resData.error) {
            toast.error(resData.message);
        }
    };

    return { handleAddToCartButton };
};

export default useAddToCart;
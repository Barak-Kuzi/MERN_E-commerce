import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import handleAddToCart from "../utils/handleAddToCart";
import { setUserCart } from "../store/userSlice";
import {AppDispatch} from "../store/store";

const useAddToCart = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleAddToCartButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const productId = e.currentTarget.getAttribute('product-id');
        if (!productId) {
            return;
        }

        const resData = await handleAddToCart({ productId });

        if (resData.success) {
            toast.success(resData.message);
            dispatch(setUserCart(resData.data));
        }

        if (resData.error) {
            toast.error(resData.message);
        }
    };

    return { handleAddToCartButton };
};

export default useAddToCart;
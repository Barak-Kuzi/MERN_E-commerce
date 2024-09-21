import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

import addToWishlist from "../utils/addToWishlist";
import {fetchProductById} from "../utils/fetchProductById";
import {setUserWishlist} from "../store/userSlice";
import {AppDispatch, RootState} from "../store/store";
import {CustomResponse} from "../utils/CustomResponse";
import {Product} from "../models";

const useUpdateWishlist = () => {
    const dispatch: AppDispatch = useDispatch();
    const userWishlist = useSelector((state: RootState) => state.user?.wishlist);

    const handleAddToWishlistButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const productId = e.currentTarget.getAttribute('product-id');
        if (!productId) {
            return;
        }

        const resData: CustomResponse = await addToWishlist(productId);

        if (resData.success) {
            toast.success(resData.message);
            if (resData.data === "remove") {
                const updatedWishlist = userWishlist.filter(product => product._id !== productId);
                dispatch(setUserWishlist(updatedWishlist));
                return;
            }
            if (resData.data === "add") {
                const resDataOfProduct = await fetchProductById(productId);
                if (resDataOfProduct.success) {
                    let product: Product = resDataOfProduct.data;
                    product = {...product, lovedProduct: true};
                    const updatedWishlist: Product[] = [...userWishlist, product];
                    dispatch(setUserWishlist(updatedWishlist));
                } else {
                    toast.error("Failed to fetch product details");
                }
            }
        }

        if (resData.error) {
            toast.error(resData.message);
        }
    }

    return {handleAddToWishlistButton};
}

export default useUpdateWishlist;
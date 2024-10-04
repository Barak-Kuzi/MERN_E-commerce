import React from "react";
import {toast} from "react-toastify";

import addToWishlist from "../utils/addToWishlist";
import {CustomResponse} from "../utils/CustomResponse";

const useUpdateWishlist = () => {
    // const dispatch: AppDispatch = useDispatch();
    // const userWishlist = useSelector((state: RootState) => state.wishlist.wishlist);


    const handleAddToWishlistButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const productId = e.currentTarget.getAttribute('product-id');
        if (!productId) {
            return;
        }

        const resData: CustomResponse = await addToWishlist(productId);

        if (resData.success) {
            toast.success(resData.message);
            // if (resData.data === "remove") {
            //     const updatedWishlist = userWishlist.filter(product => product._id !== productId);
            //     dispatch(setWishlist(updatedWishlist));
            //     return;
            // }
            // if (resData.data === "add") {
            //     const resDataOfProduct = await fetchProductById(productId);
            //     if (resDataOfProduct.success) {
            //         let product: Product = resDataOfProduct.data;
            //         product = {...product, lovedProduct: true};
            //         const updatedWishlist: Product[] = [...userWishlist, product];
            //         dispatch(setWishlist(updatedWishlist));
            //     } else {
            //         toast.error("Failed to fetch product details");
            //     }
            // }
        }

        if (resData.error) {
            toast.error(resData.message);
        }
    }

    return {handleAddToWishlistButton};
}

export default useUpdateWishlist;
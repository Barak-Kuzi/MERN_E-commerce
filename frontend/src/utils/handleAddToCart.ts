import {toast} from "react-toastify";

import {CustomResponse} from "./CustomResponse";
import SummaryApi from "../common";

interface handleAddToCartProps {
    productId: string;
}

const handleAddToCart = async ({productId}: handleAddToCartProps) => {
    const response = await fetch(SummaryApi.addToCart.url, {
        method: SummaryApi.addToCart.method,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({productId}),
    });

    const resData: CustomResponse = await response.json();
    return resData;
    // if (resData.success) {
    //     toast.success(resData.message);
    //     dispatch(setUserDetails({ cart: resData.cart }));
    // }
    //
    // if (resData.error) {
    //     toast.error(resData.message);
    // }
}

export default handleAddToCart;
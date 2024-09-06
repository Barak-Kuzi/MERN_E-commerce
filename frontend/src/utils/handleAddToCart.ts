import {toast} from "react-toastify";

import {CustomResponse} from "./CustomResponse";
import SummaryApi from "../common";

// interface handleAddToCartProps {
//     productId: string;
//     updateCartQuantity: any;
// }
//
// const handleAddToCart = async ({productId, updateCartQuantity}: handleAddToCartProps) => {
//     const response = await fetch(SummaryApi.addToCart.url, {
//         method: SummaryApi.addToCart.method,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({productId}),
//     });
//
//     const resData: CustomResponse = await response.json();
//
//     if (resData.success) {
//         toast.success(resData.message);
//         // fetchUserDetails()
//         // await updateCartQuantity();
//     }
//
//     if (resData.error) {
//         toast.error(resData.message);
//     }
// }
//
// export default handleAddToCart;

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

    if (resData.success) {
        toast.success(resData.message);
    }

    if (resData.error) {
        toast.error(resData.message);
    }
}

export default handleAddToCart;
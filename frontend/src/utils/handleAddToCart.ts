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
}

export default handleAddToCart;
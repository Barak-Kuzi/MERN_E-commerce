import SummaryApi from "../common";
import {CustomResponse} from "./CustomResponse";

const handleRemoveFromCart = async (productId: string) => {
    const response = await fetch(SummaryApi.deleteProductFromCart.url, {
        method: SummaryApi.deleteProductFromCart.method,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({productId}),
    });

    const resData: CustomResponse = await response.json();
    return resData;
}

export default handleRemoveFromCart;
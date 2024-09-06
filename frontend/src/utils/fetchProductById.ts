import {CustomResponse} from "./CustomResponse";
import SummaryApi from "../common";

export const fetchProductById = async (productId: string) => {

    const response: CustomResponse = await fetch(SummaryApi.productDetails.url.replace('productId', productId), {
        method: SummaryApi.productDetails.method,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }

    const resData: CustomResponse = await response.json();

    return resData;
};
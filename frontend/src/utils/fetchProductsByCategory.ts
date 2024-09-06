import {CustomResponse} from './CustomResponse';
import SummaryApi from "../common";

export const fetchProductsByCategory = async (category: string) => {
    const url = `${SummaryApi.productsByCategory.url}?category=${category.toLowerCase()}`;
    const response: CustomResponse = await fetch(url, {
        method: SummaryApi.productsByCategory.method,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const resData: CustomResponse = await response.json();

    return resData;
};
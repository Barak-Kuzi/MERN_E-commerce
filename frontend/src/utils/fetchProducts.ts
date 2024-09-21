import { fetchProductById } from "./fetchProductById";
import { Product } from "../models";
import {CustomResponse} from "./CustomResponse";

interface FetchProductsProps {
    productId: string;
    quantity?: number;
}

export const fetchProducts = async (userProducts: FetchProductsProps[]): Promise<Product[]> => {
    const details = await Promise.all(userProducts.map(async (item: FetchProductsProps) => {
        try {
            const productDetailsResponse: CustomResponse = await fetchProductById(item.productId);
            if (productDetailsResponse.success) {
                const productDetails: Product = productDetailsResponse.data;
                console.log(item.quantity)
                if (item.quantity) {
                    return { ...productDetails, quantity: item.quantity };
                } else {
                    return { ...productDetails, lovedProduct: true };
                }
            }
            // return { ...productDetails.data, quantity: item.quantity };
        } catch (error) {
            console.error(`Failed to fetch details for product ID: ${item.productId}`, error);
            return null;
        }
    }));
    return details.filter(detail => detail !== null) as Product[];
};
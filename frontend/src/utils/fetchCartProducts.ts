import { fetchProductById } from "./fetchProductById";
import { Product } from "../models";

interface CartItem {
    productId: string;
    quantity: number;
}

export const fetchCartProducts = async (userCart: CartItem[]): Promise<Product[]> => {
    const details = await Promise.all(userCart.map(async (item: CartItem) => {
        try {
            const productDetails = await fetchProductById(item.productId);
            return { ...productDetails.data, quantity: item.quantity };
        } catch (error) {
            console.error(`Failed to fetch details for product ID: ${item.productId}`, error);
            return null;
        }
    }));
    return details.filter(detail => detail !== null) as Product[];
};
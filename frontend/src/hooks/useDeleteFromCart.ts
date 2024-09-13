import { useState } from 'react';
import {toast} from "react-toastify";

import handleRemoveFromCart from '../utils/handleRemoveFromCart';

const useDeleteProductFromCart = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const deleteProductFromCart = async (productId: string) => {
        // setIsLoading(true);
        try {
            const resData = await handleRemoveFromCart(productId);

            if (resData.success) {
                toast.success(resData.message);
            }

            if (resData.error) {
                toast.error(resData.message);
            }

        } catch (error: any) {
            setError(error.message);
        } finally {
            // setIsLoading(false);
        }
    };

    return { deleteProductFromCart, isLoading, error };
};

export default useDeleteProductFromCart;
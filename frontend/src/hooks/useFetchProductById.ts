import { useEffect, useState } from 'react';

import { Product } from '../models';
import { fetchProductById } from '../utils/fetchProductById';
import { CustomResponse } from '../utils/CustomResponse';

const useFetchProductById = (productId: string) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response: CustomResponse = await fetchProductById(productId);

                if (response.success) {
                    setProduct(response.data);
                }

                if (response.error) {
                    setError(response.message!);
                    console.error(response.message!);
                }

            } catch (error: any) {
                setError(error.message);
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    return { product, isLoading, error };
};

export default useFetchProductById;
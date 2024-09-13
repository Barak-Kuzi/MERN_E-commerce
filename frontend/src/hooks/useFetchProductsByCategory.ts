import {useEffect, useState} from 'react';
import {CustomResponse} from '../utils/CustomResponse';
import {fetchProductsByCategory} from '../utils/fetchProductsByCategory';
import {Product} from '../models';

export const useFetchProductsByCategory = (category: string) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!category) return;

        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response: CustomResponse = await fetchProductsByCategory(category);

                if (response.success) {
                    setProducts(response.data);
                }

                if (response.error) {
                    setError(response.message!);
                    console.log(response.message!);
                }
                setIsLoading(false);

            } catch (error: any) {
                setError(error.message);
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [category]);

    return {products, isLoading, error};
};
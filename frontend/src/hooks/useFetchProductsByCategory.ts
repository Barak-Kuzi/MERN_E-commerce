import {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import {CustomResponse} from '../utils/CustomResponse';
import {fetchProductsByCategory} from '../utils/fetchProductsByCategory';
import {Product} from '../models';
import {RootState} from "../store/store";

export const useFetchProductsByCategory = (category: string) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('');
    const userConnected = useSelector((state: RootState) => state.user?.userConnected);
    const userWishlist = useSelector((state: RootState) => state.wishlist.wishlist);

    useEffect(() => {
        if (!category) return;

        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response: CustomResponse = await fetchProductsByCategory(category);

                if (response.success) {
                    let fetchedProducts = response.data;
                    if (userConnected && userWishlist.length > 0) {
                        fetchedProducts = fetchedProducts.map((product: Product) => {
                            if (userWishlist.find(wishlistProduct => wishlistProduct._id === product._id)) {
                                return {...product, lovedProduct: true};
                            }
                            return product;
                        });
                    }
                    setProducts(fetchedProducts);
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
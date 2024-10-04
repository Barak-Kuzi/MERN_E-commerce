import {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import {CustomResponse} from '../utils/CustomResponse';
import {fetchProductsByCategory} from '../utils/fetchProductsByCategory';
import {Product} from '../models';
import {RootState} from "../store/store";

interface FetchProductsByCategoryHook {
    category: string;
    productDetailsLoading?: boolean;
}

export const useFetchProductsByCategory = ({category, productDetailsLoading}: FetchProductsByCategoryHook) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState('');

    // const userConnected = useSelector((state: RootState) => state.user?.userConnected);
    // const userWishlist = useSelector((state: RootState) => state.wishlist.wishlist);
    // useEffect(() => {
    //     if (productDetailsLoading || !category) return;
    //
    //     const fetchProducts = async () => {
    //         try {
    //             const response: CustomResponse = await fetchProductsByCategory(category);
    //
    //             if (response.success) {
    //                 let fetchedProducts = response.data;
    //                 if (userConnected && userWishlist.length > 0) {
    //                     fetchedProducts = fetchedProducts.map((product: Product) => {
    //                         if (userWishlist.find(wishlistProduct => wishlistProduct._id === product._id)) {
    //                             return {...product, lovedProduct: true};
    //                         }
    //                         return product;
    //                     });
    //                 }
    //                 setProducts(fetchedProducts);
    //             }
    //
    //             if (response.error) {
    //                 setError(response.message!);
    //                 console.log(response.message!);
    //             }
    //
    //         } catch (error: any) {
    //             setError(error.message);
    //             console.log(error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchProducts();
    // }, [category, productDetailsLoading, userConnected, userWishlist]);

    useEffect(() => {
        if (productDetailsLoading || !category) return;

        const fetchProducts = async () => {
            try {
                const response: CustomResponse = await fetchProductsByCategory(category);

                if (response.success) {
                    setProducts(response.data);
                }

                if (response.error) {
                    setError(response.message!);
                    console.log(response.message!);
                }

            } catch (error: any) {
                setError(error.message);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [category, productDetailsLoading]);

    return {products, isLoading, error};
};
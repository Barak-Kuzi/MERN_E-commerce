import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {Product} from '../models';
import {RootState} from '../store/store';

const useUpdateLovedProducts = (products: Product[]) => {
    const userWishlist = useSelector((state: RootState) => state.wishlist.wishlist);
    const [updatedProducts, setUpdatedProducts] = useState<Product[]>(products);

    useEffect(() => {
        const updated = products.map(product => {
            const isLoved = userWishlist?.some(wishProduct => wishProduct._id === product._id);
            return {...product, lovedProduct: !!isLoved};
        });
        setUpdatedProducts(updated);
    }, [userWishlist, products]);

    return updatedProducts;
};

export default useUpdateLovedProducts;
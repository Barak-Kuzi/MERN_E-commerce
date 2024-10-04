import React, {useEffect, useState} from "react";

import styles from "../styles/UserWishlist.module.css";

import {Product} from "../models";
import SummaryApi from "../common";
import {CustomResponse} from "../utils/CustomResponse";
import VerticalProductCard from "../components/VerticalProductCard";
import LoadingVerticalCard from "../components/LoadingVerticalCard";

function UserWishlist(): React.JSX.Element {
    // const userWishlist = useSelector((state: RootState) => state.wishlist.wishlist);
    const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const loadingList = new Array(3).fill(0);

    useEffect(() => {
        const fetchWishlistProducts = async () => {
            try {
                const response = await fetch(SummaryApi.getWishlist.url, {
                    method: SummaryApi.getWishlist.method,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const resData: CustomResponse = await response.json();
                if (resData.success) {
                    console.log(resData.data);
                    setWishlistProducts(resData.data);
                }

            } catch (error: any) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchWishlistProducts();
    }, []);

    return (
        <div className={styles.user_wishlist_page}>
            {/*{userWishlist.length > 0 && <OldVerticalProductCard title="My Wishlist" products={userWishlist}/>}*/}
            {
                isLoading &&
                loadingList.map((_, index) => {
                    return <LoadingVerticalCard key={index}/>
                })
            }
            {
                !isLoading &&
                wishlistProducts.length > 0 && (
                    wishlistProducts.map((product, index) => {
                        return (
                            <VerticalProductCard key={`${product.productName}_${index}`} product={product}/>
                        )
                    })
                )
            }
        </div>
    );
}

export default UserWishlist;
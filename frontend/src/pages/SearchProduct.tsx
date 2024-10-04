import React, {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";

import styles from '../styles/SearchProduct.module.css';

import {Product} from "../models";
import SummaryApi from "../common";
import {RootState} from "../store/store";
import VerticalProductCard from "../components/VerticalProductCard";

function SearchProduct(): React.JSX.Element {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const searchQuery = useSelector((state: RootState) => state.search.query);

    const fetchProducts = useCallback(async (query: string) => {
        if (!query) return;

        try {
            const path = SummaryApi.search.url;
            const response = await fetch(`${path}?query=${query}`, {
                method: SummaryApi.search.method,
            });

            const resData = await response.json();

            if (resData.success) {
                setProducts(resData.data);
            } else {
                setError(resData.message);
            }
        } catch (err) {
            setError("Failed to fetch products");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts(searchQuery);
    }, [searchQuery, fetchProducts]);

    if (error) {
        return <div>{error}</div>;
    }

    console.log('SearchProduct component re-rendered');

    return (
        <div className={styles.search_product_container}>
            <p className={styles.search_result_title}>Search Result: {products.length}</p>

            {
                isLoading && (
                    <p className={styles.loading}>Loading...</p>
                )
            }

            {
                products.length === 0 && !isLoading && (
                    <p className={styles.not_found_message}>Not Found Products...</p>
                )
            }

            {
                products.length !== 0 && !isLoading && (
                    <div className={styles.search_products}>
                        {products.map((product, index) => {
                            return (
                                <VerticalProductCard key={`${product.productName}_${index}`} product={product}/>
                            );
                        })}
                    </div>
                )
            }
        </div>
    );
}

export default SearchProduct;
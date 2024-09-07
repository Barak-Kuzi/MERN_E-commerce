import React, {useEffect, useState} from "react";

import styles from '../styles/SearchProduct.module.css';
import VerticalProductCard from "../components/VerticalProductCard";
import {useLocation} from "react-router-dom";
import {Product} from "../models";

function SearchProduct(): React.JSX.Element {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            const query = new URLSearchParams(location.search).get("query");
            if (!query) return;

            try {
                const response = await fetch(`/api/products/search?query=${query}`);
                const data = await response.json();

                if (data.success) {
                    setProducts(data.data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError("Failed to fetch products");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [location.search]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.search_product}>
            {products.map((product: Product) => (
                <VerticalProductCard key={product?._id} title={product.productName} category={product.productCategory} />
            ))}
        </div>
    );
}

export default SearchProduct;
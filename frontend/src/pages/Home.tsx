import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa6";

import styles from '../styles/Home.module.css';

import SummaryApi from "../common";
import {RootState} from "../store/store";
import {Product} from "../models";
import CategoryList from "../components/CategoryList";
import BannerSlider from "../components/BannerSlider";
// import AppDownload from "../components/AppDownload";
import HorizontalProductCard from "../components/HorizontalProductCard";
import {CustomResponse} from "../utils/CustomResponse";
import LoadingHorizontalCard from "../components/LoadingHorizontalCard";

interface ProductsHomePage {
    categoryName: string;
    categoryProducts: Product[];
}

export default function Home(): React.JSX.Element {
    const userConnected = useSelector((state: RootState) => state.user.userConnected);
    const [products, setProducts] = useState<ProductsHomePage[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const scrollLeft = (event: React.MouseEvent<HTMLButtonElement>) => {
        const categoryName = event.currentTarget.getAttribute('category-product');
        if (categoryName && categoryRefs.current[categoryName]) {
            categoryRefs.current[categoryName]!.scrollLeft -= 300;
        }
    };

    const scrollRight = (event: React.MouseEvent<HTMLButtonElement>) => {
        const categoryName = event.currentTarget.getAttribute('category-product');
        if (categoryName && categoryRefs.current[categoryName]) {
            categoryRefs.current[categoryName]!.scrollLeft += 300;
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            if (!userConnected) {
                setIsLoading(true);
            }
            try {
                const response = await fetch(SummaryApi.getCategorizedProducts.url, {
                    method: SummaryApi.getCategorizedProducts.method,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const resData: CustomResponse = await response.json();
                if (resData.success) {
                    setProducts(resData.data);
                }

            } catch (error: any) {
                console.error('Failed to fetch products', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, [userConnected]);

    return (
        <div className={styles.home_page_container}>
            <CategoryList/>
            <BannerSlider/>
            {isLoading && <LoadingHorizontalCard/>}
            {!isLoading && <div className={styles.products_container}>
                {products.map((item) => {
                    return (
                        <div className={styles.products_inner_container} key={item.categoryName}>
                            <h2>{item.categoryName}</h2>
                            <div className={styles.category_products_container}
                                 ref={(el) => (categoryRefs.current[item.categoryName] = el)}>
                                <button className={styles.prev_button} onClick={scrollLeft}
                                        category-product={item.categoryName}>
                                    <FaAngleLeft/>
                                </button>
                                <button className={styles.next_button} onClick={scrollRight}
                                        category-product={item.categoryName}>
                                    <FaAngleRight/>
                                </button>

                                {item.categoryProducts.map((product: Product, index: number) => (
                                    <HorizontalProductCard
                                        key={index}
                                        product={product}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>}
            {/*<AppDownload/>*/}
        </div>
    );
}
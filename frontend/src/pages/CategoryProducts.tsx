import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate, useLocation} from "react-router-dom";

import styles from '../styles/CategoryProducts.module.css';

import SummaryApi from "../common";
import {Product} from "../models";
import productCategory from "../utils/productCategory";
import {CustomResponse} from "../utils/CustomResponse";
import VerticalProductCard from "../components/VerticalProductCard";

export default function CategoryProducts(): React.JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();
    const initialCategories = new URLSearchParams(location.search).getAll('category');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [sortBy, setSortBy] = useState<string>("");
    const initialRender = useRef<boolean>(true);

    const fetchProducts = useCallback(async () => {
        if (selectedCategories.length === 0) return;

        try {
            const response = await fetch(SummaryApi.filterProducts.url, {
                method: SummaryApi.filterProducts.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    categories: selectedCategories,
                }),
            });
            const resData: CustomResponse = await response.json();
            if (resData.success) {
                setFilteredProducts(resData.data || []);
            } else {
                console.error('Error fetching products:', resData.message);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching products', error);
            setIsLoading(false);
        }
    }, [selectedCategories]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleOnChangeSortBy = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setSortBy(value);

        setFilteredProducts((prevState: Product[]) => {
            const sortedProducts = [...prevState];
            if (value === 'asc') {
                sortedProducts.sort((a: Product, b: Product) => (a.productSellingPrice as number) - (b.productSellingPrice as number));
            } else if (value === 'dsc') {
                sortedProducts.sort((a, b) => (b.productSellingPrice as number) - (a.productSellingPrice as number));
            }
            return sortedProducts;
        });
    };

    const handleSelectCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = e.target;
        const updatedCategories = checked
            ? [...selectedCategories, value]
            : selectedCategories.filter(category => category !== value);

        setSelectedCategories(updatedCategories);
        navigate(`?${updatedCategories.map(category => `category=${category}`).join('&&')}`);
    };

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        const params = new URLSearchParams(location.search);
        const categories = params.getAll('category');
        setSelectedCategories(categories);
    }, [location.search]);

    console.log('CategoryProducts re-rendered');

    return (
        <div className={styles.page_container}>
            <div className={styles.category_products_inner_container}>
                <div className={styles.filter_menu}>
                    <div>
                        <h3>Sort by</h3>
                        <hr/>
                        <form>
                            <div className={styles.filter_menu_label}>
                                <input type='radio' name='sortBy' checked={sortBy === 'asc'}
                                       onChange={handleOnChangeSortBy} value={"asc"}/>
                                <label>Price - Low to High</label>
                            </div>

                            <div className={styles.filter_menu_label}>
                                <input type='radio' name='sortBy' checked={sortBy === 'dsc'}
                                       onChange={handleOnChangeSortBy} value={"dsc"}/>
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>

                    <div>
                        <h3>Category</h3>
                        <hr/>
                        <form>
                            {
                                productCategory.map((categoryName, index) => {
                                    return (
                                        <div className={styles.filter_menu_label} key={`${categoryName}_${index}`}>
                                            <input type='checkbox' name={"category"}
                                                   checked={selectedCategories.includes(categoryName.value)}
                                                   value={categoryName.value} id={categoryName.value}
                                                   onChange={handleSelectCategory}/>
                                            <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>
                </div>

                <div className={styles.products_container}>
                    <p className={styles.search_results_title}>Search Results: {filteredProducts.length}</p>

                    <div className={styles.filtered_products_container}>
                        {
                            filteredProducts.length !== 0 && !isLoading && (
                                filteredProducts.map((product, index) => {
                                    return (
                                        <VerticalProductCard key={`${product.productName}_${index}`} product={product}/>
                                    );
                                })
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}
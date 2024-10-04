import React from 'react';
import {useParams} from "react-router-dom";

import styles from '../styles/ProductDetails.module.css';

import SummaryApi from "../common";
import VerticalProductCard from "../components/VerticalProductCard";
import LoadingProductDetails from "../components/LoadingProductDetails";
import ProductImages from "../components/ProductImages";
import StarRating from "../components/StarRating";
import {CustomResponse} from "../utils/CustomResponse";
import displayCurrency from "../utils/displayCurrency";
import {useFetchProductsByCategory} from "../hooks/useFetchProductsByCategory";
import useFetchProductById from "../hooks/useFetchProductById";
import useAddToCart from "../hooks/useAddToCart";
import LoadingVerticalCard from "../components/LoadingVerticalCard";

const ProductDetails: React.FC = () => {
    const {productId} = useParams();
    const {product, isLoading, error} = useFetchProductById(productId!);
    const {handleAddToCartButton} = useAddToCart();
    const loadingList = new Array(3).fill(0);
    const {
        products,
        isLoading: isLoadingProductsCategory
    } = useFetchProductsByCategory({category: product?.productCategory as string, productDetailsLoading: isLoading});

    console.log('ProductDetails component re-rendered');

    const handleRatingProduct = async (starValue: number) => {
        const response = await fetch(SummaryApi.rateProduct.url, {
            method: SummaryApi.rateProduct.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: productId,
                rating: starValue,
            })
        });

        const resData: CustomResponse = await response.json();
        if (resData.success) {
            console.log(resData.message);
            console.log(resData.data);
        }

        if (resData.error) {
            console.log(resData.message);
        }
    }

    return (
        <div className={styles.page_container}>
            <div className={styles.navigation_route_container}>
                <span className={styles.route_details}>Home page</span>
                <span className={styles.route_details}>{`>`}</span>
                <span className={styles.route_details}>{product?.productCategory}</span>
                <span className={styles.route_details}>{`>`}</span>
                <span className={styles.current_route}>{product?.productName}</span>
            </div>

            <div className={styles.inner_page_container}>
                <ProductImages isLoading={isLoading} product={product}/>

                {
                    isLoading ? (<LoadingProductDetails/>) : (
                        <div className={styles.product_details_container}>
                            <p className={styles.product_brand}>{product?.productBrand}</p>
                            <h2 className={styles.product_name}>{product?.productName}</h2>

                            <div className={styles.product_rating}>
                                <StarRating
                                    totalStars={5}
                                    ratingProduct={product?.averageRating || 0}
                                    isClickable={true}
                                    onRate={handleRatingProduct}
                                />
                                <span className={styles.product_reviews}>20k reviews</span>
                            </div>

                            <div className={styles.product_prices_container}>
                                <p className={styles.selling_price}>{displayCurrency(product?.productSellingPrice as number)}</p>
                                <p className={styles.old_price}>{displayCurrency(product?.productPrice as number)}</p>
                            </div>

                            <div className={styles.description_container}>
                                <p className={styles?.description_title}>Description:</p>
                                <p className={styles?.product_description}>{product?.productDescription}</p>
                            </div>

                            <div className={styles.buttons_container}>
                                <button className={styles.add_to_cart_button} product-id={product?._id}
                                        onClick={handleAddToCartButton}>
                                    Add To Cart
                                </button>
                                <button className={styles.buy_button}>Buy Now</button>
                            </div>
                        </div>
                    )
                }
            </div>

            <h2 className={styles.title_page}>Recommended Products</h2>
            <div className={styles.products_category_container}>
                {
                    isLoadingProductsCategory &&
                    loadingList.map((_, index) => {
                        return <LoadingVerticalCard key={index}/>

                    })
                }
                {
                    !isLoadingProductsCategory &&
                    products && (
                        products.map((product, index) => {
                            return (
                                <VerticalProductCard key={`${product.productName}_${index}`} product={product}/>
                            )
                        })
                    )
                }
            </div>
        </div>
    );
}

export default ProductDetails;
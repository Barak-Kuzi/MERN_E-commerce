import React from 'react';
import {useParams} from "react-router-dom";

import customStyles from '../styles/ProductDetailsVerCard.module.css';
import styles from '../styles/ProductDetails.module.css';

import LoadingProductDetails from "../components/LoadingProductDetails";
import displayCurrency from "../utils/displayCurrency";
import ProductImages from "../components/ProductImages";
import VerticalProductCard from "../components/VerticalProductCard";
import useFetchProductById from "../hooks/useFetchProductById";
import useAddToCart from "../hooks/useAddToCart";
import SummaryApi from "../common";
import {CustomResponse} from "../utils/CustomResponse";
import StarRating from "../components/StarRating";

const ProductDetails: React.FC = () => {
    const {productId} = useParams();
    const {product, isLoading, error} = useFetchProductById(productId!);
    const {handleAddToCartButton} = useAddToCart();

    console.log('ProductDetails component re-rendered');

    if (isLoading)
        return (<p>Loading...</p>);

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
            {
                product && (<VerticalProductCard title={'Recommended Products'} category={product?.productCategory}
                                                 customClassName={customStyles.vertical_product_card_container}/>)
            }
        </div>
    );
}

export default ProductDetails;
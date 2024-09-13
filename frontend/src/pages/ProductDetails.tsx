import React from 'react';
import {useParams} from "react-router-dom";

import styles from '../styles/ProductDetails.module.css';
import star from "../assest/star.svg";
import half_star from "../assest/star-half-fill.svg";
import empty_star from "../assest/star-no-fill.svg";

import LoadingProductDetails from "../components/LoadingProductDetails";
import displayCurrency from "../utils/displayCurrency";
import ProductImages from "../components/ProductImages";
import VerticalProductCard from "../components/VerticalProductCard";
import useFetchProductById from "../hooks/useFetchProductById";
import useAddToCart from "../hooks/useAddToCart";

const ProductDetails: React.FC = () => {
    const {productId} = useParams();
    const {product, isLoading, error} = useFetchProductById(productId!);
    const {handleAddToCartButton} = useAddToCart();

    console.log('ProductDetails component re-rendered');

    if (isLoading)
        return (<p>Loading...</p>);

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
                                <img src={star} alt={"rating"}/>
                                <img src={star} alt={"rating"}/>
                                <img src={star} alt={"rating"}/>
                                <img src={half_star} alt={"rating"}/>
                                <img src={empty_star} alt={"rating"}/>
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
                product && (<VerticalProductCard title={'Recommended Products'} category={product?.productCategory}/>)
            }
        </div>
    );
}

export default ProductDetails;
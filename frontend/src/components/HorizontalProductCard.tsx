import React, {useEffect, useRef, useState} from 'react';
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa6'

import {CustomResponse} from "../utils/CustomResponse";
import {fetchProductsByCategory} from "../utils/fetchProductsByCategory";
import {Product} from "../models";

import styles from './css/HorizontalProductCard.module.css';
import heart from "../assest/assest_new/love.svg";
import star from "../assest/assest_new/star.svg";
import half_star from "../assest/assest_new/star-half-fill.svg";
import empty_star from "../assest/assest_new/star-no-fill.svg";
import {Link} from "react-router-dom";
import {useFetchProductsByCategory} from "../hooks/useFetchProductsByCategory";

interface HorizontalProductCardProps {
    title: string;
    category: string;
}

export default function HorizontalProductCard({title, category}: HorizontalProductCardProps): React.JSX.Element {
    const {products, isLoading, error} = useFetchProductsByCategory(category);
    const loadingList = new Array(8).fill(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft -= 300;
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += 300;
        }
    };

    return (
        <div className={styles.horizontal_product_card_container}>
            <h2>{title}</h2>
            <div className={styles.product_card_display} ref={containerRef}>
                <button className={styles.prev_button} onClick={scrollLeft}>
                    <FaAngleLeft/>
                </button>
                <button className={styles.next_button} onClick={scrollRight}>
                    <FaAngleRight/>
                </button>
                {isLoading ? (
                        loadingList.map((product: Product, index: number) => {
                            return (
                                <div className={styles.product_card} key={index}>
                                    <div className={`${styles.product_card_image_container} ${styles.animate}`}>
                                    </div>

                                    <div className={styles.product_card_details}>
                                        <h2 className={`${styles.loading_title} ${styles.animate}`}>
                                        </h2>

                                        <div className={styles.product_card_details_prices_container}>
                                            <div className={styles.old_price_and_discount_container}>
                                                <span className={`${styles.loading_selling_price} ${styles.animate}`}>
                                                </span>
                                                <span className={`${styles.loading_old_price} ${styles.animate}`}>
                                                </span>
                                            </div>
                                            <div className={`${styles.loading_rating} ${styles.animate}`}>
                                                <span className={`${styles.reviews} ${styles.animate}`}>
                                                </span>
                                            </div>
                                        </div>

                                        <div className={styles.product_card_details_buttons}>
                                            <button className={`${styles.loading_add_to_cart_button} ${styles.animate}`}>
                                            </button>
                                            <button className={`${styles.loading_heart_icon_button} ${styles.animate}`}>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                    : (products.map((product: Product, index: number) => {
                            return (
                                <Link to={`/product-details/${product?._id}`} className={styles.product_card} key={index}>
                                    <div className={styles.product_card_image_container}>
                                        <img src={product.productImages[0]} alt={"name"}
                                             className={styles.product_card_image}/>
                                    </div>

                                    <div className={styles.product_card_details}>
                                        <h2 className={styles.product_card_details_title}>
                                            {product.productName}
                                        </h2>

                                        <div className={styles.product_card_details_prices_container}>
                                            <div className={styles.old_price_and_discount_container}>
                                            <span className={styles.selling_price}>
                                                {`$` + product.productSellingPrice}
                                            </span>
                                                <span className={styles.old_price}>
                                                {`$` + product.productPrice}
                                            </span>
                                            </div>

                                            <div className={styles.rating}>
                                                <img src={star} alt={"rating"}/>
                                                <img src={star} alt={"rating"}/>
                                                <img src={star} alt={"rating"}/>
                                                <img src={half_star} alt={"rating"}/>
                                                <img src={empty_star} alt={"rating"}/>
                                                <span className={styles.reviews}>
                                                20k reviews
                                                </span>
                                            </div>
                                        </div>

                                        <div className={styles.product_card_details_buttons}>
                                            <button className={styles.add_to_cart_button}>
                                                Add To Cart
                                            </button>
                                            <button className={styles.heart_icon_button}>
                                                <img src={heart} alt={"Add to Wishlist"}/>
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    )}
            </div>
        </div>
    );
}
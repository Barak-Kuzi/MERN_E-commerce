import React from 'react';
import {Link} from "react-router-dom";

import styles from '../styles/HorizontalProductCard.module.css';

import {Product} from "../models";
import StarRating from "./StarRating";
import useAddToCart from "../hooks/useAddToCart";
import useUpdateWishlist from "../hooks/useUpdateWishlist";

interface HorizontalProductCardProps {
    product: Product;
}

export default function HorizontalProductCard({product}: HorizontalProductCardProps): React.JSX.Element {
    const {handleAddToCartButton} = useAddToCart();
    const {handleAddToWishlistButton} = useUpdateWishlist();
    const userId = localStorage.getItem('userId');
    const [lovedProduct, setLovedProduct] = React.useState<boolean>(product?.inUsersWishlist?.some((item) => item.userId === userId) || false);

    const handleWishlistButton = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const productId = event.currentTarget.getAttribute('product-id');

        if (productId) {
            setLovedProduct(!lovedProduct);
            await handleAddToWishlistButton(event);
        }
    }

    return (
        <Link to={`/product-details/${product?._id}`} className={styles.product_card}>
            <div className={styles.product_card_image_container}>
                <img src={product?.productImages[0]} alt={"name"}
                     className={styles.product_card_image}/>
            </div>

            <div className={styles.product_card_details}>
                <h2 className={styles.product_card_details_title}>
                    {product?.productName}
                </h2>

                <div className={styles.product_card_details_prices_container}>
                    <div className={styles.old_price_and_discount_container}>
                        <span className={styles.selling_price}>
                            {`$` + product?.productSellingPrice}
                        </span>
                        <span className={styles.old_price}>
                            {`$` + product?.productPrice}
                        </span>
                    </div>

                    <div className={styles.rating}>
                        <StarRating totalStars={5} ratingProduct={product?.averageRating || 0}
                                    isClickable={false}/>
                        {/*<span className={styles.reviews}>*/}
                        {/*    20k reviews*/}
                        {/*</span>*/}
                    </div>
                </div>

                <div className={styles.product_card_details_buttons}>
                    <button className={styles.add_to_cart_button}
                            onClick={handleAddToCartButton} product-id={product?._id}>
                        Add To Cart
                    </button>
                    <button
                        className={`${styles.heart_icon_button} ${(lovedProduct) ? styles.in_wishlist : ""}`}
                        onClick={handleWishlistButton} product-id={product?._id}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"
                             viewBox="0 0 24 24" fill="none">
                            <mask id="mask0_16_68" style={{maskType: "alpha"}}
                                  maskUnits="userSpaceOnUse" x="0" y="0" width="26" height="26">
                                <rect width="26" height="26" fill="black"/>
                            </mask>
                            <g mask="url(#mask0_16_68)">
                                <path
                                    d="M12 21L10.55 19.7C8.86667 18.1833 7.475 16.875 6.375 15.775C5.275 14.675 4.4 13.6875 3.75 12.8125C3.1 11.9375 2.64583 11.1333 2.3875 10.4C2.12917 9.66667 2 8.91667 2 8.15C2 6.58333 2.525 5.275 3.575 4.225C4.625 3.175 5.93333 2.65 7.5 2.65C8.36667 2.65 9.19167 2.83333 9.975 3.2C10.7583 3.56667 11.4333 4.08333 12 4.75C12.5667 4.08333 13.2417 3.56667 14.025 3.2C14.8083 2.83333 15.6333 2.65 16.5 2.65C18.0667 2.65 19.375 3.175 20.425 4.225C21.475 5.275 22 6.58333 22 8.15C22 8.91667 21.8708 9.66667 21.6125 10.4C21.3542 11.1333 20.9 11.9375 20.25 12.8125C19.6 13.6875 18.725 14.675 17.625 15.775C16.525 16.875 15.1333 18.1833 13.45 19.7L12 21Z"
                                    fill="currentColor"/>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </Link>
    );
}
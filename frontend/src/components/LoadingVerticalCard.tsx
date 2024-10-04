import React from 'react';

import styles from '../styles/LoadingVerticalCard.module.css';
import cardStyles from "../styles/VerticalProductCard.module.css";

import StarRating from "./StarRating";

function LoadingVerticalCard(): React.JSX.Element {

    return (
        <div className={cardStyles.product_card}>
            <div className={`${cardStyles.product_image_container} ${styles.animate}`}>
            </div>

            <div className={cardStyles.product_details_container}>
                <h2 className={`${styles.loading_title} ${styles.animate}`}>
                </h2>

                <div className={cardStyles.product_prices_container}>
                    <span className={`${styles.loading_selling_price} ${styles.animate}`}>
                    </span>

                    <div style={{display: 'flex', gap: '0.5rem'}}>
                        <span className={`${styles.loading_old_price} ${styles.animate}`}>
                        </span>
                        <span className={`${styles.loading_selling_tag} ${styles.animate}`}></span>
                    </div>
                </div>

                <div className={`${cardStyles.product_rating} ${styles.animate}`}
                     style={{marginTop: "0.75rem"}}
                >
                    <StarRating
                        totalStars={5}
                        ratingProduct={0}
                        isClickable={false}
                    />
                    <span className={`${styles.loading_old_price} ${styles.animate}`}
                          style={{marginLeft: "0.5rem"}}
                    >
                    </span>
                </div>

                <div className={cardStyles.buttons_container}>
                    <button className={`${styles.loading_add_to_cart_button} ${styles.animate}`}>
                    </button>
                    <button className={`${styles.loading_heart_icon_button} ${styles.animate}`}>
                    </button>
                    <button className={`${styles.loading_heart_icon_button} ${styles.animate}`}>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoadingVerticalCard;
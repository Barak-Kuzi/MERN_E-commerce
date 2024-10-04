import React from 'react';

import styles from '../styles/LoadingHorizontalCard.module.css';
import loadingStyles from '../styles/HorizontalProductCard.module.css';

function LoadingHorizontalCard(): React.JSX.Element {
    const categoryList = [
        {
            categoryName: 'Watches',
            categoryProducts: new Array(4).fill(null)
        },
        {
            categoryName: 'Phones',
            categoryProducts: new Array(4).fill(null)
        },
        {
            categoryName: 'Headphones',
            categoryProducts: new Array(4).fill(null)
        },
        {
            categoryName: 'Desktops',
            categoryProducts: new Array(4).fill(null)
        },
        {
            categoryName: 'Laptops',
            categoryProducts: new Array(4).fill(null)
        },
        {
            categoryName: 'Televisions',
            categoryProducts: new Array(4).fill(null)
        }
    ];

    return (
        <div className={styles.loading_container}>
            {
                categoryList.map((category, index) => {
                    const {categoryName, categoryProducts} = category;
                    return (
                        <div className={styles.category_container} key={index}>
                            <h2>{categoryName}</h2>
                            <div className={styles.products_container}>
                                {categoryProducts.map((_, i) => (
                                    <div className={loadingStyles.product_card} key={i}>
                                        <div
                                            className={`${loadingStyles.product_card_image_container} ${loadingStyles.animate}`}>
                                        </div>

                                        <div className={loadingStyles.product_card_details}>
                                            <h2 className={`${loadingStyles.loading_title} ${loadingStyles.animate}`}>
                                            </h2>

                                            <div className={loadingStyles.product_card_details_prices_container}>
                                                <div className={loadingStyles.old_price_and_discount_container}>
                                                    <span
                                                        className={`${loadingStyles.loading_selling_price} ${loadingStyles.animate}`}></span>
                                                    <span
                                                        className={`${loadingStyles.loading_old_price} ${loadingStyles.animate}`}></span>
                                                </div>
                                                <div
                                                    className={`${loadingStyles.loading_rating} ${loadingStyles.animate}`}>
                                                    <span
                                                        className={`${loadingStyles.reviews} ${loadingStyles.animate}`}></span>
                                                </div>
                                            </div>

                                            <div className={loadingStyles.product_card_details_buttons}>
                                                <button
                                                    className={`${loadingStyles.loading_add_to_cart_button} ${loadingStyles.animate}`}></button>
                                                <button
                                                    className={`${loadingStyles.loading_heart_icon_button} ${loadingStyles.animate}`}></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default LoadingHorizontalCard;
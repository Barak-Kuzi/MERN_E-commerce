import React from 'react';

import styles from '../styles/VerticalProductCard.module.css';
import star from '../assest/assest_new/star.svg';
import half_star from '../assest/assest_new/star-half-fill.svg';
import empty_star from '../assest/assest_new/star-no-fill.svg';
import heart from '../assest/assest_new/love.svg';
import eye from '../assest/assest_new/eye.svg';

import {useFetchProductsByCategory} from "../hooks/useFetchProductsByCategory";
import useAddToCart from "../hooks/useAddToCart";


interface VerticalProductCardProps {
    title: string;
    category: string;
}

export default function VerticalProductCard({title, category}: VerticalProductCardProps): React.JSX.Element {
    const {products, isLoading, error} = useFetchProductsByCategory(category);
    const loadingList = new Array(8).fill(null);
    const {handleAddToCartButton} = useAddToCart();

    return (
        <div className={styles.vertical_product_card_container}>
            <h2 className={styles.title_page}>{title}</h2>
            <div className={styles.product_card_inner_container}>
                {
                    products.map((product, index) => {
                        return (
                            <div className={styles.product_card} key={`${product.productName}_${index}`}>
                                <div className={styles.product_image_container}>
                                    <img src={product?.productImages[0]} alt={product?.productName}
                                         className={styles.product_image}/>
                                </div>

                                <div className={styles.product_details_container}>
                                    <h2 className={styles.product_name}>{product?.productName}</h2>

                                    <div className={styles.product_prices_container}>
                                        <span className={styles.product_selling_price}>
                                            {`$${product?.productSellingPrice}`}
                                        </span>

                                        <div style={{display: 'flex', gap: '0.5rem'}}>
                                            <span className={styles.product_old_price}>
                                                {`$${product?.productPrice}`}
                                            </span>
                                            <span className={styles.product_discount_percent}>save 25%</span>
                                        </div>
                                    </div>

                                    <div className={styles.product_rating}>
                                        <img src={star} alt={"rating"}/>
                                        <img src={star} alt={"rating"}/>
                                        <img src={star} alt={"rating"}/>
                                        <img src={half_star} alt={"rating"}/>
                                        <img src={empty_star} alt={"rating"}/>
                                        <span className={styles.product_reviews}>20k reviews</span>
                                    </div>

                                    <div className={styles.buttons_container}>
                                        <button className={styles.add_to_cart_button} product-id={product?._id}
                                                onClick={handleAddToCartButton}>
                                            Add To Cart
                                        </button>
                                        <button className={styles.icon_button}>
                                            <img src={heart} alt={"Add to Wishlist"}/>
                                        </button>
                                        <button className={styles.icon_button}>
                                            <img src={eye} alt={"Add to Wishlist"}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}
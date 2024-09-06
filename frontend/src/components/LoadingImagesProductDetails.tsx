import React from 'react';

import styles from '../styles/ProductDetails.module.css';

export default function LoadingImagesProductDetails(): React.JSX.Element {
    const productImageListLoading = new Array(4).fill(null);

    return (
        <div className={styles.other_product_images_inner_container}>
            {
                productImageListLoading.map((element, index) => {
                    return (
                        <div className={`${styles.product_image} ${styles.animate}`} key={`loadingImage_${index}`}>
                        </div>
                    )
                })
            }
        </div>
    );
}
import React from 'react';

import styles from '../styles/LoadingProductDetails.module.css';

export default function LoadingProductDetails(): React.JSX.Element {

    return (
        <div className={styles.loading_product_details}>
            <p className={`${styles.loading_detail} ${styles.animate}`}
            style={{backgroundColor: '#aeefbb'}}></p>
            <p className={`${styles.loading_detail} ${styles.animate}`}
               style={{width: '25rem', height: '2.5rem', marginTop: '0.25rem'}}></p>
            <p className={`${styles.loading_detail} ${styles.animate}`}
               style={{width: '10rem', height: '1.5rem', marginTop: '0.25rem'}}></p>

            <div className={styles.loading_prices_container}>
                <p className={`${styles.loading_detail} ${styles.animate}`}
                   style={{width: '10rem', height: '2.5rem'}}></p>
                <p className={`${styles.loading_detail} ${styles.animate}`}
                   style={{width: '8rem', height: '2rem'}}></p>
            </div>

            <p className={`${styles.loading_detail} ${styles.animate}`}
               style={{width: '8rem', height: '2rem', marginTop: '1.5rem'}}></p>
            <p className={`${styles.loading_detail} ${styles.animate}`}
               style={{width: '42rem', height: '2rem', marginTop: '0.25rem'}}></p>
            <p className={`${styles.loading_detail} ${styles.animate}`}
               style={{width: '32rem', height: '2rem'}}></p>

            <div className={styles.loading_buttons_container}>
                <button className={`${styles.loading_button} ${styles.animate}`}
                style={{border: 'none'}}></button>
                <button className={`${styles.loading_button} ${styles.animate}`}
                style={{backgroundColor: 'transparent', border: '#8de5a1 1px solid'}}></button>
            </div>
        </div>
    );
}
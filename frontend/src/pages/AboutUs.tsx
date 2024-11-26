import React from 'react';
import styles from '../styles/AboutUs.module.css';

export default function AboutUs(): React.JSX.Element {
    return (
        <div className={styles.about_us_container}>
            <h1>About Us</h1>
            <p>
                Welcome to Tech-Market! We are dedicated to providing a pleasant and secure shopping experience for technology enthusiasts. Our mission is to offer a wide variety of high-quality technological products, provide detailed information about each product, and save you time in online shopping.
            </p>
            <p>
                At Tech-Market, we believe in the power of technology to transform lives. Our team is passionate about bringing the latest and greatest tech products to our customers. Whether you are looking for the newest gadgets, the best deals, or expert advice, we are here to help.
            </p>
            <p>
                Thank you for choosing Tech-Market. We look forward to serving you!
            </p>
        </div>
    );
}
import React from 'react';

import styles from '../styles/Footer.module.css';

import my_logo from '../assest/my_logo.png';
import Facebook from '../assest/facebook_icon.png';
import Twitter from '../assest/twitter_icon.png';
import Linkedin from '../assest/linkedin_icon.png';

export default function Footer(): React.JSX.Element {

    const content: string = `Tech-Market provides a pleasant and secure shopping experience for technology enthusiasts. By offering a wide variety of high-quality technological and new products that have come to the market, providing information about the product, and saving time in online shopping.`;

    return (
        <div className={styles.footer} id='footer'>
            <div className={styles.footer_content}>
                <div className={styles.footer_content_left}>
                    <img src={my_logo} alt="logo" className={styles.logo}/>
                    <p>{content}</p>
                    <div className={styles.social_media_icons}>
                        <img src={Facebook} alt="Facebook icon"/>
                        <img src={Twitter} alt="Twitter icon"/>
                        <img src={Linkedin} alt="Linkedin icon"/>
                    </div>
                </div>
                <div className={styles.footer_content_center}>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className={styles.footer_content_right}>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>Address: 123 Street Name, City, England</li>
                        <li>Phone: +123 456 789</li>
                        <li>Email: contant@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className={styles.footer_copyright}>
                Copyright 2024 &copy; Tomato.com - All Right Reserved.
            </p>
        </div>
    );
}
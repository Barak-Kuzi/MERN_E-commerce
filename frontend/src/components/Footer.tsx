import React from 'react';

import styles from '../styles/Footer.module.css';
import Logo from '../components/Logo';
import Facebook from '../assest/facebook_icon.png';
import Twitter from '../assest/twitter_icon.png';
import Linkedin from '../assest/linkedin_icon.png';

export default function Footer(): React.JSX.Element {

    return (
        <div className={styles.footer} id='footer'>
            <div className={styles.footer_content}>
                <div className={styles.footer_content_left}>
                    <Logo width={90} height={50}/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda ea exercitationem
                        ipsa iusto molestias perferendis quidem saepe. Ab ad amet architecto blanditiis deleniti
                        exercitationem facilis odit quia suscipit voluptates?</p>
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
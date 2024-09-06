import React from 'react';

import styles from '../styles/Footer.module.css';
import Logo from '../components/Logo';

export default function Footer():React.JSX.Element {

return (
    <div className={styles.footer} id='footer'>
        <div className={styles.footer_content}>
            <div className={styles.footer_content_left}>
                <Logo width={90} height={50}/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda ea exercitationem ipsa iusto molestias perferendis quidem saepe. Ab ad amet architecto blanditiis deleniti exercitationem facilis odit quia suscipit voluptates?</p>
                <div className={styles.social_media_icons}>

                </div>
            </div>
            <div className={styles.footer_content_center}>

            </div>
            <div className={styles.footer_content_right}>

            </div>
        </div>
    </div>
);


    // return (
    //     <footer className="my_footer">
    //         <div className="footer_container">
    //             <p title="Youtube Channel">Dynamic Coding with Amit</p>
    //         </div>
    //     </footer>
    // );
}
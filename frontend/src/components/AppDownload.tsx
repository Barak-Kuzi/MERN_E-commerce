import React from 'react';

import styles from '../styles/AppDownload.module.css';
import AppStore from '../assest/app_store.png';
import PlayStore from '../assest/play_store.png';

function AppDownload() {
    return (
        <div className={styles.app_download} id='app_download'>
            <p>For Better Experience Download <br/> TechMarket App</p>
            <div className={styles.app_download_platforms}>
                <img src={AppStore} alt="AppStore"/>
                <img src={PlayStore} alt="PlayStore"/>
            </div>
        </div>
    );
}

export default AppDownload;
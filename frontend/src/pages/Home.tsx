import React from 'react';

import styles from '../styles/Home.module.css';

import CategoryList from "../components/CategoryList";
import BannerSlider from "../components/BannerSlider";
import HorizontalProductCard from "../components/HorizontalProductCard";
import AppDownload from "../components/AppDownload";

export default function Home(): React.JSX.Element {

    return (
        <div className={styles.home_page_container}>
            <CategoryList/>
            <BannerSlider/>
            <div className={styles.products_container}>
                <HorizontalProductCard title={'Phones'} category={'phones'}/>
                <HorizontalProductCard title={'Headphones'} category={'headphones'}/>
                <HorizontalProductCard title={'Desktops'} category={'desktops'}/>
                <HorizontalProductCard title={'Watches'} category={'watches'}/>
                <HorizontalProductCard title={'Laptops'} category={'laptops'}/>
                <HorizontalProductCard title={'Televisions'} category={'televisions'}/>
            </div>
            <AppDownload/>
        </div>
    );
}
import React from 'react';

import CategoryList from "../components/CategoryList";
import BannerSlider from "../components/BannerSlider";
import HorizontalProductCard from "../components/HorizontalProductCard";

export default function Home(): React.JSX.Element {

    return (
        <div>
            <CategoryList/>
            <BannerSlider/>

            <HorizontalProductCard title={'Phones'} category={'phones'}/>
            <HorizontalProductCard title={'Headphones'} category={'headphones'}/>
            <HorizontalProductCard title={'Desktops'} category={'desktops'}/>
            <HorizontalProductCard title={'Watches'} category={'watches'}/>
            <HorizontalProductCard title={'Laptops'} category={'laptops'}/>
            <HorizontalProductCard title={'Televisions'} category={'televisions'}/>
        </div>
    );
}
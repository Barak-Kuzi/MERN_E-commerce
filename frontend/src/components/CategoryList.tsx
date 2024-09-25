import React from 'react';
import {Link} from "react-router-dom";

import cp_cat from '../assest/productCategories/cp_cat.webp';
import hd_cat from '../assest/productCategories/hp_cat.webp';
import dt_cat from '../assest/productCategories/dt_cat.webp';
import sw_cat from '../assest/productCategories/sw_cat.webp';
import lp_cat from '../assest/productCategories/lp_cat.webp';
import tv_cat from '../assest/productCategories/tv_cat.webp';

const productCategories = [
    {img: cp_cat, name: "phones"},
    {img: hd_cat, name: "Headphones"},
    {img: dt_cat, name: "Desktops"},
    {img: sw_cat, name: "Watches"},
    {img: lp_cat, name: "Laptops"},
    {img: tv_cat, name: "Televisions"}
];

export default function CategoryList(): React.JSX.Element {
    return (
        <div className="category_list_container">
            <div className="category_list_inner_container">
                {
                    productCategories.map((category, index) => {
                        return (
                            <Link to={`/product-category?category=${category.name.toLowerCase()}`} className="category_link"
                                  key={category.name}>
                                <div key={index} className="category_image">
                                    <img src={category.img} alt="category list"/>
                                </div>
                                <p className="category_title">
                                    {category.name}
                                </p>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
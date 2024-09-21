import React, {useEffect, useState} from 'react';
import {FaAngleRight} from "react-icons/fa6";
import {FaAngleLeft} from "react-icons/fa6";

import banner1 from "../assest/bannersProjcet/banner_1.webp";
import banner2 from "../assest/bannersProjcet/banner_2.webp";
import banner3 from "../assest/bannersProjcet/banner_3.webp";
import banner4 from "../assest/bannersProjcet/banner_4.webp";
import banner5 from "../assest/bannersProjcet/banner_5.webp";
import banner6 from "../assest/bannersProjcet/banner_6.webp";
import banner7 from "../assest/bannersProjcet/banner_7.webp";

const bannerImages = [
    {img: banner1},
    {img: banner2},
    {img: banner3},
    {img: banner4},
    {img: banner5},
    {img: banner6},
    {img: banner7}
];

export default function BannerSlider(): React.JSX.Element {

    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        if (currentImage === bannerImages.length - 1) {
            setCurrentImage(0);
        } else {
            setCurrentImage(currentImage + 1);
        }
    }

    const prevImage = () => {
        if (currentImage === 0) {
            setCurrentImage(bannerImages.length - 1);
        } else {
            setCurrentImage(currentImage - 1);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (bannerImages.length - 1 > currentImage) {
                setCurrentImage(currentImage + 1);
            } else {
                setCurrentImage(0);
            }
        }, 4000);

        return () => clearInterval(interval)
    }, [currentImage])

    return (
        <div className="banner_slider_container">
            <div className="banner_slider_inner_container">
                <div className="banner_slider_buttons_container">
                    <button onClick={prevImage}>
                        <FaAngleLeft/>
                    </button>
                    <button onClick={nextImage}>
                        <FaAngleRight/>
                    </button>
                </div>

                <div className="banner_slider_image_container">
                    {bannerImages.map((image, index) => (
                        <div
                            key={index}
                            className={`banner_slider_image`}
                            style={{display: index === currentImage ? 'block' : 'none'}}
                        >
                            <img src={image.img} alt="banner"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
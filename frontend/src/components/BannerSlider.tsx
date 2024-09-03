import React, {useEffect, useState} from 'react';
import {FaAngleRight} from "react-icons/fa6";
import {FaAngleLeft} from "react-icons/fa6";

import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'

const bannerImages = [
    {img: image1},
    {img: image2},
    {img: image3},
    {img: image4},
    {img: image5}
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
        }, 5000);

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
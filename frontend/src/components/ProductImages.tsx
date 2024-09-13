import React, {useCallback, useEffect, useState} from 'react';

import styles from "../styles/ProductDetails.module.css";

import ZoomedImage from "./ZoomedImage";
import LoadingImagesProductDetails from "./LoadingImagesProductDetails";
import {Product} from "../models";

interface ProductImagesProps {
    isLoading: boolean;
    product: Product | null;
}

export interface zoomImageCoordinateStruct {
    x: number,
    y: number
}

export default function ProductImages({isLoading, product}: ProductImagesProps): React.JSX.Element {
    const [activeProductImage, setActiveProductImage] = useState<string>(product?.productImages[0] as string || '');
    const [zoomImage, setZoomImage] = useState<boolean>(false);
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState<zoomImageCoordinateStruct>({x: 0, y: 0});

    useEffect(() => {
        if (product?.productImages[0]) {
            setActiveProductImage(product.productImages[0]);
        }
    }, [product]);

    const handleZoomImage = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
        setZoomImage(true);
        const {left, top, width, height} = e.currentTarget.getBoundingClientRect();

        const x: number = (e.clientX - left) / width;
        const y: number = (e.clientY - top) / height;

        setZoomImageCoordinate({x, y});
    }, []);

    const handleLeaveImageZoom = useCallback(() => {
        setZoomImage(false);
    }, []);

    const handleImageClick = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        setActiveProductImage(e.currentTarget.src);
    }, []);

    return (
        <div className={styles.product_images_container}>
            {
                isLoading ? (
                    <div className={`${styles.loading_product_image} ${styles.animate}`}></div>
                ) : (
                    <div className={styles.active_product_image}>
                        <img src={activeProductImage} alt={product?.productName}
                             onMouseMove={handleZoomImage}
                             onMouseLeave={handleLeaveImageZoom}/>
                        <ZoomedImage
                            imageUrl={activeProductImage}
                            zoomImageCoordinate={zoomImageCoordinate}
                            zoomImage={zoomImage}
                        />
                    </div>
                )
            }
            <div className={styles.other_product_images_container}>
                {
                    isLoading ? (<LoadingImagesProductDetails/>) : (
                        <div className={styles.other_product_images_inner_container}>
                            {
                                product?.productImages.map((image, index) => {
                                    return (
                                        <div className={`${styles.product_image}`} key={`image_${index}`}>
                                            <img src={image} alt={product.productName}
                                                 onClick={handleImageClick}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}
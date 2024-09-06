import React from 'react';

import styles from '../styles/ProductDetails.module.css';
import {zoomImageCoordinateStruct} from "./ProductImages";

interface ZoomedImageProps {
    imageUrl: string;
    zoomImageCoordinate: zoomImageCoordinateStruct;
    zoomImage: boolean;
}

const ZoomedImage: React.FC<ZoomedImageProps> = ({ imageUrl, zoomImageCoordinate, zoomImage }) => {
    if (!zoomImage) return null;

    return (
        <div className={styles.zoom_image_container}>
            <div className={styles.zoom_image} style={{
                background: `url(${imageUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
            }}>
            </div>
        </div>
    );
}

export default React.memo(ZoomedImage);
import React from 'react';
import {CgClose} from 'react-icons/cg'

interface DisplayImageProps {
    image: string;
    onClose: () => void;
}

export default function DisplayImage({image, onClose}: DisplayImageProps): React.JSX.Element {
    return (
        <div className="display_image_container">
            <div className="display_image_container_image">
                <div className="display_image_container_image_close" onClick={onClose}>
                    <CgClose/>
                </div>
                <div className="display_image">
                    <img src={image} alt="product_image"/>
                </div>
            </div>
        </div>
    )
}
import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import styles from './css/ProductDetails.module.css';

import {Product} from "../models";
import {fetchProductById} from "../utils/fetchProductById";
import {CustomResponse} from "../utils/CustomResponse";
import LoadingImagesProductDetails from "./util_components/LoadingImagesProductDetails";
import LoadingProductDetails from "./util_components/LoadingProductDetails";
import ZoomedImage from './util_components/ZoomedImage';

import star from "../assest/assest_new/star.svg";
import half_star from "../assest/assest_new/star-half-fill.svg";
import empty_star from "../assest/assest_new/star-no-fill.svg";
import displayCurrency from "../utils/displayCurrency";
import VerticalProductCard from "../components/VerticalProductCard";

export interface zoomImageCoordinateStruct {
    x: number,
    y: number
}

const ProductDetails: React.FC = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('');
    const [activeProductImage, setActiveProductImage] = useState<string>('');
    const [zoomImage, setZoomImage] = useState<boolean>(false);
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState<zoomImageCoordinateStruct>({x: 0, y: 0});

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            const response: CustomResponse = await fetchProductById(productId!);

            if (response.success) {
                setProduct(response.data);
                setActiveProductImage(response.data.productImages[0]);
            }

            if (response.error) {
                setError(response.message!);
                console.log(response.message!);
            }
            setIsLoading(false);
        }
        fetchProduct();
    }, [productId]);

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

    const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        setActiveProductImage(e.currentTarget.src);
    }

    return (
        <div className={styles.page_container}>
            <div className={styles.navigation_route_container}>
                <span className={styles.route_details}>Home page</span>
                <span className={styles.route_details}>{`>`}</span>
                <span className={styles.route_details}>{product?.productCategory}</span>
                <span className={styles.route_details}>{`>`}</span>
                <span className={styles.current_route}>{product?.productName}</span>
            </div>

            <div className={styles.inner_page_container}>
                <div className={styles.product_images_container}>
                    {
                        isLoading ? (
                            <div className={`${styles.loading_product_image} ${styles.animate}`}></div>
                        ) : (
                            <div className={styles.active_product_image}>
                                <img src={activeProductImage} alt={product?.productName} onMouseMove={handleZoomImage}
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

                {
                    isLoading ? (<LoadingProductDetails/>) : (
                        <div className={styles.product_details_container}>
                            <p className={styles.product_brand}>{product?.productBrand}</p>
                            <h2 className={styles.product_name}>{product?.productName}</h2>

                            <div className={styles.product_rating}>
                                <img src={star} alt={"rating"}/>
                                <img src={star} alt={"rating"}/>
                                <img src={star} alt={"rating"}/>
                                <img src={half_star} alt={"rating"}/>
                                <img src={empty_star} alt={"rating"}/>
                                <span className={styles.product_reviews}>20k reviews</span>
                            </div>

                            <div className={styles.product_prices_container}>
                                <p className={styles.selling_price}>{displayCurrency(product?.productSellingPrice as number)}</p>
                                <p className={styles.old_price}>{displayCurrency(product?.productPrice as number)}</p>
                            </div>

                            <div className={styles.description_container}>
                                <p className={styles?.description_title}>Description:</p>
                                <p className={styles?.product_description}>{product?.productDescription}</p>
                            </div>

                            <div className={styles.buttons_container}>
                                <button className={styles.add_to_cart_button}>Add To Cart</button>
                                <button className={styles.buy_button}>Buy Now</button>
                            </div>
                        </div>
                    )
                }

            </div>
            <VerticalProductCard title={'Recommended Products'} category={'phones'}/>
        </div>
    );
}

export default React.memo(ProductDetails);
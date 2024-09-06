import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {MdClear} from "react-icons/md";

import styles from '../styles/Cart.module.css';

import {fetchProductById} from "../utils/fetchProductById";
import {Product} from "../models";

interface ProductsCart extends Product{
    quantity: number;
}

function Cart(): React.JSX.Element {
    const userCart = useSelector((state:any) => state.user?.user?.cart);
    const [productsCart, setProductsCart] = useState<ProductsCart[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCartDetails = async () => {
            const details = await Promise.all(userCart.map(async (item: { productId: string, quantity: number }) => {
                try {
                    const productDetails = await fetchProductById(item.productId);
                    return { ...productDetails.data, quantity: item.quantity };
                } catch (error) {
                    console.error(`Failed to fetch details for product ID: ${item.productId}`, error);
                    return null;
                }
            }));
            setProductsCart(details.filter(detail => detail !== null));
            setIsLoading(false);
        };

        if (userCart && userCart.length > 0) {
            fetchCartDetails();
        } 
    }, [userCart]);

    const handleCalculateSubtotal = () => {
        return productsCart.reduce((acc, item) => acc + (item.productSellingPrice as number * item.quantity), 0).toFixed(2);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log(productsCart);

    const subtotal = handleCalculateSubtotal();
    const deliveryFee = 10;
    const total = parseFloat(subtotal) + deliveryFee;

    return (
        <div className={styles.cart_page_container}>
            <div className={styles.cart_items}>
                <div className={styles.cart_items_title}>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br/>
                <hr/>
                {productsCart.map((product: ProductsCart, index: number) => {
                    return (
                        <div key={`${product.productName}_${index}`}>
                            <div className={`${styles.cart_items_title} ${styles.cart_items_item}`}>
                                <img src={product.productImages[0]} alt={product.productName}/>
                                <p>{product.productName}</p>
                                <p>${product.productSellingPrice}</p>
                                <p>{product.quantity}</p>
                                <p>${product.quantity * (product.productSellingPrice as number)}</p>
                                <div className={styles.remove_icon}><MdClear/></div>
                            </div>
                            <hr/>
                        </div>
                    )
                })}
            </div>
            <div className={styles.cart_summary}>
                <div className={styles.cart_total}>
                    <h2>Cart Totals</h2>
                    <div>
                        <div className={styles.cart_total_details}>
                            <p>Subtotal</p>
                            <p>${subtotal}</p>
                        </div>
                        <hr/>
                        <div className={styles.cart_total_details}>
                            <p>Delivery Fee</p>
                            <p>${deliveryFee}</p>
                        </div>
                        <hr/>
                        <div className={styles.cart_total_details}>
                            <b>Total</b>
                            <b>${total}</b>
                        </div>
                    </div>
                    <button>Proceed to Checkout</button>
                </div>
                <div className={styles.cart_promo_code}>
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className={styles.promo_code_input}>
                            <input type="text" placeholder="Enter Promo Code"/>
                            <button>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
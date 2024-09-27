import React from "react";
import {useSelector} from "react-redux";

import styles from '../styles/CartTotalDetails.module.css';

import {RootState} from "../store/store";

interface CartTotalDetailsProps {
    buttonText: string;
    type?: 'button' | 'submit';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isPlaceOrder?: boolean;
}

function CartTotalDetails({buttonText, type, onClick, isPlaceOrder}: CartTotalDetailsProps): React.JSX.Element {
    const {subtotal, deliveryFee, total, discount} = useSelector((state: RootState) => state.cart);

    return (
        <div className={styles.cart_total}>
            <h2 className={isPlaceOrder ? styles.place_order_title : styles.cart_total_title}>Cart Totals</h2>
            <div>
                <div className={isPlaceOrder ? styles.place_order_details : styles.cart_total_details}>
                    <p>Subtotal</p>
                    <p>${subtotal}</p>
                </div>
                <hr/>
                <div className={isPlaceOrder ? styles.place_order_details : styles.cart_total_details}>
                    <p>Discount</p>
                    <p>{discount > 0 ? (`-$${discount}`) : (`$0`)}</p>
                </div>
                <hr/>
                <div className={isPlaceOrder ? styles.place_order_details : styles.cart_total_details}>
                    <p>Delivery Fee</p>
                    <p>${deliveryFee}</p>
                </div>
                <hr/>
                <div className={isPlaceOrder ? styles.place_order_details : styles.cart_total_details}>
                    <p style={{fontWeight: "600"}}>Total</p>
                    <p style={{fontWeight: "600"}}>${total}</p>
                </div>
            </div>
            <button type={type} onClick={onClick} style={{marginTop: "0.5rem"}}>{buttonText}</button>
        </div>
    );
}

export default CartTotalDetails;
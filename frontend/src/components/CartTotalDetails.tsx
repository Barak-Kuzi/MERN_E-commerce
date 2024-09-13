import React from "react";

import styles from '../styles/CartTotalDetails.module.css';
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

interface CartTotalDetailsProps {
    buttonText: string;
    type?: 'button' | 'submit';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function CartTotalDetails({buttonText, type, onClick}: CartTotalDetailsProps): React.JSX.Element {
    const {subtotal, deliveryFee, total} = useSelector((state: RootState) => state.user?.cart);

    return (
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
            <button type={type} onClick={onClick}>{buttonText}</button>
        </div>
    );
}

export default CartTotalDetails;
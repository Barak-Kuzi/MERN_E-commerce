import React from 'react';
import {Link} from "react-router-dom";
import {shallowEqual, useSelector} from "react-redux";
import {FaShoppingCart} from "react-icons/fa";

import styles from '../styles/CartIcon.module.css';
import {RootState} from "../store/store";

function CartIcon(): React.JSX.Element {
    const quantityProductsInCart = useSelector((state: RootState) => state.user?.cart.products.length, shallowEqual);
    const userConnected = useSelector((state: RootState) => state.user?.userConnected, shallowEqual);

    const handleCartDetails = () => {
        console.log('Cart details clicked');
    }

    return (
        <Link to={"/cart"} className={`${styles.cart_icon} ${userConnected ? '' : styles.hidden}`} onClick={handleCartDetails}>
            <span><FaShoppingCart/></span>
            <div className={styles.amount_cart_products_container}>
                <p className={styles.amount_cart_products_text}>{quantityProductsInCart ? quantityProductsInCart : 0}</p>
            </div>
        </Link>
    )
}

export default CartIcon;
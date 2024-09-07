import React from 'react';
import {Link} from "react-router-dom";
import {FaShoppingCart} from "react-icons/fa";
import {shallowEqual, useSelector} from "react-redux";

function CartIcon(): React.JSX.Element {
    const quantityProductsInCart = useSelector((state: any) => state.user?.cart.length, shallowEqual);

    return (
        <Link to={"/cart"} className="cart_icon">
            <span><FaShoppingCart/></span>
            <div className="amount_cart_products_container">
                <p className="amount_cart_products_text">{quantityProductsInCart ? quantityProductsInCart : 0}</p>
            </div>
        </Link>
    )
}

export default CartIcon;
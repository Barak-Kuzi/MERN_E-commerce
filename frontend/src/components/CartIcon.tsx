import React from 'react';
import {Link} from "react-router-dom";
import {FaShoppingCart} from "react-icons/fa";

interface CartIconProps {
    quantityProductsInCart: number | undefined;
}

function CartIcon({quantityProductsInCart}: CartIconProps): React.JSX.Element {


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
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {MdClear} from "react-icons/md";

import styles from '../styles/Cart.module.css';

import useDeleteProductFromCart from "../hooks/useDeleteFromCart";
import {Product} from "../models";
import CartTotalDetails from "../components/CartTotalDetails";
import {setUserCart} from "../store/userSlice";
import {AppDispatch, RootState} from "../store/store";

function Cart(): React.JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.user?.cart.products);
    const {deleteProductFromCart, isLoading: isDeleting, error} = useDeleteProductFromCart();

    const handleRemoveProduct = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        try {
            const productId = e.currentTarget.getAttribute('product-id');
            await deleteProductFromCart(productId!);
            dispatch(setUserCart(products.filter((item: Product) => item._id !== productId)));
        } catch (error) {
            console.error('Failed to remove product from cart', error);
        }
    }, [deleteProductFromCart, dispatch, products]);


    const handleCheckout = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate('/place-order');
    }

    console.log('Cart component rendered');

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
                {products.map((product: Product, index: number) => {
                    return (
                        <div key={`${product.productName}_${index}`}>
                            <div className={`${styles.cart_items_title} ${styles.cart_items_item}`}>
                                <img src={product.productImages[0] || ''} alt={product.productName}/>
                                <p>{product.productName}</p>
                                <p>${product.productSellingPrice}</p>
                                <p>{product.quantity}</p>
                                <p>${product.quantity! * (product.productSellingPrice as number)}</p>
                                <div className={styles.remove_icon}
                                     product-id={product?._id}
                                     onClick={handleRemoveProduct}
                                >
                                    <MdClear/>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    )
                })}
            </div>
            <div className={styles.cart_summary}>
                <CartTotalDetails buttonText={'Proceed to Checkout'} onClick={handleCheckout}/>
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
import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {MdClear} from "react-icons/md";

import styles from '../styles/Cart.module.css';

import useDeleteProductFromCart from "../hooks/useDeleteFromCart";
import {Product} from "../models";
import CartTotalDetails from "../components/CartTotalDetails";
import {setCouponCode, setDiscount, setCart} from "../store/cartSlice";
import {AppDispatch, RootState} from "../store/store";

function Cart(): React.JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.cart);
    const {deleteProductFromCart, isLoading: isDeleting, error} = useDeleteProductFromCart();
    const [promoCode, setPromoCode] = useState<string>('');
    const [couponApplied, setCouponApplied] = useState<boolean>(false);

    const handleRemoveProduct = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        try {
            const productId = e.currentTarget.getAttribute('product-id');
            await deleteProductFromCart(productId!);
            dispatch(setCart(cart.products.filter((item: Product) => item._id !== productId)));
        } catch (error) {
            console.error('Failed to remove product from cart', error);
        }
    }, [deleteProductFromCart, dispatch, cart.products]);

    const handleCheckout = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate('/place-order');
    }

    const handleOnChangePromoCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const code = event.target.value;
        setPromoCode(code);
    }

    const handleApplyPromoCode = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let discount: number = 0;
        switch (promoCode) {
            case 'save10':
                discount = 0.1;
                break;
            case 'save20':
                discount = 0.2;
                break;
            case 'save30':
                discount = 0.3;
                break;
            case 'save40':
                discount = 0.4;
                break;
            case 'SAVE50':
                discount = 0.5;
                break;
            default:
                break;
        }
        if (discount > 0) {
            let updatedSubtotal: number = Number(parseFloat(String((cart.subtotal * discount))).toFixed(2));
            dispatch(setDiscount(updatedSubtotal));
            dispatch(setCouponCode(promoCode));
            setCouponApplied(true);
        }
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
                {cart.products.map((product: Product, index: number) => {
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
                            <input
                                type="text"
                                placeholder="Enter Promo Code"
                                name={'promoCode'}
                                value={promoCode}
                                onChange={handleOnChangePromoCode}
                            />
                            <button onClick={handleApplyPromoCode} disabled={couponApplied}>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
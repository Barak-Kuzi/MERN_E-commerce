import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import styles from '../styles/PlaceOrder.module.css';

import SummaryApi from "../common";
import {AppDispatch, RootState} from "../store/store";
import {CustomResponse} from "../utils/CustomResponse";
import CartTotalDetails from "../components/CartTotalDetails";
import DeliveryAddressForm from "../components/DeliveryAddressForm";
import {setCouponCode} from "../store/userSlice";

function PlaceOrder(): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const {products: userCartProducts, total, discount, couponCode} = useSelector((state: RootState) => state.user?.cart);
    const userAddress = useSelector((state: RootState) => state.user?.address);

    const [data, setData] = useState({
        firstName: userAddress?.firstName || '',
        lastName: userAddress?.lastName || '',
        email: userAddress?.email || '',
        street: userAddress?.street || '',
        city: userAddress?.city || '',
        state: userAddress?.state || '',
        zipCode: userAddress?.zipCode || '',
        country: userAddress?.country || '',
        phone: userAddress?.phone || '',
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const orderData = {
            products: userCartProducts,
            amount: total,
            discount: discount,
            couponCode: couponCode,
            address: data,
        }

        const response = await fetch(SummaryApi.placeOrder.url, {
            method: SummaryApi.placeOrder.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        const resData: CustomResponse = await response.json();
        if (resData.success) {
            dispatch(setCouponCode(''));
            const session_url = resData.data;
            window.location.replace(session_url);
        }

        if (resData.error) {
            console.log(resData.message);
        }

    }

    return (
        <form className={styles.place_order_page} onSubmit={handleOnSubmit}>
            <div className={styles.place_order_left}>
                <DeliveryAddressForm userAddress={data} handleOnChange={handleOnChange}/>
            </div>
            <div className={styles.place_order_right}>
                <CartTotalDetails type={'submit'} buttonText='Procceed to Payment' isPlaceOrder={true}/>
            </div>
        </form>
    );
}

export default PlaceOrder;
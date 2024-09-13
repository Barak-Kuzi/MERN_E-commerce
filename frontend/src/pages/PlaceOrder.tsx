import React, {useState} from "react";

import styles from '../styles/PlaceOrder.module.css';
import CartTotalDetails from "../components/CartTotalDetails";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import SummaryApi from "../common";
import {CustomResponse} from "../utils/CustomResponse";

function PlaceOrder(): React.JSX.Element {
    const {products: userCartProducts, total} = useSelector((state: RootState) => state.user?.cart);

    console.log(userCartProducts);

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
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
                <p className={styles.title}>Delivery Information</p>
                <div className={styles.multi_fields}>
                    <input type="text"
                           placeholder="First name"
                           name="firstName"
                           value={data.firstName}
                           onChange={handleOnChange}
                    />
                    <input
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        value={data.lastName}
                        onChange={handleOnChange}
                    />
                </div>
                <input
                    type="email"
                    placeholder="Email address"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                />
                <input
                    type="text"
                    placeholder="Street"
                    name="street"
                    value={data.street}
                    onChange={handleOnChange}
                />
                <div className={styles.multi_fields}>
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={data.city}
                        onChange={handleOnChange}
                    />
                    <input
                        type="text"
                        placeholder="State"
                        name="state"
                        value={data.state}
                        onChange={handleOnChange}
                    />
                </div>
                <div className={styles.multi_fields}>
                    <input
                        type="text"
                        placeholder="Zip code"
                        name="zipCode"
                        value={data.zipCode}
                        onChange={handleOnChange}
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        value={data.country}
                        onChange={handleOnChange}
                    />
                </div>
                <input
                    type="text"
                    placeholder="phone"
                    name="phone"
                    value={data.phone}
                    onChange={handleOnChange}
                />
            </div>
            <div className={styles.place_order_right}>
                <CartTotalDetails type={'submit'} buttonText='Procceed to Payment'/>
            </div>
        </form>
    );
}

export default PlaceOrder;
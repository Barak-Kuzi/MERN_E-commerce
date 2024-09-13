import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";

import styles from '../styles/Verify.module.css';

import SummaryApi from "../common";
import {CustomResponse} from "../utils/CustomResponse";
import {AppDispatch, RootState} from "../store/store";
import {setUserCart, setUserConnection} from "../store/userSlice";

function Verify(): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const {products: userCartProducts} = useSelector((state: RootState) => state.user?.cart);

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const navigate = useNavigate();

    const verifyOrder = async () => {
        const response = await fetch(SummaryApi.verifyOrder.url, {
            method: SummaryApi.verifyOrder.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({orderId, success})
        });
        const resData: CustomResponse = await response.json();
        if (resData.success) {
            dispatch(setUserCart([]));
            dispatch(setUserConnection(true));
            navigate('/user-orders');
        }
        if (resData.error) {
            console.error(resData.message);
            navigate('/');
        }
    }

    useEffect(() => {
        verifyOrder();
    }, []);

    return (
        <div className={styles.verify_page}>
            <div className={styles.spinner}>

            </div>
        </div>
    );
}

export default Verify;
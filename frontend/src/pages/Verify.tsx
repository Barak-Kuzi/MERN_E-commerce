import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";

import styles from '../styles/Verify.module.css';

import SummaryApi from "../common";
import {CustomResponse} from "../utils/CustomResponse";
import {AppDispatch} from "../store/store";
import {setUserConnection} from "../store/userSlice";
import {setCart} from "../store/cartSlice";

function Verify(): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const navigate = useNavigate();

    // const verifyOrder = async () => {
    //     const response = await fetch(SummaryApi.verifyOrder.url, {
    //         method: SummaryApi.verifyOrder.method,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({orderId, success})
    //     });
    //     const resData: CustomResponse = await response.json();
    //     if (resData.success) {
    //         dispatch(setCart([]));
    //         dispatch(setUserConnection(true));
    //         navigate('/user-panel/user-orders');
    //     }
    //     if (resData.error) {
    //         console.error(resData.message);
    //         navigate('/');
    //     }
    // }

    useEffect(() => {
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
                dispatch(setCart([]));
                dispatch(setUserConnection(true));
                navigate('/user-panel/user-orders');
            }
            if (resData.error) {
                console.error(resData.message);
                navigate('/');
            }
        }

        verifyOrder();
    }, [dispatch, navigate, orderId, success]);

    return (
        <div className={styles.verify_page}>
            <div className={styles.spinner}>
            </div>
        </div>
    );
}

export default Verify;
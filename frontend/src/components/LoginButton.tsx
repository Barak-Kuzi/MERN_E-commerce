import React, {useCallback} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

import styles from '../styles/LoginButton.module.css';

import SummaryApi from "../common";
import {setUserConnection, setUserDetails} from "../store/userSlice";
import {setCart} from "../store/cartSlice";
import {setWishlist} from "../store/wishlistSlice";
import {setUserOrders} from "../store/orderSlice";
import {setUserAddress} from "../store/addressSlice";

function LoginButton(): React.JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userConnected = useSelector((state: any) => state.user?.userConnected, shallowEqual);

    const handleLogout = useCallback(async () => {
        const response = await fetch(SummaryApi.userLogout.url, {
            method: SummaryApi.userLogout.method,
            credentials: 'include',
        });

        const resData = await response.json();
        if (resData.success) {
            toast(resData.message);

            localStorage.removeItem('token');
            localStorage.removeItem('expiration');

            dispatch(setUserDetails(null));
            dispatch(setUserConnection(false));
            dispatch(setCart([]));
            dispatch(setWishlist([]));
            dispatch(setUserOrders([]));
            dispatch(setUserAddress({
                firstName: '',
                lastName: '',
                email: '',
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
                phone: ''
            }));

            navigate('/');
        } else {
            toast.error(resData.message);
        }
    }, [dispatch, navigate]);

    if (userConnected) {
        return (<button onClick={handleLogout} className={styles.login_button}>Logout</button>)
    }

    return (
        <Link to={'/login'} className={styles.login_button}>Login</Link>
    );
}

export default LoginButton;
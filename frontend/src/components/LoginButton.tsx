import React, {useCallback} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

import styles from '../styles/LoginButton.module.css';
import SummaryApi from "../common";
import {setUserCart, setUserConnection, setUserDetails} from "../store/userSlice";

function LoginButton(): React.JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userConnected = useSelector((state: any) => state.user?.userConnected, shallowEqual);

    const handleLogout = useCallback(async () => {
        const dataResponse = await fetch(SummaryApi.userLogout.url, {
            method: SummaryApi.userLogout.method,
            credentials: 'include',
        });

        const dataApi = await dataResponse.json();
        if (dataApi.success) {
            toast(dataApi.message);
            dispatch(setUserDetails(null));
            dispatch(setUserCart([]));
            dispatch(setUserConnection(false));
            navigate('/');
        } else {
            toast.error(dataApi.message);
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
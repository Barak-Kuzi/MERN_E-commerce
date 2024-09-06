import React, {useCallback} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";

import styles from '../styles/LoginButton.module.css';
import SummaryApi from "../common";
import {setUserDetails} from "../store/userSlice";

interface LoginButtonProps {
    userId: string | undefined;
}

function LoginButton({userId}: LoginButtonProps): React.JSX.Element {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        const dataResponse = await fetch(SummaryApi.userLogout.url, {
            method: SummaryApi.userLogout.method,
            credentials: 'include',
        });

        const dataApi = await dataResponse.json();
        if (dataApi.success) {
            toast(dataApi.message);
            dispatch(setUserDetails(null));
            navigate('/');
        } else {
            toast.error(dataApi.message);
        }
    }, [dispatch, navigate]);

    if (userId) {
        return (<button onClick={handleLogout} className={styles.login_button}>Logout</button>)
    }

    return (
        <Link to={'/login'} className={styles.login_button}>Login</Link>
    );
}

export default LoginButton;
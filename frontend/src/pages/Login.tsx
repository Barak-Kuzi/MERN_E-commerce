import React, {ChangeEvent, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {toast} from 'react-toastify';
import {FaEye, FaEyeSlash} from "react-icons/fa";

import styles from '../styles/Login.module.css';
import loginIcon from "../assest/signin.gif";

import SummaryApi from "../common";
import {AppDispatch} from "../store/store";
import {setUserCart, setUserConnection, setUserDetails, setUserOrders} from "../store/userSlice";
import {CustomResponse} from "../utils/CustomResponse";
import {fetchCartProducts} from "../utils/fetchCartProducts";
import fetchUserOrders from "../utils/fetchUserOrders";

interface data {
    email: string;
    password: string;
}

export default function Login(): React.JSX.Element {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();


    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [userData, setUserData] = useState<data>({
        email: '',
        password: ''
    });


    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setUserData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response: Response = await fetch(SummaryApi.signIn.url, {
                method: SummaryApi.signIn.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const resData: CustomResponse = await response.json();

            if (resData.success) {

                const secondResponse = await fetch(SummaryApi.userDetails.url, {
                    method: SummaryApi.userDetails.method,
                    credentials: 'include',
                });

                const secondResData: CustomResponse = await secondResponse.json();
                if (secondResData.success) {
                    dispatch(setUserDetails(secondResData.data));
                    dispatch(setUserConnection(true));
                    const detailedCartProducts = await fetchCartProducts(secondResData.data.cart);
                    dispatch(setUserCart(detailedCartProducts));
                    const userOrders = await fetchUserOrders();
                    dispatch(setUserOrders(userOrders.data));

                    toast.success('Login successful');
                    navigate('/');
                }
            } else {
                toast.error(resData.message);
            }

        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <section id="login">
            <div className={styles.login_page_container}>
                <div className={styles.login_form_container}>
                    <div className={styles.login_icon}>
                        <img src={loginIcon} alt="Login Icon"/>
                    </div>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <div className={styles.form_group}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter Your Email"
                                   value={userData.email} onChange={handleOnChange}/>
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="password" className={styles.form_label}>Password</label>
                            <div className={styles.input_password}>
                                <input type={showPassword ? "text" : "password"} id="password" name="password"
                                       placeholder="Enter Your Password" value={userData.password}
                                       onChange={handleOnChange}/>
                                <div className={styles.eye_icon} onClick={handleShowPassword}>
                                    <span>
                                        {showPassword ? (<FaEyeSlash/>) : (<FaEye/>)}
                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className={styles.forgot_password}>
                                Forgot password
                            </Link>
                        </div>

                        <button type="submit" className={styles.form_button}>Login</button>
                    </form>
                    <div className={styles.signup_container}>
                        <p>Don't have an account?</p>
                        <Link to={"/sign-up"} className={styles.signup_button}>Sign Up</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
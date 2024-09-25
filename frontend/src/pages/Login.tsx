 import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
 // import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from '../styles/Login.module.css';
import google from "../assest/google.png";
import apple from "../assest/apple.png";
import emailIcon from "../assest/email_icon.svg";
import passwordIcon from "../assest/password_icon.svg";
import lock from "../assest/lock_icon.svg";
import unlock from "../assest/unlock_icon.svg";

import {AppDispatch} from "../store/store";
import SummaryApi from "../common";
import {
    setUserAddress,
    setUserCart,
    setUserConnection,
    setUserDetails,
    setUserOrders,
    setUserWishlist
} from "../store/userSlice";
import {CustomResponse} from "../utils/CustomResponse";
import fetchUserOrders from "../utils/fetchUserOrders";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import {validateEmail, validatePassword} from "../utils/validation";
import {fetchProducts} from "../utils/fetchProducts";

function Login() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const {
        enteredValue: email,
        isEdited: emailIsEdited,
        valueIsValid: emailIsValid,
        errorMessage: emailErrorMessage,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur
    } = useInput({initialValue: '', validationFunction: validateEmail});

    const {
        enteredValue: password,
        isEdited: passwordIsEdited,
        valueIsValid: passwordIsValid,
        errorMessage: passwordErrorMessage,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur
    } = useInput({initialValue: '', validationFunction: validatePassword});

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
                body: JSON.stringify({
                    email,
                    password
                })
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
                    const detailedCartProducts = await fetchProducts(secondResData.data.cart);
                    dispatch(setUserCart(detailedCartProducts));
                    const userOrders = await fetchUserOrders();
                    dispatch(setUserOrders(userOrders.data));
                    const userWishlist = await fetchProducts(secondResData.data.wishlist);
                    dispatch(setUserWishlist(userWishlist));
                    dispatch(setUserAddress(secondResData.data.address));
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
        <div className={styles.login_page_container}>
            <form className={styles.login_form_container} onSubmit={handleSubmit}>
                <div className={styles.welcome_row}>
                    <h1>Welcome back! &#x1F44F;</h1>
                    <p>Please enter your details!</p>
                </div>
                <div className={styles.text_field}>
                    <Input
                        name={"email"}
                        type={"email"}
                        value={email}
                        placeholder={"Enter Your Email"}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                    >
                        Email:
                    </Input>
                    <img
                        alt="Email Icon"
                        src={emailIcon}
                    />
                    {(!emailIsValid && emailIsEdited) && <p className={styles.error_message}>{emailErrorMessage}</p>}
                </div>
                <div className={styles.text_field}>
                    <Input
                        name={"password"}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        placeholder={"Enter Your Password"}
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordBlur}
                    >
                        Password:
                    </Input>
                    <img
                        alt="Password Icon"
                        src={showPassword ? unlock : lock}
                        onClick={handleShowPassword}
                        style={{cursor: "pointer"}}
                    />
                    {(!passwordIsValid && passwordIsEdited) &&
                        <p className={styles.error_message}>{passwordErrorMessage}</p>}
                </div>
                <button type="submit" className={styles.form_button}>Login</button>
                <div className={styles.forgot_password_container}>
                    <p>Didn't remember your password?</p>
                    <Link to={'/forgot-password'} className={styles.forgot_password}>
                        Reset password
                    </Link>
                </div>
                <div className={styles.horizontal_line_container}>
                    <div className={styles.horizontal_line}></div>
                    Or
                    <div className={styles.horizontal_line}></div>
                </div>
                <div className={styles.social_media_container}>
                    <div>
                        <img src={google} alt={"Google"}/>
                        Sign in with Google
                    </div>
                    <div>
                        <img src={apple} alt={"Apple"}/>
                        Sign in with Apple
                    </div>
                </div>
                <div className={styles.signup_container}>
                    <p>Don't have an account?</p>
                    <Link to={"/sign-up"} className={styles.signup_button}>Sign Up</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
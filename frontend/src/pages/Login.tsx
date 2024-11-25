import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";

import styles from '../styles/Login.module.css';
import google from "../assest/google.png";
import apple from "../assest/apple.png";
import emailIcon from "../assest/email_icon.svg";
import eye from "../assest/eye.svg";
import eye_slash from "../assest/eye_slash.webp";

import {AppDispatch} from "../store/store";
import SummaryApi from "../common";
import {
    setUserConnection,
    setUserDetails,
} from "../store/userSlice";
import {fetchUserCart} from "../store/cartSlice";
import {fetchOrders} from "../store/orderSlice";
import {fetchWishlistProducts} from "../store/wishlistSlice";
import {setUserAddress} from "../store/addressSlice";
import {CustomResponse} from "../utils/CustomResponse";
import {validateEmail, validatePassword} from "../utils/validation";
import Input from "../components/Input";
import useInput from "../hooks/useInput";

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
                const token: string = resData?.token!;
                localStorage.setItem('token', token);

                const expiration: Date = new Date();
                expiration.setHours(expiration.getHours() + 1);
                localStorage.setItem('expiration', expiration.toISOString());

                const secondResponse = await fetch(SummaryApi.userDetails.url, {
                    method: SummaryApi.userDetails.method,
                    credentials: 'include',
                });

                const secondResData: CustomResponse = await secondResponse.json();
                if (secondResData.success) {
                    // userSlice
                    dispatch(setUserDetails(secondResData.data));
                    localStorage.setItem('userId', secondResData.data._id);
                    dispatch(setUserConnection(true));
                    // cartSlice
                    dispatch(fetchUserCart(secondResData.data.cart));
                    // orderSlice
                    dispatch(fetchOrders());
                    // wishlistSlice
                    dispatch(fetchWishlistProducts(secondResData.data.wishlist));
                    // addressSlice
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
                        src={showPassword ? eye_slash : eye}
                        onClick={handleShowPassword}
                        style={{cursor: "pointer"}}
                    />
                    {(!passwordIsValid && passwordIsEdited) &&
                        <p className={styles.error_message}>{passwordErrorMessage}</p>}
                </div>
                <button
                    type="submit"
                    className={styles.form_button}
                    disabled={(!emailIsValid && emailIsEdited) || (!passwordIsValid && passwordIsEdited)}
                >
                    Login
                </button>
                <div className={styles.forgot_password_container}>
                    <p>Didn't remember your password?</p>
                    <Link to={'/forgot-password'} className={styles.forgot_password}>
                        Reset password
                    </Link>
                </div>

                {/*Sign In via Google or Apple*/}
                {/*<div className={styles.horizontal_line_container}>*/}
                {/*    <div className={styles.horizontal_line}></div>*/}
                {/*    Or*/}
                {/*    <div className={styles.horizontal_line}></div>*/}
                {/*</div>*/}
                {/*<div className={styles.social_media_container}>*/}
                {/*    <div>*/}
                {/*        <img src={google} alt={"Google"}/>*/}
                {/*        Sign in with Google*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <img src={apple} alt={"Apple"}/>*/}
                {/*        Sign in with Apple*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className={styles.signup_container}>
                    <p>Don't have an account?</p>
                    <Link to={"/sign-up"} className={styles.signup_button}>Sign Up</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

import styles from '../styles/Login.module.css';
import emailIcon from "../assest/email_icon.svg";
import google from "../assest/google.png";
import apple from "../assest/apple.png";
import lock from "../assest/lock_icon.svg";
import unlock from "../assest/unlock_icon.svg";

import SummaryApi from "../common";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import {validateName, validateEmail, validatePassword, validateConfirmPassword} from "../utils/validation";

export default function SignUp(): React.JSX.Element {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const {
        enteredValue: name,
        isEdited: nameIsEdited,
        valueIsValid: nameIsValid,
        errorMessage: nameErrorMessage,
        handleInputChange: handleNameChange,
        handleInputBlur: handleNameBlur
    } = useInput({initialValue: '', validationFunction: validateName});

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

    const {
        enteredValue: confirmPassword,
        isEdited: confirmPasswordIsEdited,
        valueIsValid: confirmPasswordIsValid,
        errorMessage: confirmPasswordErrorMessage,
        handleInputChange: handleConfirmPasswordChange,
        handleInputBlur: handleConfirmPasswordBlur
    } = useInput({initialValue: '', validationFunction: (value) => validateConfirmPassword(password, value)});

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password === confirmPassword) {
            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    confirmPassword,
                    profileImage: ""
                })
            });

            const dataApi = await dataResponse.json();

            if (dataApi.success) {
                toast.success(dataApi.message);
                navigate('/login');
            }

            if (dataApi.error) {
                toast.error(dataApi.message)
            }

        } else
            toast.error("Password and Confirm Password should be same");
    }

    return (
        <section id="sign_up">
            <div className={styles.login_page_container}>
                <form className={styles.login_form_container} onSubmit={handleSubmit}>
                    <div className={styles.welcome_row}>
                        <h1>Get Started Now</h1>
                        <p>Enter your credentials to access your account</p>
                    </div>
                    <div className={styles.social_media_container_signup}>
                        <div>
                            <img src={google} alt={"Google"}/>
                            Sign up with Google
                        </div>
                        <div>
                            <img src={apple} alt={"Apple"}/>
                            Sign up with Apple
                        </div>
                    </div>
                    <div className={styles.horizontal_line_container}>
                        <div className={styles.horizontal_line}></div>
                        Or
                        <div className={styles.horizontal_line}></div>
                    </div>

                    <div className={styles.text_field}>
                        <Input
                            name={"name"}
                            type={"text"}
                            value={name}
                            placeholder={"Enter Your Name"}
                            onChange={handleNameChange}
                            onBlur={handleNameBlur}
                        >
                            Name:
                        </Input>
                        {(!nameIsValid && nameIsEdited) &&
                            <p className={styles.error_message}>{nameErrorMessage}</p>}
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
                        <img src={emailIcon} alt="Email Icon"/>
                        {(!emailIsValid && emailIsEdited) &&
                            <p className={styles.error_message}>{emailErrorMessage}</p>}
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

                    <div className={styles.text_field}>
                        <Input
                            name={"confirmPassword"}
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            placeholder={"Confirm Your Password"}
                            onChange={handleConfirmPasswordChange}
                            onBlur={handleConfirmPasswordBlur}
                        >
                            Confirm Password:
                        </Input>
                        <img
                            alt="Password Icon"
                            src={showConfirmPassword ? unlock : lock}
                            onClick={handleShowConfirmPassword}
                            style={{cursor: "pointer"}}
                        />
                        {(!confirmPasswordIsValid && confirmPasswordIsEdited) &&
                            <p className={styles.error_message}>{confirmPasswordErrorMessage}</p>}
                    </div>

                    <div className={styles.checkbox_field}>
                        <input
                            id="checkbox" type="checkbox"
                            name="checkbox" placeholder="I agree to Terms & Privacy"
                            required
                        />
                        <p>
                            I agree to the <span>Terms and Privacy</span>
                        </p>
                    </div>
                    <button type="submit" className={styles.form_button}>Sign Up</button>
                    <div className={styles.signup_container}>
                        <p>Already have an account?</p>
                        <Link to={"/login"} className={styles.signup_button}>Sign In</Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
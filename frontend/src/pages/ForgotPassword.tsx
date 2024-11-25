import React from 'react';
import {toast} from 'react-toastify';

import styles from '../styles/Login.module.css';
import emailIcon from "../assest/email_icon.svg";

import SummaryApi from '../common';
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import {validateEmail} from "../utils/validation";

export default function ForgotPassword(): React.JSX.Element {
    const {
        enteredValue: email,
        isEdited: emailIsEdited,
        valueIsValid: emailIsValid,
        errorMessage: emailErrorMessage,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur
    } = useInput({initialValue: '', validationFunction: validateEmail});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(SummaryApi.forgotPassword.url, {
                method: SummaryApi.forgotPassword.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });

            const resData = await response.json();
            if (resData.success) {
                toast.success('Email sent');
            } else {
                toast.error(resData.message);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className={styles.login_page_container}>
            <form className={styles.login_form_container} onSubmit={handleSubmit}>
                <div className={styles.welcome_row}>
                    <h1>Forgot Password</h1>
                </div>
                <div className={styles.text_field}>
                    <Input
                        id={"email"}
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
                <button
                    type="submit"
                    className={styles.form_button}
                    disabled={!emailIsValid && emailIsEdited}
                >
                    Send
                </button>
            </form>
        </div>
    );
}
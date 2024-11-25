import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

import styles from '../styles/Login.module.css';
import eye_slash from "../assest/eye_slash.webp";
import eye from "../assest/eye.svg";

import SummaryApi from '../common';
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import {validatePassword} from "../utils/validation";

export default function ResetPassword(): React.JSX.Element {
    const {token} = useParams<{ token: string }>();
    const navigate = useNavigate();
    const {
        enteredValue: password,
        isEdited: passwordIsEdited,
        valueIsValid: passwordIsValid,
        errorMessage: passwordErrorMessage,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur
    } = useInput({initialValue: '', validationFunction: validatePassword});

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${SummaryApi.resetPassword.url}/${token}`, {
                method: SummaryApi.resetPassword.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({password}),
            });

            const resData = await response.json();
            if (resData.success) {
                toast.success('Password updated');
                navigate('/login');
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
                    <h1>Reset Password</h1>
                </div>
                <div className={styles.text_field}>
                    <Input
                        id={"password"}
                        name={"password"}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        placeholder={"Enter Your New Password"}
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordBlur}
                    >
                        New Password:
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
                    disabled={!passwordIsValid && passwordIsEdited}
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
}
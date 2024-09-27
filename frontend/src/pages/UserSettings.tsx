import React, {useState} from 'react';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

import styles from '../styles/UserSettings.module.css';
import userProfileStyles from '../styles/UserProfile.module.css';
import eye from "../assest/eye.svg";
import eye_slash from "../assest/eye_slash.webp";

import useInput from "../hooks/useInput";
import {validateConfirmPassword, validatePassword} from "../utils/validation";
import Input from "../components/Input";
import SummaryApi from "../common";
import {CustomResponse} from "../utils/CustomResponse";

function UserSettings() {
    const navigate = useNavigate();
    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);

    const handleShowCurrentPassword = () => {
        setShowCurrentPassword((prevState) => !prevState);
    }

    const handleShowNewPassword = () => {
        setShowNewPassword((prevState) => !prevState);
    }

    const handleShowConfirmNewPassword = () => {
        setShowConfirmNewPassword((prevState) => !prevState);
    }

    const {
        enteredValue: currentPasswordValue,
        isEdited: currentPasswordIsEdited,
        valueIsValid: currentPasswordIsValid,
        errorMessage: currentPasswordErrorMessage,
        handleInputChange: handleCurrentPasswordChange,
        handleInputBlur: handleCurrentPasswordBlur
    } = useInput({initialValue: '', validationFunction: validatePassword});

    const {
        enteredValue: newPasswordValue,
        isEdited: newPasswordIsEdited,
        valueIsValid: newPasswordIsValid,
        errorMessage: newPasswordErrorMessage,
        handleInputChange: handleNewPasswordChange,
        handleInputBlur: handleNewPasswordBlur
    } = useInput({initialValue: '', validationFunction: validatePassword});

    const {
        enteredValue: confirmNewPasswordValue,
        isEdited: confirmNewPasswordIsEdited,
        valueIsValid: confirmNewPasswordIsValid,
        errorMessage: confirmNewPasswordErrorMessage,
        handleInputChange: handleConfirmNewPasswordChange,
        handleInputBlur: handleConfirmNewPasswordBlur
    } = useInput({initialValue: '', validationFunction: (value) => validateConfirmPassword(newPasswordValue, value)});

    const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch(SummaryApi.changePassword.url, {
            method: SummaryApi.changePassword.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentPassword: currentPasswordValue,
                newPassword: newPasswordValue,
            }),
        });

        const resData: CustomResponse = await response.json();
        if (resData.success) {
            toast.success(resData.message);
            navigate('/user-panel/user-profile');
        }
        if (resData.error) {
            toast.error(resData.message);
        }
    }

    return (
        <div className={userProfileStyles.user_profile_page}>
            <div className={styles.form_container}>
                <h1>Account Settings</h1>
                <h3>Change Password</h3>
                <hr className={userProfileStyles.horizontal_line}/>
                <form className={styles.form_user_settings} onSubmit={handleChangePassword}>
                    <div className={userProfileStyles.form_text_field}>
                        <Input
                            name={"currentPassword"}
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPasswordValue}
                            placeholder={"Enter Your Password"}
                            onChange={handleCurrentPasswordChange}
                            onBlur={handleCurrentPasswordBlur}
                        >
                            Current Password:
                        </Input>
                        <img
                            alt="Password Icon"
                            src={showCurrentPassword ? eye_slash : eye}
                            onClick={handleShowCurrentPassword}
                            style={{cursor: "pointer"}}
                        />
                        {currentPasswordIsEdited && !currentPasswordIsValid && <p>{currentPasswordErrorMessage}</p>}
                    </div>
                    <div className={userProfileStyles.form_text_field}>
                        <Input
                            name={"newPassword"}
                            type={showNewPassword ? "text" : "password"}
                            value={newPasswordValue}
                            placeholder={"Enter Your Password"}
                            onChange={handleNewPasswordChange}
                            onBlur={handleNewPasswordBlur}
                        >
                            New Password:
                        </Input>
                        <img
                            alt="Password Icon"
                            src={showNewPassword ? eye_slash : eye}
                            onClick={handleShowNewPassword}
                            style={{cursor: "pointer"}}
                        />
                        {newPasswordIsEdited && !newPasswordIsValid && <p>{newPasswordErrorMessage}</p>}
                    </div>
                    <div className={userProfileStyles.form_text_field}>
                        <Input
                            name={"confirmNewPassword"}
                            type={showConfirmNewPassword ? "text" : "password"}
                            value={confirmNewPasswordValue}
                            placeholder={"Enter Your Password"}
                            onChange={handleConfirmNewPasswordChange}
                            onBlur={handleConfirmNewPasswordBlur}
                        >
                            Confirm New Password:
                        </Input>
                        <img
                            alt="Password Icon"
                            src={showConfirmNewPassword ? eye_slash : eye}
                            onClick={handleShowConfirmNewPassword}
                            style={{cursor: "pointer"}}
                        />
                        {confirmNewPasswordIsEdited && !confirmNewPasswordIsValid &&
                            <p>{confirmNewPasswordErrorMessage}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={
                            (!currentPasswordIsValid && currentPasswordIsEdited) ||
                            (!newPasswordIsValid && newPasswordIsEdited) ||
                            (!confirmNewPasswordIsValid && confirmNewPasswordIsEdited)
                        }
                        className={userProfileStyles.save_button}
                        style={{marginTop: "0.75rem"}}
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserSettings;
import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

import styles from "../styles/UserProfile.module.css";
import default_profile_image from "../assest/default_profile_image.webp";

import Input from "../components/Input";
import {RootState} from "../store/store";
import useInput from "../hooks/useInput";
import SummaryApi from "../common";
import {CustomResponse} from "../utils/CustomResponse";
import imageToBase64 from "../utils/imageToBase64";
import uploadImage from "../utils/uploadImage";
import Loader from "../components/Loader";

function UserProfile() {
    const userConnected = useSelector((state: RootState) => state.user.userConnected);
    const userDetails = useSelector((state: RootState) => state.user.user);

    const [firstNameUser, lastNameUser]: [string, string] = userConnected ? userDetails?.name.split(" ") as [string, string] : ["", ""];

    const {
        enteredValue: firstName,
        handleInputChange: handleFirstNameChange,
        handleInputBlur: handleFirstNameBlur
    } = useInput({initialValue: firstNameUser || ""});

    const {
        enteredValue: lastName,
        handleInputChange: handleLastNameChange,
        handleInputBlur: handleLastNameBlur
    } = useInput({initialValue: lastNameUser || ""});

    const {
        enteredValue: phone,
        handleInputChange: handlePhoneChange,
        handleInputBlur: handlePhoneBlur
    } = useInput({initialValue: userDetails?.phone || ""});

    const [birthDate, setBirthDate] = useState(userDetails?.birthDate ? new Date(userDetails.birthDate).toISOString().split('T')[0] : "1990-01-01");

    const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBirthDate(event.target.value);
    };

    const {
        enteredValue: gender,
        handleInputChange: handleGenderChange,
        handleInputBlur: handleGenderBlur
    } = useInput({initialValue: userDetails?.gender || "Unspecified"});

    const [profileImage, setProfileImage] = useState<string>(userDetails?.profileImage || "");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const maxSizeInMB = 5;
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

            if (file.size > maxSizeInBytes) {
                toast.error(`File size should not exceed ${maxSizeInMB}MB`);
                return;
            }
            // const base64 = await imageToBase64(file);
            // setProfileImage(base64);

            setIsLoading(true);
            try {
                const imageUrl = await uploadImage(file);
                setProfileImage(imageUrl.url);
            } catch (error) {
                toast.error("Failed to upload image");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleUploadButton = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    phone,
                    birthDate,
                    gender,
                    profileImage
                })
            });

            const resData: CustomResponse = await response.json();

            if (resData.success) {
                toast.success(resData.message);
            }

            if (resData.error) {
                toast.error(resData.message);
            }

        } catch (error: any) {
            console.error("Error: ", error);
        }
    };

    return (
        <div className={styles.user_profile_page}>
            <div className={styles.user_profile_container}>
                <h1>User Profile</h1>
                <h3>Personal Information</h3>
                <hr className={styles.horizontal_line}/>
                <form onSubmit={handleSubmit}>
                    <div className={styles.form_user_details}>
                        <div className={styles.form_row}>
                            <div className={styles.form_text_field}>
                                <Input
                                    name={"firstName"}
                                    type={"text"}
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                    onBlur={handleFirstNameBlur}
                                >
                                    First Name:
                                </Input>
                            </div>
                            <div className={styles.form_text_field}>
                                <Input
                                    name={"lastName"}
                                    type={"text"}
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                    onBlur={handleLastNameBlur}
                                >
                                    Last Name:
                                </Input>
                            </div>
                        </div>
                        <div className={styles.form_row}>
                            <div className={styles.form_text_field}>
                                <Input
                                    name={"email"}
                                    type={"email"}
                                    value={userDetails!.email}
                                    readOnly
                                >
                                    Email:
                                </Input>
                            </div>
                            <div className={styles.form_text_field}>
                                <Input
                                    name={"phone"}
                                    type={"text"}
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    onBlur={handlePhoneBlur}
                                >
                                    Phone:
                                </Input>
                            </div>
                        </div>
                        <div className={styles.form_row}>
                            <div className={styles.form_text_field}>
                                <label htmlFor="birthDate">Birth Date:</label>
                                <input
                                    name="birthDate"
                                    type="date"
                                    value={birthDate}
                                    placeholder="Birth Date"
                                    onChange={handleBirthDateChange}
                                />

                            </div>
                            <div className={styles.form_text_field}>
                                <Input
                                    name={"gender"}
                                    type={"text"}
                                    value={gender}
                                    onChange={handleGenderChange}
                                    onBlur={handleGenderBlur}
                                >
                                    Gender:
                                </Input>
                            </div>
                        </div>
                        <button type={"submit"} className={styles.save_button}>Save</button>
                    </div>
                    <div className={styles.form_user_image}>
                        <h3>Profile Picture</h3>
                        {isLoading ? (<Loader/>) :
                            (
                                <img src={profileImage !== "" ? profileImage : default_profile_image} alt="user"/>
                            )
                        }
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleUploadImage}
                            hidden
                        />
                        <div className={styles.upload_button} onClick={handleUploadButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
                                 fill="none">
                                <mask id="mask0_13_7" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="0" y="0"
                                      width="25" height="24">
                                    <rect x="0.9375" width="24" height="24" fill="white" stroke="black"/>
                                </mask>
                                <g mask="url(#mask0_13_7)">
                                    <path
                                        d="M7.4375 20C5.92083 20 4.625 19.475 3.55 18.425C2.475 17.375 1.9375 16.0917 1.9375 14.575C1.9375 13.275 2.32917 12.1167 3.1125 11.1C3.89583 10.0833 4.92083 9.43333 6.1875 9.15C6.60417 7.61667 7.4375 6.375 8.6875 5.425C9.9375 4.475 11.3542 4 12.9375 4C14.8875 4 16.5417 4.67917 17.9 6.0375C19.2583 7.39583 19.9375 9.05 19.9375 11C21.0875 11.1333 22.0417 11.6292 22.8 12.4875C23.5583 13.3458 23.9375 14.35 23.9375 15.5C23.9375 16.75 23.5 17.8125 22.625 18.6875C21.75 19.5625 20.6875 20 19.4375 20H13.9375C13.3875 20 12.9167 19.8042 12.525 19.4125C12.1333 19.0208 11.9375 18.55 11.9375 18V12.85L10.3375 14.4L8.9375 13L12.9375 9L16.9375 13L15.5375 14.4L13.9375 12.85V18H19.4375C20.1375 18 20.7292 17.7583 21.2125 17.275C21.6958 16.7917 21.9375 16.2 21.9375 15.5C21.9375 14.8 21.6958 14.2083 21.2125 13.725C20.7292 13.2417 20.1375 13 19.4375 13H17.9375V11C17.9375 9.61667 17.45 8.4375 16.475 7.4625C15.5 6.4875 14.3208 6 12.9375 6C11.5542 6 10.375 6.4875 9.4 7.4625C8.425 8.4375 7.9375 9.61667 7.9375 11H7.4375C6.47083 11 5.64583 11.3417 4.9625 12.025C4.27917 12.7083 3.9375 13.5333 3.9375 14.5C3.9375 15.4667 4.27917 16.2917 4.9625 16.975C5.64583 17.6583 6.47083 18 7.4375 18H9.9375V20H7.4375Z"
                                        fill="currentColor"/>
                                </g>
                            </svg>
                            Upload Image
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserProfile;
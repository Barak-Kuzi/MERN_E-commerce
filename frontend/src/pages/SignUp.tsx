import React, {ChangeEvent, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa";

import loginIcon from "../assest/signin.gif";
import imageToBase64 from "../utils/imageToBase64";
import SummaryApi from "../common";

interface data {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage?: string;
}

export default function SignUp(): React.JSX.Element {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [userData, setUserData] = useState<data>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: ""
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

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userData.password === userData.confirmPassword) {
            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const dataApi = await dataResponse.json();

            if (dataApi.success) {
                toast.success(dataApi.message);
                navigate('/login');
            }

            if(dataApi.error){
                toast.error(dataApi.message)
            }

        } else
            toast.error("Password and Confirm Password should be same");
    }

    const handleUploadPic = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            const imagePic = await imageToBase64(file);
            setUserData((prevState) => {
                return {
                    ...prevState,
                    profileImage: imagePic as string
                }
            });
        }
    };

    return (
        <section id="sign_up">
            <div className="login_container">
                <div className="login_form_container">
                    <div className="login_icon">
                        <div>
                            <img src={userData.profileImage || loginIcon} alt='login icons'/>
                        </div>
                        <form>
                            <label>
                                <div className="upload_image">
                                    Upload Photo
                                </div>
                                <input type='file' className="upload_image_button" onChange={handleUploadPic}/>
                            </label>
                        </form>
                    </div>
                    <form className="form_container" onSubmit={handleSubmit}>
                        <div className="form_group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Enter Your Name"
                                   value={userData.name} onChange={handleOnChange} required/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter Your Email"
                                   value={userData.email} onChange={handleOnChange} required/>
                        </div>
                        <div className="form_group">
                            <label htmlFor="password">Password</label>
                            <div className="input_password">
                                <input type={showPassword ? "text" : "password"} id="password" name="password"
                                       placeholder="Enter Your Password" value={userData.password}
                                       onChange={handleOnChange}/>
                                <div className="eye_icon" onClick={handleShowPassword}>
                                    <span>
                                        {showPassword ? (<FaEyeSlash/>) : (<FaEye/>)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="form_group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input_password">
                                <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword"
                                       name="confirmPassword"
                                       placeholder="Enter Your Confirm Password" value={userData.confirmPassword}
                                       onChange={handleOnChange}/>
                                <div className="eye_icon" onClick={handleShowConfirmPassword}>
                                    <span>
                                        {showConfirmPassword ? (<FaEyeSlash/>) : (<FaEye/>)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="form_button">Sign Up</button>
                    </form>
                    <div className="signup_container">
                        <p>Already have an account?</p>
                        <Link to={"/login"} className="signup_button">Sign In</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
import React, {ChangeEvent, useContext, useState} from 'react';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";

import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa";
import {Link} from 'react-router-dom';

import loginIcon from "../assest/signin.gif";
import SummaryApi from "../common";
import Context from "../context";
import {CustomResponse} from "../utils/CustomResponse";

interface data {
    email: string;
    password: string;
}

export default function Login(): React.JSX.Element {
    const navigate = useNavigate();
    const context = useContext(Context);

    if (!context) {
        throw new Error("Context must be used within a Provider");
    }

    const { fetchUser } = context;

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

        const response: Response = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const resData: CustomResponse = await response.json();

        if (resData.success){
            toast.success(resData.message);
            await fetchUser();
            navigate('/');
        }

        if (resData.error){
            toast.error(resData.message);
        }
    }


    return (
        <section id="login">
            <div className="login_container">
                <div className="login_form_container">
                    <div className="login_icon">
                        <img src={loginIcon} alt="Login Icon"/>
                    </div>
                    <form className="form_container" onSubmit={handleSubmit}>
                        <div className="form_group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter Your Email"
                                   value={userData.email} onChange={handleOnChange}/>
                        </div>

                        <div className="form_group">
                            <label htmlFor="password" className="form_label">Password</label>
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
                            <Link to={'/forgot-password'} className="forgot_password">
                                Forgot password
                            </Link>
                        </div>

                        <button type="submit" className="form_button">Login</button>
                    </form>
                    <div className="signup_container">
                        <p>Don't have an account?</p>
                        <Link to={"/sign-up"} className="signup_button">Sign Up</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
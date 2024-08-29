import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';

import {GrSearch} from "react-icons/gr";
import {FaRegCircleUser} from "react-icons/fa6";
import {FaShoppingCart} from "react-icons/fa";

import Logo from "./Logo";
import SummaryApi from "../common";
import {setUserDetails} from "../store/userSlice";
import ROLE from "../common/role";

export default function Header(): React.JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state?.user?.user);
    const [menuDisplay, setMenuDisplay] = React.useState<boolean>(false);

    console.log(user)

    const handleMenuDisplay = () => {
        setMenuDisplay((prevState) => !prevState);
    }

    const handleLogout = async () => {
        const dataResponse = await fetch(SummaryApi.userLogout.url, {
            method: SummaryApi.userLogout.method,
            credentials: 'include',
        });

        const dataApi = await dataResponse.json();
        if (dataApi.success) {
            toast(dataApi.message);
            dispatch(setUserDetails(null));
            navigate('/');
        }

        if (dataApi.error) {
            toast.error(dataApi.message);
        }
    }

    return (
        <header className="my_header">
            <div className="header_container">
                <div>
                    <Link to={'/'}>
                        <Logo width={90} height={50}/>
                    </Link>
                </div>

                <div className="search_bar_container">
                    <input type="text" placeholder="Search Product Here..." className="search_bar_input"/>
                    <div className="search_bar_icon">
                        <GrSearch/>
                    </div>
                </div>

                <div className="header_icons_container">
                    <div className="user_icons_container">
                        {
                            user?._id &&
                            <div className="user_icon" onClick={handleMenuDisplay}>
                                {
                                    user?.profileImage ?
                                        (<img src={user?.profileImage} alt={user?.name}/>)
                                        :
                                        (<FaRegCircleUser/>)
                                }
                            </div>
                        }

                        {
                            menuDisplay && (
                                <div className="user_menu">
                                    <nav>
                                        {
                                            user?.role === ROLE.ADMIN && (
                                                <Link to={"/admin-panel/all-products"} className="user_menu_link"
                                                      onClick={handleMenuDisplay}>Admin Panel</Link>
                                            )
                                        }

                                    </nav>
                                </div>
                            )
                        }

                    </div>


                    <div className="cart_icon">
                        <span><FaShoppingCart/></span>

                        <div
                            className="amount_cart_products_container">
                            <p className="amount_cart_products_text">0</p>
                        </div>
                    </div>

                    <div>
                        {
                            user?._id ?
                                (<button onClick={handleLogout} className="login_button">Logout</button>)
                                :
                                (<Link to={'/login'} className="login_button">Login</Link>)
                        }
                    </div>

                </div>
            </div>
        </header>
    );
}
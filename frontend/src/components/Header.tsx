import React from 'react';
import {shallowEqual, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {GrSearch} from "react-icons/gr";

import Logo from "./Logo";
import LoginButton from "./LoginButton";
import CartIcon from "./CartIcon";
import UserMenuIcon from "./UserMenuIcon";


function Header(): React.JSX.Element {
    const user = useSelector((state: any) => state.user?.user?._id, shallowEqual);
    const quantityProductsInCart = useSelector((state: any) => state.user?.user?.cart.length, shallowEqual);

    console.log('Header component re-rendered');
    console.log('User:', user);
    console.log('Quantity in Cart:', quantityProductsInCart);

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
                    <UserMenuIcon userId={user} />

                    <CartIcon quantityProductsInCart={quantityProductsInCart} />

                    <LoginButton userId={user}/>
                </div>

            </div>
        </header>
    );
}

export default Header;
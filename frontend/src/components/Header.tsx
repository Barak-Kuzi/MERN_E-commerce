import React from 'react';
import {Link, useNavigate} from "react-router-dom";

import styles from '../styles/Header.module.css';
import logo from "../assest/my_logo.png";

import LoginButton from "./LoginButton";
import CartIcon from "./CartIcon";
import UserMenuIcon from "./UserMenuIcon";
import SearchBar from "./SearchBar";

interface HeaderProps {
    onSearch?: (query: string) => void;
}

function Header({onSearch}: HeaderProps): React.JSX.Element {
    const navigate = useNavigate();

    const handleSearch = (query: string) => {
        navigate(`/search?query=${query}`);
        if (onSearch) {
            onSearch(query);
        }
    };

    console.log('Header component re-rendered');

    return (
        <header className={styles.header_container}>
            <div className={styles.header_inner_container}>
                <div>
                    <Link to={'/'}>
                        <img src={logo} alt="logo" className={styles.logo} />
                    </Link>
                </div>

                <SearchBar onSearch={handleSearch}/>

                <div className={styles.header_icons_container}>
                    <CartIcon/>
                    <UserMenuIcon/>
                    <LoginButton/>
                </div>
            </div>
        </header>
    );
}

export default Header;
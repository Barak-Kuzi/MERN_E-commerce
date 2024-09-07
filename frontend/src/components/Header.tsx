import React, {useCallback, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {GrSearch} from "react-icons/gr";

import Logo from "./Logo";
import LoginButton from "./LoginButton";
import CartIcon from "./CartIcon";
import UserMenuIcon from "./UserMenuIcon";
import {debounce} from "../utils/debounce";

function Header(): React.JSX.Element {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const navigate = useNavigate();

    const debouncedSetSearchQuery = useCallback(debounce((query: string) => {
        setSearchQuery(query);
    }, 2000), []);

    const handleSearch = useCallback(() => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    }, [searchQuery, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        debouncedSetSearchQuery(query);
    };

    console.log('Header component re-rendered');
    console.log('searchQuery:', searchQuery);

    return (
        <header className="my_header">
            <div className="header_container">
                <div>
                    <Link to={'/'}>
                        <Logo width={90} height={50}/>
                    </Link>
                </div>

                <div className="search_bar_container">
                    <input type="text"
                           placeholder="Search Product Here..."
                           className="search_bar_input"
                           onChange={handleInputChange}
                    />
                    <div className="search_bar_icon" onClick={handleSearch}>
                        <GrSearch/>
                    </div>
                </div>

                <div className="header_icons_container">
                    <UserMenuIcon/>

                    <CartIcon/>

                    <LoginButton/>
                </div>

            </div>
        </header>
    );
}

export default Header;
import React from "react";
import {useSelector} from "react-redux";

import styles from "../styles/UserWishlist.module.css";

import {RootState} from "../store/store";
import VerticalProductCard from "../components/VerticalProductCard";

function UserWishlist(): React.JSX.Element {
    const userWishlist = useSelector((state: RootState) => state.wishlist.wishlist);

    return (
        <div className={styles.user_wishlist_page}>
            {userWishlist.length > 0 && <VerticalProductCard title="My Wishlist" products={userWishlist}/>}
        </div>
    );
}

export default UserWishlist;
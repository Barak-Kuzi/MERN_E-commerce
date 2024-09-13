import React, {useCallback, useState} from 'react';
import {Link} from "react-router-dom";
import {shallowEqual, useSelector} from "react-redux";
import {FaRegCircleUser} from "react-icons/fa6";

import styles from '../styles/UserMenuIcon.module.css';
import ROLE from "../common/role";

function UserMenuIcon(): React.JSX.Element {
    const [menuDisplay, setMenuDisplay] = useState<boolean>(false);
    const userRole = useSelector((state: any) => state.user?.user?.role, shallowEqual);
    const userProfileImage = useSelector((state: any) => state.user?.user?.profileImage, shallowEqual);
    const userConnected = useSelector((state: any) => state.user?.userConnected, shallowEqual);

    const handleMenuDisplay = useCallback(() => {
        setMenuDisplay((prevState) => !prevState);
    }, []);

    return (
        <div className={styles.user_menu_icons_container}>
            {
                userConnected &&
                <div className={styles.user_icon} onClick={handleMenuDisplay}>
                    {
                        userProfileImage ?
                            (<img src={userProfileImage} alt="User Panel"/>)
                            :
                            (<FaRegCircleUser/>)
                    }
                </div>
            }

            {
                menuDisplay && (
                    <div className={styles.user_menu}>
                        <nav>
                            <Link to={"/user-orders"} className={styles.user_menu_link} onClick={handleMenuDisplay}>
                                My Orders
                            </Link>
                            {
                                userRole === ROLE.ADMIN && (
                                    <Link to={"/admin-panel/all-products"} className={styles.user_menu_link}
                                          onClick={handleMenuDisplay}>Admin Panel</Link>
                                )
                            }
                        </nav>
                    </div>
                )
            }
        </div>
    )
}

export default React.memo(UserMenuIcon);
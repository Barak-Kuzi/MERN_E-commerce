import React, {useCallback, useState} from 'react';
import {Link} from "react-router-dom";
import {shallowEqual, useSelector} from "react-redux";
import {FaRegCircleUser} from "react-icons/fa6";

import styles from '../styles/UserMenuIcon.module.css';
import ROLE from "../common/role";

interface UserMenuIconProps {
    userId: string | undefined;
}

function UserMenuIcon({userId}: UserMenuIconProps): React.JSX.Element {
    const [menuDisplay, setMenuDisplay] = useState<boolean>(false);
    const userRole = useSelector((state: any) => state.user?.user?.role, shallowEqual);
    const user = useSelector((state: any) => state.user?.user, shallowEqual);

    console.log(user)

    const handleMenuDisplay = useCallback(() => {
        setMenuDisplay((prevState) => !prevState);
    }, []);

    return (
        <div className={styles.user_menu_icons_container}>
            {
                userId &&
                <div className={styles.user_icon} onClick={handleMenuDisplay}>
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
                    <div className={styles.user_menu}>
                        <nav>
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

export default UserMenuIcon;
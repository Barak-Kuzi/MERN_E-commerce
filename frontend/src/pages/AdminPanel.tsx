import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {FaRegCircleUser} from "react-icons/fa6";

import styles from '../styles/AdminPanel.module.css';

import {RootState} from "../store/store";
import ROLE from '../common/role';

export default function AdminPanel(): React.JSX.Element {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user?.user);

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className={styles.admin_panel_container}>
            <aside>
                <div className={styles.admin_details_container}>
                    <div className={styles.admin_details_image}>
                        {
                            user?.profileImage ? (
                                <img src={user?.profileImage} alt={user?.name}/>
                            ) : (
                                <FaRegCircleUser/>
                            )
                        }
                    </div>
                    <p className={styles.admin_details_name}>{user?.name}</p>
                    <p className={styles.admin_details_role}>{user?.role}</p>
                </div>

                <div className={styles.admin_panel_navigation}>
                    <nav>
                        <Link to={"all-users"} className={styles.my_nav_link}>All Users</Link>
                        <Link to={"all-products"} className={styles.my_nav_link}>All Products</Link>
                    </nav>
                </div>
            </aside>

            <main className={styles.admin_panel_content}>
                <Outlet/>
            </main>
        </div>
    )
}
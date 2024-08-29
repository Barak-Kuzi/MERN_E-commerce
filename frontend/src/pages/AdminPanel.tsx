import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { FaRegCircleUser } from "react-icons/fa6";
import ROLE from '../common/role';

export default function AdminPanel(): React.JSX.Element {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state?.user?.user);

    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/");
        }
    },[user]);

    return (
        <div className="admin_panel_container">
            <aside>
                <div className="admin_details_container">
                    <div className="admin_details_image">
                        {
                            user?.profilePic ? (
                                <img src={user?.profileImage} alt={user?.name}/>
                            ) : (
                                <FaRegCircleUser/>
                            )
                        }
                    </div>
                    <p className="admin_details_name">{user?.name}</p>
                    <p className="admin_details_role">{user?.role}</p>
                </div>

                {/***navigation */}
                <div className="admin_panel_navigation">
                    <nav>
                        <Link to={"all-users"} className="my_nav_link">All Users</Link>
                        <Link to={"all-products"} className="my_nav_link">All Products</Link>
                    </nav>
                </div>
            </aside>

            <main className="admin_panel_content">
                <Outlet/>
            </main>
        </div>
    )
}
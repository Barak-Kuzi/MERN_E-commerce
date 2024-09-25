import React from "react";
import {Link, Outlet, useLocation} from "react-router-dom";

import styles from "../styles/UserPanel.module.css";

function UserPanel(): React.JSX.Element {
    const location = useLocation();

    return (
        <div className={styles.user_panel_page}>
            <aside className={styles.user_panel_sidebar}>
                <span>User Panel</span>
                <nav>
                    <ul className={styles.navigation_list}>
                        <hr className={styles.horizontal_line}/>
                        <li className={location.pathname === "/user-panel/user-profile" ? `${styles.activeLink} ${styles.navigation_option}` : styles.navigation_option}>
                            <div className={styles.activeStyle}></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round"
                                 className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                                <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
                                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"/>
                            </svg>
                            <Link to={"user-profile"}>My Profile</Link>
                        </li>

                        <hr className={styles.horizontal_line}/>

                        <li className={location.pathname === "/user-panel/user-wishlist" ? `${styles.activeLink} ${styles.navigation_option}` : styles.navigation_option}>
                            <div className={styles.activeStyle}></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 25"
                                 fill="none">
                                <mask id="mask0_2_7" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse"
                                      x="0"
                                      y="0"
                                      width="24" height="24">
                                    <rect x="0.5" y="1" width="24" height="24" fill="white" stroke="black"/>
                                </mask>
                                <g mask="url(#mask0_2_7)">
                                    <path
                                        d="M17.2714 15.9214C16.1797 17.0132 14.7951 18.3151 13.1157 19.8282C13.1156 19.8283 13.1155 19.8284 13.1153 19.8285L12 20.8285L10.8847 19.8285C10.8845 19.8284 10.8844 19.8283 10.8843 19.8282C9.20494 18.3151 7.82026 17.0132 6.72855 15.9214C5.63918 14.8321 4.78211 13.8634 4.15137 13.0143C3.52024 12.1647 3.09558 11.4052 2.85909 10.7339C2.61929 10.0531 2.5 9.35927 2.5 8.65C2.5 7.20783 2.97791 6.0292 3.92855 5.07855C4.8792 4.12791 6.05783 3.65 7.5 3.65C8.29356 3.65 9.04619 3.8173 9.76303 4.15285C10.4807 4.48876 11.0982 4.96113 11.619 5.57382L12 6.02202L12.381 5.57382C12.9018 4.96113 13.5193 4.48876 14.237 4.15285C14.9538 3.8173 15.7064 3.65 16.5 3.65C17.9422 3.65 19.1208 4.12791 20.0714 5.07855C21.0221 6.0292 21.5 7.20783 21.5 8.65C21.5 9.35927 21.3807 10.0531 21.1409 10.7339C20.9044 11.4052 20.4798 12.1647 19.8486 13.0143C19.2179 13.8634 18.3608 14.8321 17.2714 15.9214ZM11.6664 19.1724L12 19.4713L12.3336 19.1724C13.9373 17.7358 15.2607 16.5005 16.3021 15.4675C17.3433 14.4347 18.1752 13.5275 18.7921 12.7477C19.4085 11.9687 19.857 11.2504 20.1151 10.5959C20.3694 9.95115 20.5 9.30158 20.5 8.65C20.5 7.52632 20.1201 6.56301 19.3536 5.79645C18.587 5.02988 17.6237 4.65 16.5 4.65C15.6163 4.65 14.7956 4.90097 14.0489 5.39567C13.4082 5.8201 12.9257 6.3551 12.6182 7H11.3817C11.0743 6.3551 10.5918 5.8201 9.95115 5.39567C9.20442 4.90097 8.38371 4.65 7.5 4.65C6.37632 4.65 5.41301 5.02988 4.64645 5.79645C3.87988 6.56301 3.5 7.52632 3.5 8.65C3.5 9.30158 3.63058 9.95115 3.88486 10.5959C4.14296 11.2504 4.59154 11.9687 5.20789 12.7477C5.82483 13.5275 6.65666 14.4347 7.69788 15.4675C8.73932 16.5005 10.0627 17.7358 11.6664 19.1724Z"
                                    />
                                </g>
                            </svg>
                            <Link to={"user-wishlist"}>My Wishlist</Link>
                        </li>

                        <hr className={styles.horizontal_line}/>

                        <li className={location.pathname === "/user-panel/user-orders" ? `${styles.activeLink} ${styles.navigation_option}` : styles.navigation_option}>
                            <div className={styles.activeStyle}></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none">
                                <mask id="mask0_6_17" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse"
                                      x="0"
                                      y="0"
                                      width="24" height="24">
                                    <rect x="0.5" y="0.5" width="23" height="23" fill="white" stroke="black"/>
                                </mask>
                                <g mask="url(#mask0_6_17)">
                                    <path
                                        d="M10.7494 19.8577L11.5 20.2924V19.425V12.575V12.2868L11.2506 12.1423L5.25059 8.66733L4.5 8.23261V9.1V15.95V16.2382L4.74941 16.3827L10.7494 19.8577ZM12.5 19.425V20.2924L13.2506 19.8577L19.2506 16.3827L19.5 16.2382V15.95V9.1V8.23261L18.7494 8.66733L12.7494 12.1423L12.5 12.2868V12.575V19.425ZM11.2505 21.2923L11.2492 21.2915L4.25052 17.2673C4.25031 17.2672 4.2501 17.267 4.24989 17.2669C4.00449 17.1247 3.82317 16.9438 3.69439 16.7231C3.56651 16.5038 3.5 16.2583 3.5 15.975V8.025C3.5 7.74173 3.56651 7.49616 3.69439 7.27694C3.82317 7.05617 4.00449 6.87528 4.24989 6.73308C4.2501 6.73296 4.25031 6.73283 4.25052 6.73271L11.2492 2.70846L11.2505 2.70771C11.4947 2.56637 11.742 2.5 12 2.5C12.258 2.5 12.5053 2.56637 12.7495 2.70772L12.7508 2.70845L19.7495 6.73271C19.7496 6.7328 19.7498 6.7329 19.75 6.73299C19.9954 6.8752 20.1768 7.05612 20.3056 7.27694C20.4335 7.49615 20.5 7.74173 20.5 8.025V15.975C20.5 16.2583 20.4335 16.5038 20.3056 16.7231C20.1768 16.9439 19.9954 17.1248 19.75 17.267C19.7498 17.2671 19.7496 17.2672 19.7495 17.2673L12.7508 21.2915L12.7495 21.2923C12.5053 21.4336 12.258 21.5 12 21.5C11.742 21.5 11.4947 21.4336 11.2505 21.2923ZM15.7519 8.95912L16 9.10088L16.2481 8.95912L18.1731 7.85912L18.9284 7.4275L18.1752 6.99212L12.2502 3.56712L12.0002 3.42261L11.7501 3.56691L9.80014 4.69191L9.04585 5.12707L9.80193 5.55912L15.7519 8.95912ZM11.7498 11.2829L11.9998 11.4274L12.2499 11.2831L14.1999 10.1581L14.9498 9.72543L14.2002 9.29212L8.27523 5.86712L8.02525 5.72261L7.77514 5.86691L5.82514 6.99191L5.07518 7.42457L5.82477 7.85788L11.7498 11.2829Z"
                                    />
                                </g>
                            </svg>
                            <Link to={"user-orders"}>My Orders</Link>
                        </li>

                        <hr className={styles.horizontal_line}/>

                        <li className={location.pathname === "/user-panel/user-address" ? `${styles.activeLink} ${styles.navigation_option}` : styles.navigation_option}>
                            <div className={styles.activeStyle}></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
                                 strokeLinejoin="round"
                                 className="icon icon-tabler icons-tabler-outline icon-tabler-settings">
                                <mask id="mask0_18_41" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="0"
                                      y="0"
                                      width="24" height="24">
                                    <rect x="0.5" y="0.5" width="23" height="23" fill="white" stroke="black"/>
                                </mask>
                                <g mask="url(#mask0_18_41)">
                                    <path
                                        d="M5.5 19V19.5H6H9H9.5V19V13.5H14.5V19V19.5H15H18H18.5V19V10V9.75L18.3 9.6L12.3 5.1L12 4.875L11.7 5.1L5.7 9.6L5.5 9.75V10V19ZM19.5 9.25V20.5H13.5V15V14.5H13H11H10.5V15V20.5H4.5V9.25L12 3.625L19.5 9.25Z"
                                    />
                                </g>
                            </svg>
                            <Link to={"user-address"}>My Address</Link>
                        </li>

                        <hr className={styles.horizontal_line}/>

                        <li className={location.pathname === "/user-panel/user-settings" ? `${styles.activeLink} ${styles.navigation_option}` : styles.navigation_option}>
                            <div className={styles.activeStyle}></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round"
                                 className="icon icon-tabler icons-tabler-outline icon-tabler-settings">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"/>
                                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/>
                            </svg>
                            <Link to={"user-settings"}>User Settings</Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className={styles.user_panel_content}>
                <Outlet/>
            </main>
        </div>
    );
}

export default UserPanel;
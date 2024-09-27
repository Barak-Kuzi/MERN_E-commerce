import React, {useEffect} from 'react';
import {Outlet, SubmitFunction, useLoaderData, useSubmit} from "react-router-dom";
import {useDispatch} from "react-redux";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import {getAuthToken, getTokenDuration} from "./utils/auth";
import {CustomResponse} from "./utils/CustomResponse";
import SummaryApi from "./common";
import {
    setUserConnection,
    setUserDetails,
} from "./store/userSlice";
import {AppDispatch} from "./store/store";
import {fetchUserCart} from "./store/cartSlice";
import {fetchOrders} from "./store/orderSlice";
import {fetchWishlistProducts} from "./store/wishlistSlice";
import {setUserAddress} from "./store/addressSlice";

function App() {
    const token = useLoaderData();
    const submit: SubmitFunction = useSubmit();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const initializeUserSession = async () => {
            const authToken = getAuthToken();
            if (!authToken) {
                return;
            }

            if (token === 'EXPIRED') {
                // submit(null, {action: '/logout', method: 'POST'});
                return;
            }

            try {
                const response = await fetch(SummaryApi.userDetails.url, {
                    method: SummaryApi.userDetails.method,
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                const resData: CustomResponse = await response.json();
                if (resData.success) {
                    // userSlice
                    dispatch(setUserDetails(resData.data));
                    dispatch(setUserConnection(true));
                    // cartSlice
                    dispatch(fetchUserCart(resData.data.cart));
                    // orderSlice
                    dispatch(fetchOrders());
                    // wishlistSlice
                    dispatch(fetchWishlistProducts(resData.data.wishlist));
                    // addressSlice
                    dispatch(setUserAddress(resData.data.address));

                }

                if (resData.error) {
                    console.error('Failed to fetch user details', resData.error);
                    toast.error(resData.message);
                }
            } catch (error) {
                console.error('Failed to fetch user details', error);
            }
        };

        initializeUserSession();

        const tokenDuration: number | null = getTokenDuration();
        setTimeout(() => {
            // submit(null, {action: '/logout', method: 'POST'})
        }, tokenDuration ? tokenDuration : (60 * 60 * 1000));
    }, [token, submit, dispatch]);

    console.log('App component re-rendered');

    return (
        <>
            <ToastContainer/>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
}

export default App;

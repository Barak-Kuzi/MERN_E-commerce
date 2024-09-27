import React, {useEffect} from 'react';
import {Outlet, SubmitFunction, useLoaderData, useSubmit} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import {getAuthToken, getTokenDuration} from "./utils/auth";
import {CustomResponse} from "./utils/CustomResponse";
import SummaryApi from "./common";
import {
    setUserAddress,
    setUserCart,
    setUserConnection,
    setUserDetails,
    setUserOrders,
    setUserWishlist
} from "./store/userSlice";
import {fetchProducts} from "./utils/fetchProducts";
import fetchUserOrders from "./utils/fetchUserOrders";
import {AppDispatch} from "./store/store";
import {useDispatch} from "react-redux";
import {fetchUserCart} from "./store/cartSlice";

function App() {
    // const token = useLoaderData();
    // const submit: SubmitFunction = useSubmit();
    //
    // console.log(token)
    //
    // useEffect(() => {
    //     if (!token) {
    //         return;
    //     }
    //
    //     if (token === 'EXPIRED') {
    //         submit(null, {action: '/logout', method: 'POST'});
    //         return;
    //     }
    //
    //     const tokenDuration: number | null = getTokenDuration();
    //
    //     setTimeout(() => {
    //         submit(null, {action: '/logout', method: 'POST'})
    //     }, tokenDuration ? tokenDuration : (60 * 60 * 1000));
    // }, [token, submit]);


    const token = useLoaderData();
    const submit: SubmitFunction = useSubmit();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const initializeUserSession = async () => {
            const authToken = getAuthToken();
            if (!authToken || authToken === 'EXPIRED') {
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
                    dispatch(setUserDetails(resData.data));
                    dispatch(setUserConnection(true));
                    // const detailedCartProducts = await fetchProducts(resData.data.cart);
                    // dispatch(setUserCart(detailedCartProducts));
                    dispatch(fetchUserCart(resData.data.cart));
                    const userOrders = await fetchUserOrders();
                    dispatch(setUserOrders(userOrders.data));
                    const userWishlist = await fetchProducts(resData.data.wishlist);
                    dispatch(setUserWishlist(userWishlist));
                    dispatch(setUserAddress(resData.data.address));
                } else {
                    // submit(null, {action: '/logout', method: 'POST'});
                }
            } catch (error) {
                console.error('Failed to fetch user details', error);
                // submit(null, {action: '/logout', method: 'POST'});
            }
        };

        initializeUserSession();

        if (token === 'EXPIRED') {
            // submit(null, {action: '/logout', method: 'POST'});
            return;
        }

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

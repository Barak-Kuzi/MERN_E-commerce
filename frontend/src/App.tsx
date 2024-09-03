import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Outlet} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Context from "./context";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SummaryApi from "./common";
import {setUserDetails} from "./store/userSlice";


function App() {
    const dispatch = useDispatch();

    const fetchUser = async () => {
        const dataResponse = await fetch(SummaryApi.userDetails.url, {
            method: SummaryApi.userDetails.method,
            credentials: 'include',
        });

        const dataApi = await dataResponse.json();
        if(dataApi.success) {
            dispatch(setUserDetails(dataApi.data));
        }
    }

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <>
            <Context.Provider value={{
                fetchUser
            }}>
                <ToastContainer/>
                <Header/>
                <main>
                    <Outlet/>
                </main>
                <Footer/>
            </Context.Provider>
        </>
    );
}

export default App;

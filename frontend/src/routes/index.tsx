import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";

import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProducts from "../pages/CategoryProducts";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import PlaceOrder from "../pages/PlaceOrder";
import SearchProduct from "../pages/SearchProduct";
import Verify from "../pages/Verify";
import ProtectedRoute from "../components/ProtectedRoute";
import UserPanel from "../pages/UserPanel";
import UserProfile from "../pages/UserProfile";
import UserOrders from "../pages/UserOrders";
import UserWishlist from "../pages/UserWishlist";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "sign-up",
                element: <SignUp/>
            },
            {
                path: "product-category",
                element: <CategoryProducts/>
            },
            {
                path: "product-details/:productId",
                element: <ProductDetails/>
            },
            {
                path: "cart",
                element: <Cart/>
            },
            {
                path: "place-order",
                element: <PlaceOrder/>
            },
            {
                path: "verify",
                element: <Verify/>
            },
            {
                path: "search",
                element: <SearchProduct/>
            },
            {
                path: "user-panel",
                element: (
                    <ProtectedRoute pathProtection={"/login"}>
                        <UserPanel/>
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: "user-profile",
                        element: <UserProfile/>
                    },
                    {
                        path: "user-orders",
                        element: <UserOrders/>
                    },
                    {
                        path: "user-wishlist",
                        element: <UserWishlist/>
                    },
                ]
            },
            {
                path: "admin-panel",
                element: <AdminPanel/>,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers/>
                    },
                    {
                        path: "all-products",
                        element: <AllProducts/>
                    }
                ]
            }
        ]
    }
]);

export default router;
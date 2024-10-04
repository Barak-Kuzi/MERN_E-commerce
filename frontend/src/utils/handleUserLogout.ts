import {AppDispatch} from "../store/store";
import {setUserDetails, setUserConnection} from "../store/userSlice";
import {setCart} from "../store/cartSlice";
import {setWishlist} from "../store/wishlistSlice";
import {setUserOrders} from "../store/orderSlice";
import {setUserAddress} from "../store/addressSlice";

export const handleUserLogout = (dispatch: AppDispatch) => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');

    // Clear Redux store data
    dispatch(setUserDetails(null));
    dispatch(setUserConnection(false));
    dispatch(setCart([]));
    dispatch(setWishlist([]));
    dispatch(setUserOrders([]));
    dispatch(setUserAddress({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
    }));
};
import {useDispatch} from 'react-redux';

import SummaryApi from '../common';
import {setCartQuantity} from '../store/cartSlice';
import {AppDispatch} from '../store/store';
import {CustomResponse} from "../utils/CustomResponse";
import {toast} from "react-toastify";
import {setUserConnection} from "../store/userSlice";

const useUpdateCartQuantity = () => {
    const dispatch: AppDispatch = useDispatch();

    return async () => {
        const response = await fetch(SummaryApi.quantityProductsInCart.url, {
            method: SummaryApi.quantityProductsInCart.method,
            credentials: 'include',
        });

        const resData: CustomResponse = await response.json();
        if (resData.success) {
            dispatch(setCartQuantity(resData.data));
            dispatch(setUserConnection(true));
        } else {
            toast.error('Failed to update cart quantity');
        }
        return resData
    };
}
export default useUpdateCartQuantity;


import {configureStore} from '@reduxjs/toolkit';

import userReducer from './userSlice';
import searchReducer from './searchSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import wishlistReducer from './wishlistSlice';
import addressReducer from './addressSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        cart: cartReducer,
        order: orderReducer,
        wishlist: wishlistReducer,
        address: addressReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
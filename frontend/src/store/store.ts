import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import searchReducer from './searchSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
    reducer: {
        user : userReducer,
        search: searchReducer,
        cart: cartReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
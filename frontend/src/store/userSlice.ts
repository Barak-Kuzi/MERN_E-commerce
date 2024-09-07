import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    cart: [],
    userConnected: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload;
        },
        setUserCart: (state, action) => {
            state.cart = action.payload;
        },
        setUserConnection: (state, action ) => {
            state.userConnected = action.payload;
        }
    },
});

export const {setUserDetails, setUserCart, setUserConnection} = userSlice.actions;

export default userSlice.reducer;
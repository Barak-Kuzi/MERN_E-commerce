import {createSlice} from '@reduxjs/toolkit';

import {User} from "../models";

interface UserState {
    user: User | null;
    userConnected: boolean;
}

const initialState: UserState = {
    user: null,
    userConnected: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload;
        },
        setUserConnection: (state, action) => {
            state.userConnected = action.payload;
        },
    },
});

export const {
    setUserDetails,
    setUserConnection,
} = userSlice.actions;

export default userSlice.reducer;
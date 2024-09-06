import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import SummaryApi from '../common';

// export const login = createAsyncThunk('user/login', async (userData: { email: string; password: string }) => {
//     const response = await fetch(SummaryApi.signIn.url, {
//         method: SummaryApi.signIn.method,
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//     });
//     const resData = await response.json();
//     if (resData.success) {
//         return resData.data;
//     } else {
//         throw new Error(resData.message);
//     }
// });

const initialState = {
    user: null,
    status: 'idle',
    error: null as string | null,
    isReady: false,
    userConnected: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload;
        },
        setUserConnection: (state, action ) => {
            state.userConnected = action.payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(login.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(login.fulfilled, (state, action) => {
    //             state.status = 'succeeded';
    //             state.user = action.payload;
    //             state.isReady = true;
    //             state.notConnected = false;
    //         })
    //         .addCase(login.rejected, (state, action) => {
    //             state.status = 'failed';
    //             state.error = action.error.message || null;
    //         });
    // },
});

export const {setUserDetails, setUserConnection} = userSlice.actions;

export default userSlice.reducer;
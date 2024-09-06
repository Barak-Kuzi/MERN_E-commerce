import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SummaryApi from '../common';

// export const fetchCartQuantity = createAsyncThunk('cart/fetchCartQuantity', async () => {
//     const response = await fetch(SummaryApi.quantityProductsInCart.url, {
//         method: SummaryApi.quantityProductsInCart.method,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//     });
//     const resData = await response.json();
//     return resData.data;
// });

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        quantity: 0,
        status: 'idle',
        error: null as string | null,
        isReady: false
    },
    reducers: {
        setCartQuantity: (state, action) => {
            state.quantity = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchCartQuantity.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(fetchCartQuantity.fulfilled, (state, action) => {
    //             state.status = 'succeeded';
    //             state.quantity = action.payload;
    //             state.isReady = true;
    //         })
    //         .addCase(fetchCartQuantity.rejected, (state, action) => {
    //             state.status = 'failed';
    //             state.error = action.error.message || null;
    //         });
    // },
});

export const { setCartQuantity } = cartSlice.actions;

export default cartSlice.reducer;
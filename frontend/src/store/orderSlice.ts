import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

import {Order} from '../models';
import fetchUserOrders from "../utils/fetchUserOrders";
import {CustomResponse} from "../utils/CustomResponse";

interface OrderState {
    ordersList: Order[];
}

const initialState: OrderState = {
    ordersList: [],
};

export const fetchOrders = createAsyncThunk(
    'order/fetchOrders',
    async (_, thunkAPI) => {
        try {
            const resData: CustomResponse = await fetchUserOrders();
            return resData.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const orderSlice = createSlice({
        name: 'order',
        initialState,
        reducers: {
            setUserOrders: (state, action: PayloadAction<Order[]>) => {
                state.ordersList = action.payload;
            },
        },
        extraReducers: (builder) => {
            builder.addCase(fetchOrders.fulfilled, (state, action) => {
                state.ordersList = action.payload;
            });
        }
    }
);

export const {setUserOrders} = orderSlice.actions;
export default orderSlice.reducer;
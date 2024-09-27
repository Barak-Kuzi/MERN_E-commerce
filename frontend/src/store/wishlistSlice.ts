import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Product} from '../models';
import {fetchProducts} from '../utils/fetchProducts';

interface WishlistState {
    wishlist: Product[];
}

const initialState: WishlistState = {
    wishlist: [],
};

export const fetchWishlistProducts = createAsyncThunk(
    'wishlist/fetchWishlistProducts',
    async (userWishlist: { productId: string; quantity?: number }[], thunkAPI) => {
        try {
            return await fetchProducts(userWishlist);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishlist: (state, action: PayloadAction<Product[]>) => {
            state.wishlist = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWishlistProducts.fulfilled, (state, action) => {
            state.wishlist = action.payload;
        });
    }
});

export const {setWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;
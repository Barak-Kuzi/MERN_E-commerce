import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Product} from '../models';
import {fetchProducts} from '../utils/fetchProducts';

interface CartState {
    products: Product[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    discount: number;
    couponCode?: string;
}

const initialState: CartState = {
    products: [],
    subtotal: 0,
    deliveryFee: 0,
    total: 0,
    discount: 0,
    couponCode: ''
};

export const fetchUserCart = createAsyncThunk(
    'cart/fetchUserCart',
    async (userProducts: { productId: string; quantity?: number }[], thunkAPI) => {
        try {
            return await fetchProducts(userProducts);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const calculateCartTotals = (products: Product[]) => {
    const subtotal: number = products.reduce((acc: number, item: Product) =>
        acc + (item.productSellingPrice as number * item.quantity!), 0);
    const deliveryFee: number = 10;
    const total: number = subtotal + deliveryFee;

    return {
        subtotal: parseFloat(subtotal.toFixed(2)),
        deliveryFee: parseFloat(deliveryFee.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
        discount: 0
    };
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            const {subtotal, deliveryFee, total, discount} = calculateCartTotals(state.products);
            state.subtotal = subtotal;
            state.deliveryFee = deliveryFee;
            state.total = total;
            state.discount = discount;
        },
        setDiscount: (state, action: PayloadAction<number>) => {
            state.discount = action.payload;
            state.total = state.total - action.payload;
        },
        setCouponCode: (state, action: PayloadAction<string>) => {
            state.couponCode = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserCart.fulfilled, (state, action) => {
            state.products = action.payload;
            const {subtotal, deliveryFee, total, discount} = calculateCartTotals(state.products);
            state.subtotal = subtotal;
            state.deliveryFee = deliveryFee;
            state.total = total;
            state.discount = discount;
        });
    }
});

export const {setCart, setDiscount, setCouponCode} = cartSlice.actions;
export default cartSlice.reducer;
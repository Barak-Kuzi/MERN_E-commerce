import {createSlice} from '@reduxjs/toolkit';
import {User, Order, Product} from "../models";

interface CartState {
    products: Product[];
    subtotal: number;
    deliveryFee: number;
    total: number;
}

interface UserState {
    user: User | null;
    userConnected: boolean;
    cart: CartState;
    orders: Order[];
}

const initialState: UserState = {
    user: null,
    userConnected: false,
    cart: {
        products: [],
        subtotal: 0,
        deliveryFee: 0,
        total: 0,
    },
    orders: [],
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
        setUserCart: (state, action) => {
            const products = action.payload;
            const subtotal: number = products.reduce((acc:number, item: Product) => acc + (item.productSellingPrice as number * item.quantity!), 0);
            const deliveryFee: number = 10;
            const total: number = subtotal + deliveryFee;

            state.cart = {
                products,
                subtotal: parseFloat(subtotal.toFixed(2)),
                deliveryFee: parseFloat(deliveryFee.toFixed(2)),
                total: parseFloat(total.toFixed(2)),
            };
        },
        setUserOrders: (state, action) => {
            state.orders = action.payload;
        }
    },
});

export const { setUserDetails, setUserConnection, setUserCart, setUserOrders } = userSlice.actions;

export default userSlice.reducer;
import {createSlice} from '@reduxjs/toolkit';

import {User, Order, Product, Address} from "../models";

interface CartState {
    products: Product[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    discount: number;
    couponCode?: string;
}

interface UserState {
    user: User | null;
    userConnected: boolean;
    // cart: CartState;
    orders: Order[];
    wishlist: Product[];
    address: Address;
}

const initialState: UserState = {
    user: null,
    userConnected: false,
    // cart: {
    //     products: [],
    //     subtotal: 0,
    //     deliveryFee: 0,
    //     total: 0,
    //     discount: 0,
    //     couponCode: ''
    // },
    orders: [],
    wishlist: [],
    address: {
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
    }
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
        // setUserCart: (state, action) => {
        //     const products = action.payload;
        //     const subtotal: number = products.reduce((acc: number, item: Product) => acc + (item.productSellingPrice as number * item.quantity!), 0);
        //     const deliveryFee: number = 10;
        //     const total: number = subtotal + deliveryFee;
        //
        //     state.cart = {
        //         products,
        //         subtotal: parseFloat(subtotal.toFixed(2)),
        //         deliveryFee: parseFloat(deliveryFee.toFixed(2)),
        //         total: parseFloat(total.toFixed(2)),
        //         discount: 0
        //     };
        // },
        setUserOrders: (state, action) => {
            state.orders = action.payload;
        },
        setUserWishlist: (state, action) => {
            state.wishlist = action.payload;
        },
        setUserAddress: (state, action) => {
            state.address = action.payload;
        },
        // setDiscount: (state, action) => {
        //     state.cart.discount = action.payload;
        //     state.cart.total = state.cart.total - action.payload;
        // },
        // setCouponCode: (state, action) => {
        //     state.cart.couponCode = action.payload;
        // }
    },
});

export const {
    setUserDetails,
    setUserConnection,
    // setUserCart,
    setUserOrders,
    setUserWishlist,
    setUserAddress,
    // setDiscount,
    // setCouponCode
} = userSlice.actions;

export default userSlice.reducer;
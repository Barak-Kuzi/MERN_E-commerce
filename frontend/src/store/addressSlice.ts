import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Address} from '../models';

interface AddressState {
    address: Address;
}

const initialState: AddressState = {
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

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setUserAddress: (state, action: PayloadAction<Address>) => {
            state.address = action.payload;
        },
    },
});

export const {setUserAddress} = addressSlice.actions;
export default addressSlice.reducer;
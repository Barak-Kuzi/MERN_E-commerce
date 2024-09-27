import React from 'react';

import styles from '../styles/UserDeliveryAddress.module.css';
import DeliveryAddressForm from "../components/DeliveryAddressForm";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

function UserDeliveryAddress() {
    const userAddress = useSelector((state: RootState) => state.user?.address);

    return (
        <div className={styles.container}>
            <DeliveryAddressForm userAddress={userAddress} handleOnChange={undefined}/>
        </div>
    );
}

export default UserDeliveryAddress;
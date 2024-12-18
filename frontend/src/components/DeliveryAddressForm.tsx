import React from "react";

import styles from '../styles/DeliveryAddressForm.module.css';

interface UserAddress {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
}

interface DeliveryAddressFormProps {
    userAddress: UserAddress | undefined;
    handleOnChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}

function DeliveryAddressForm({userAddress, handleOnChange}: DeliveryAddressFormProps): React.JSX.Element {

    return (
        <div className={styles.form_container}>
            <p className={styles.title}>Delivery Address</p>
            <div className={styles.multi_fields}>
                <div className={styles.text_field}>
                    <label>First Name:</label>
                    <input type="text"
                           placeholder="First name"
                           name="firstName"
                           value={userAddress?.firstName || ''}
                           onChange={handleOnChange}
                           readOnly={!handleOnChange}
                    />
                </div>
                <div className={styles.text_field}>
                    <label>Last Name:</label>
                    <input type="text"
                           placeholder="Last name"
                           name="lastName"
                           value={userAddress?.lastName || ''}
                           onChange={handleOnChange}
                           readOnly={!handleOnChange}
                    />
                </div>
            </div>
            <div className={styles.text_field}>
                <label>Email:</label>
                <input
                    type="email"
                    placeholder="Email address"
                    name="email"
                    value={userAddress?.email || ''}
                    onChange={handleOnChange}
                    readOnly={!handleOnChange}
                />
            </div>
            <div className={styles.text_field}>
                <label>Street:</label>
                <input
                    type="text"
                    placeholder="Street"
                    name="street"
                    value={userAddress?.street || ''}
                    onChange={handleOnChange}
                    readOnly={!handleOnChange}
                />
            </div>

            <div className={styles.multi_fields}>
                <div className={styles.text_field}>
                    <label>City:</label>
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={userAddress?.city || ''}
                        onChange={handleOnChange}
                        readOnly={!handleOnChange}
                    />
                </div>
                <div className={styles.text_field}>
                    <label>State:</label>
                    <input
                        type="text"
                        placeholder="State"
                        name="state"
                        value={userAddress?.state || ''}
                        onChange={handleOnChange}
                        readOnly={!handleOnChange}
                    />
                </div>
            </div>
            <div className={styles.multi_fields}>
                <div className={styles.text_field}>
                    <label>Zip Code:</label>
                    <input
                        type="text"
                        placeholder="Zip code"
                        name="zipCode"
                        value={userAddress?.zipCode || ''}
                        onChange={handleOnChange}
                        readOnly={!handleOnChange}
                    />
                </div>
                <div className={styles.text_field}>
                    <label>Country:</label>
                    <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        value={userAddress?.country || ''}
                        onChange={handleOnChange}
                        readOnly={!handleOnChange}
                    />
                </div>
            </div>
            <div className={styles.text_field}>
                <label>Phone:</label>
                <input
                    type="text"
                    placeholder="phone"
                    name="phone"
                    value={userAddress?.phone || ''}
                    onChange={handleOnChange}
                    readOnly={!handleOnChange}
                />
            </div>
        </div>
    );
}

export default DeliveryAddressForm;
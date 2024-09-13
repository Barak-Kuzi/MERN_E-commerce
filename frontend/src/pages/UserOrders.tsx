import React, {useState} from "react";

import styles from '../styles/UserOrders.module.css';
import parcel from '../assest/parcel_icon.png';

import {useSelector} from "react-redux";
import {RootState} from "../store/store";

function UserOrders(): React.JSX.Element {
    const userOrders = useSelector((state: RootState) => state.user?.orders);

    console.log(userOrders);

    const [clickedOrderIndex, setClickedOrderIndex] = useState<number | null>(null);
    const handleImageClick = (index: number) => {
        setClickedOrderIndex(clickedOrderIndex === index ? null : index);
    };

    return (
        <div className={styles.user_orders_page}>
            <h2 className={styles.title}>My Orders</h2>
            <div className={styles.container}>
                {
                    userOrders.map((order, index) => {
                        return (
                            <div className={styles.order_container} key={`${order}_${index}`}>
                                <div className={styles.order}>
                                    <img
                                        src={parcel}
                                        alt="parcel"
                                        onClick={() => handleImageClick(index)}
                                    />
                                    <p>{order._id}</p>
                                    <p>${order.amount}</p>
                                    <p>Items: {order.products.length}</p>
                                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                                    <button>Track Order</button>

                                </div>
                                {clickedOrderIndex === index && (
                                    <div className={styles.product_list}>
                                        <h4>Products in this order:</h4>
                                        <ul>
                                            {order.products.map((product, idx) => (
                                                <li key={idx} className={styles.product_item}>
                                                    <img src={product.productImages[0]} alt={product.productName}
                                                         className={styles.product_image}/>
                                                    <div className={styles.product_details}>
                                                        <span>
                                                            <strong>Product Name: </strong> <span>{product.productName}</span>
                                                        </span>
                                                        <span>
                                                            <strong>Product Price: </strong> <span> ${product.productPrice}</span>
                                                        </span>
                                                        <span>
                                                            <strong>Product Quantity: </strong> <span>{product.quantity}</span>
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })
                }

            </div>
        </div>
    );
}

export default UserOrders;
import React from 'react';
import {toast} from 'react-toastify'
import {MdModeEditOutline} from "react-icons/md";
import {MdDelete} from "react-icons/md";

import {Product} from "../models";
import UploadProduct from "./UploadProduct";
import displayCurrency from "../utils/displayCurrency";
import SummaryApi from "../common";
import {CustomResponse} from "../utils/CustomResponse";

interface ProductCardAdminPanelProps {
    data: Product;
    fetchData: () => void;
}

export default function ProductCardAdminPanel({data, fetchData}: ProductCardAdminPanelProps): React.JSX.Element {

    const [editProduct, setEditProduct] = React.useState<boolean>(false);

    const handleEditProductScreen = () => {
        setEditProduct((prevState) => !prevState);
    }

    const handleDeleteProduct = async () => {
        try {
            const response = await fetch(SummaryApi.deleteProduct.url.replace('productId', data._id!), {
                method: SummaryApi.deleteProduct.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const resData: CustomResponse = await response.json();

            if (resData.success) {
                toast.success(resData.message);
                fetchData();
            }

            if (resData.error) {
                toast.error(resData.message);
                console.error(resData.message);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    return (
        <div className="product_card_admin_panel_container">
            <div className="product_card_admin_panel_container_card">
                <div className="product_card_admin_panel_image">
                    <img src={data?.productImages[0]} alt={data.productName}/>
                </div>
                <h3>{data.productName}</h3>
            </div>

            <div className="product_card_admin_panel_details">
                <p data-title="Category:">
                    {data.productCategory}
                </p>
                <p data-title="Price:">
                    {displayCurrency(data.productPrice as number)}
                </p>
                <p data-title="Selling:">
                    {displayCurrency(data.productSellingPrice as number)}
                </p>
            </div>

            <div className="product_card_admin_panel_buttons">
                <button
                    className="product_card_admin_panel_edit_button"
                    onClick={handleEditProductScreen}>
                    <MdModeEditOutline/>
                </button>
                <button
                    className="product_card_admin_panel_delete_button"
                    onClick={handleDeleteProduct}>
                    <MdDelete/>
                </button>
            </div>

            {
                editProduct && (
                    <UploadProduct onClose={handleEditProductScreen} fetchData={fetchData} updateProduct={true}
                                   productData={data}/>
                )
            }
        </div>
    )
}
import React, {useEffect, useState} from 'react';

import UploadProduct from "../components/UploadProduct";
import {Product} from "../models";
import SummaryApi from "../common";
import ProductCardAdminPanel from "../components/ProductCardAdminPanel";

export default function AllProducts(): React.JSX.Element {

    const [allProduct, setAllProduct] = useState<Product[]>([]);
    const [openUploadProduct, setOpenUploadProduct] = useState<boolean>(false);

    const handleOpenUploadProduct = () => {
        setOpenUploadProduct(!openUploadProduct);
    }

    const fetchAllProducts = async () => {
        const response = await fetch(SummaryApi.allProducts.url, {
            method: SummaryApi.allProducts.method,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const resData = await response.json();
        if (resData.success) {
            setAllProduct(resData?.data || []);
        }
        if (resData.error) {
            console.error(resData.message);
        }
    }

    useEffect(() => {
        fetchAllProducts();
    }, []);

    return (
        <div>
            <div className="all_products_title">
                <h2>All Products</h2>
                <button
                    onClick={handleOpenUploadProduct}>Upload Product
                </button>
            </div>

            <div className="all_products_container">
                {
                    allProduct.map((product, index) => {
                        return (
                            <ProductCardAdminPanel
                                data={product}
                                fetchData={fetchAllProducts}
                                key={index + "allProduct"}
                            />
                        )
                    })
                }
            </div>

            {
                openUploadProduct && (
                    <UploadProduct onClose={handleOpenUploadProduct} fetchData={fetchAllProducts}/>
                )
            }
        </div>
    )
}
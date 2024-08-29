import React, {useState} from 'react';
import {toast} from 'react-toastify'
import {CgClose} from "react-icons/cg";
import {FaCloudUploadAlt} from "react-icons/fa";
import {MdDelete} from "react-icons/md";

import productCategory from "../utils/productCategory";
import uploadImage from "../utils/uploadImage";
import {Product} from "../models";
import DisplayImage from "./DisplayImage";
import {CustomResponse} from "../utils/CustomResponse";
import SummaryApi from "../common";

interface UploadProductProps {
    onClose: () => void;
    fetchData: () => void;
    productData?: Product;
    updateProduct?: boolean;
}

export default function UploadProduct({
                                          onClose,
                                          fetchData,
                                          updateProduct,
                                          productData
                                      }: UploadProductProps): React.JSX.Element {

    const [data, setData] = useState<Product>({
        ...productData,
        productName: updateProduct ? productData?.productName! : "",
        productBrand: updateProduct ? productData?.productBrand! : "",
        productCategory: updateProduct ? productData?.productCategory! : "",
        productImages: updateProduct ? productData?.productImages! : [],
        productPrice: updateProduct ? productData?.productPrice! : "",
        productSellingPrice: updateProduct ? productData?.productSellingPrice! : "",
        productDescription: updateProduct ? productData?.productDescription! : "",
    })

    const [openFullScreenImage, setOpenFullScreenImage] = useState<boolean>(false);
    const [fullScreenImage, setFullScreenImage] = useState<string>("");

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;

        setData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleFullScreenImage = () => {
        setOpenFullScreenImage((prevState) => !prevState);
    }

    const handleUploadProduct = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const uploadImageCloudinary = await uploadImage(file);

            setData((prevState) => {
                return {
                    ...prevState,
                    productImages: [...prevState.productImages, uploadImageCloudinary.url]
                }
            })
        }
    }

    const handleDeleteProductImage = async (index: number) => {
        const newProductImage = [...data.productImages];
        newProductImage.splice(index, 1);

        setData((prevState) => {
            return {
                ...prevState,
                productImages: [...newProductImage]
            }

        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(updateProduct ? SummaryApi.updateProduct.url : SummaryApi.uploadProduct.url, {
                method: updateProduct ? SummaryApi.updateProduct.method : SummaryApi.uploadProduct.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            const resData: CustomResponse = await response.json();

            if (resData.success) {
                toast.success(resData.message);
                fetchData();
                onClose();
            }

            if (resData.error) {
                toast.error(resData.message);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="upload_product_container">
            <div className="upload_product_container_form">
                <div className="upload_product_container_form_title">
                    <h2>Upload Product</h2>
                    <button onClick={onClose}>
                        <CgClose/>
                    </button>
                </div>

                <form className="upload_product_from" onSubmit={handleSubmit}>
                    <label htmlFor='productName'>Product Name:</label>
                    <input
                        type='text'
                        id='productName'
                        placeholder='Enter Product Name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        required
                    />

                    <label htmlFor='productBrand'>Product Brand:</label>
                    <input
                        type='text'
                        id='productBrand'
                        placeholder='Enter Product Brand'
                        value={data.productBrand}
                        name='productBrand'
                        onChange={handleOnChange}
                        required
                    />

                    <label htmlFor='productCategory'>Product Category:</label>
                    <select required value={data.productCategory} name='productCategory' onChange={handleOnChange}>
                        <option value={""}>Select Product Category</option>
                        {
                            productCategory.map((element, index) => {
                                return (
                                    <option value={element.value} key={element.value + index}>
                                        {element.label}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='productImage'>Product Image:</label>
                    <label htmlFor='uploadImageInput'>
                        <div className="upload_product_form_image_container">
                            <div className="upload_product_form_image">
                                <span><FaCloudUploadAlt/></span>
                                <p>Upload Product Image</p>
                                <input type='file' id='uploadImageInput' onChange={handleUploadProduct}/>
                            </div>
                        </div>
                    </label>

                    <div>
                        {
                            data?.productImages[0] ? (
                                <div className="upload_product_from_uploaded_images_container">
                                    {
                                        data.productImages.map((el, index) => {
                                            return (
                                                <div className="upload_product_from_uploaded_images" key={index + el}>
                                                    <img
                                                        src={el}
                                                        alt={el}
                                                        width={80}
                                                        height={80}
                                                        onClick={() => {
                                                            setOpenFullScreenImage(true)
                                                            setFullScreenImage(el)
                                                        }}
                                                    />

                                                    <div className="upload_product_from_uploaded_images_delete_button"
                                                         onClick={() => handleDeleteProductImage(index)}>
                                                        <MdDelete/>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className="upload_product_form_upload_image_text">* Please Upload a Product Image</p>
                            )
                        }
                    </div>

                    <label htmlFor='productPrice'>Product Price:</label>
                    <input
                        type='number'
                        id='productPrice'
                        placeholder='Enter Product Price'
                        value={data.productPrice}
                        name='productPrice'
                        onChange={handleOnChange}
                        required
                    />

                    <label htmlFor='productSellingPrice'>Product Selling Price:</label>
                    <input
                        type='number'
                        id='productSellingPrice'
                        placeholder='Enter Product Selling Price'
                        value={data.productSellingPrice}
                        name='productSellingPrice'
                        onChange={handleOnChange}
                        required
                    />

                    <label htmlFor='productDescription'>Product Description:</label>
                    <textarea
                        placeholder='Enter Product Description'
                        rows={3}
                        onChange={handleOnChange}
                        name='productDescription'
                        value={data.productDescription}
                    />

                    <button className="form_button upload_product_form_button">
                        {updateProduct ? `Update Product` : `Upload Product`}
                    </button>
                </form>
            </div>

            {
                openFullScreenImage && (
                    <DisplayImage onClose={handleFullScreenImage} image={fullScreenImage}/>
                )
            }

        </div>
    )
}
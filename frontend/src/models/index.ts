export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: Date;
}

export interface Product {
    _id?: string;
    productName: string;
    productDescription: string;
    productCategory: string;
    productPrice: number | string;
    productSellingPrice: number | string;
    productImages: string[];
    productBrand: string;
}
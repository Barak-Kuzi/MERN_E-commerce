export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    profileImage?: string;
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
    quantity?: number;
}

interface ProductsOrder {
    productName: string;
    quantity: number;
    productPrice: number;
    productImage: string;
}

export interface Order {
    // products: ProductsOrder[];
    products: Product[];
    amount: number;
    status: string;
    _id: string;
}

export interface Cart {
    _id: string;
    productId: string;
    quantity: number;
}
export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    profileImage?: string;
    phone?: string;
    gender?: string;
    birthDate?: Date;
    createdAt?: Date;
    firstName?: string;
    lastName?: string;
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
    lovedProduct?: boolean;
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

export interface Wishlist {
    _id: string;
    products: Product[];
}
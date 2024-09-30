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
    averageRating?: number;
}

export interface Order {
    products: Product[];
    amount: number;
    status: string;
    _id: string;
}

export interface Address {
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
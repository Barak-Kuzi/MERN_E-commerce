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
    wishlist?: Wishlist[];
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
    inUsersWishlist?: WishlistUsers[];
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

interface Wishlist {
    productId: string;
    _id: string;
}

interface WishlistUsers {
    userId: string;
    _id: string;
}
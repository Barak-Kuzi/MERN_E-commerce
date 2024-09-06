const backendDomain = 'http://localhost:8080';

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: 'POST'
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: 'POST'
    },
    userDetails: {
        url: `${backendDomain}/api/user-details`,
        method: 'GET'
    },
    userLogout: {
        url: `${backendDomain}/api/userLogout`,
        method: 'GET'
    },
    allUsers: {
        url: `${backendDomain}/api/all-users`,
        method: 'GET'
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: 'POST'
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: 'POST'
    },
    allProducts: {
        url: `${backendDomain}/api/all-products`,
        method: 'GET'
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: 'POST'
    },
    deleteProduct: {
        url: `${backendDomain}/api/delete-product/productId`,
        method: 'DELETE'
    },
    productsByCategory: {
        url: `${backendDomain}/api/products-by-category`,
        method: 'GET'
    },
    productDetails: {
        url: `${backendDomain}/api/product-details/productId`,
        method: 'GET'
    },
    addToCart: {
        url: `${backendDomain}/api/add-to-cart`,
        method: 'POST'
    },
    quantityProductsInCart: {
        url: `${backendDomain}/api/get-quantity-products-in-cart`,
        method: 'GET'
    }
}

export default SummaryApi;
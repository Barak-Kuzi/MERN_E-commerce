# TechMarket

**TechMarket** is a comprehensive web application designed to facilitate seamless online shopping experiences. Built with modern web development practices, TechMarket offers a user-friendly interface and robust features to enhance the shopping journey.

## Key Features

- **Secure User Authentication**: Reliable sign-up and login processes ensure user data security.
- **Edit Profile**: Updating user profile information and uploading profile pictures.
- **Product Management**: Admin capabilities to add, edit, and manage products.
- **Cart Management**: Efficiently add, remove, and update products in the cart.
- **Order History**: View past orders and purchase history.
- **Wishlist**: Save products for future reference.
- **Search Product**: Easily search for products using the search bar and filtering by categories.
- **Real-Time Data Syncing**: Synchronized data updates and offline persistence.

## Technology Stack

### Frontend

- **TypeScript**: Primary language for frontend development.
- **React**: Library for building user interfaces.
- **Redux**: State management.
- **React Router**: For routing.
- **React Toastify**: For notifications.
- **CSS Modules**: For styling.

### Backend

- **Node.js**: JavaScript runtime for backend development.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **JWT**: For authentication.
- **Bcrypt**: For password hashing.

## Project Architecture

The project is organized for scalability and maintainability:

### Frontend

- **Components**: Reusable UI components.
- **Pages**: Different pages of the application.
- **Hooks**: Custom hooks for various functionalities.
- **Store**: Redux store configuration.
- **Styles**: CSS modules for styling.
- **Utils**: Utility functions.

### Backend

- **Controllers**: Handle incoming requests and return responses.
- **Models**: Mongoose models representing the application's data.
- **Routes**: Define the API endpoints.
- **Middlewares**: Custom middleware functions.
- **Config**: Configuration files.

## External Libraries

### Frontend

- **react**: Library for building user interfaces.
- **react-redux**: Official React bindings for Redux.
- **react-router-dom**: DOM bindings for React Router.
- **react-toastify**: For notifications.
- **axios**: Promise-based HTTP client.

### Backend

- **express**: Web framework for Node.js.
- **mongoose**: ODM for MongoDB.
- **jsonwebtoken**: For authentication.
- **bcryptjs**: For password hashing.
- **cors**: For enabling CORS.
- **dotenv**: For environment variables.

## Prerequisites

- **Node.js 14+**
- **npm 6+**
- **MongoDB**

## Setup

### Clone the repository

```bash
git clone https://github.com/Barak-Kuzi/TechMarket.git
```

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd TechMarket/backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file and add the following environment variables:
    ```env
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```
4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd TechMarket/frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend development server:
    ```bash
    npm start
    ```

## Contributing

Contributions are welcome! Follow these steps to get started:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Submit a Pull Request.

## Acknowledgements

Special thanks to the following resources:

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## Contact

For inquiries or feedback, reach out at [barakkuzi1997@gmail.com](mailto:barakkuzi1997@gmail.com).

---

Thank you for choosing TechMarket for your online shopping needs!

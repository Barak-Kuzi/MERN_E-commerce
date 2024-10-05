# TechMarket

**TechMarket** is a full-stack e-commerce web application designed to deliver a seamless online shopping experience. The project is built using the MERN stack (MongoDB, Express, React, Node.js) and integrates a variety of modern technologies to provide efficient product management, secure transactions, and smooth user navigation.

## Key Features

- **Secure User Authentication**: Secure login, registration, and session management with JWT.
- **User Management**: Updating user profile information, uploading profile pictures, and changing a password.
- **Product Management**: Admin capabilities to add, edit, and manage products.
- **Product Rating and Reviews**: Users can rate products from 1 to 5 stars, with dynamic average rating calculations.
- **Cart Management**: Add, remove, and manage products in the cart with live updates.
- **Discounts**: Apply discounts during checkout.
- **Order Management**: Users can place orders, view order details, and track order history.
- **Wishlist**: Add and manage favorite products.
- **Search Product**: Easily search for products using the search bar and filtering by categories.
- **Real-Time Data Syncing**: Synchronized data updates and offline persistence.
- **Real-time Notifications**: Get updates and notifications for actions like adding to the cart or completing purchases.
- **Responsive Design**: Optimized for mobile, tablet, and desktop screens.

## Technology Stack

### Frontend

- **TypeScript**: Strongly typed JavaScript for better development experience.
- **React**: React is used to build dynamic user interfaces in web applications.
- **Redux**: For state management across the application.
- **React Router**: For client-side routing.
- **React Toastify**: For notifications.
- **HTML5/CSS3**: Markup and styling.
- **CSS Modules**: For scoped styling.

### Backend

- **Node.js**: JavaScript runtime for backend development.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM to interact with MongoDB.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.
- **Bcrypt**: For password encryption.
- **Dotenv**: For environment variable management.
- **Stripe API**: For handling payments and transactions.

## Project Architecture

The project is organized for scalability and maintainability:

### Frontend

- **Components**: Reusable UI components.
- **Pages**: Different pages of the application.
- **Hooks**: Custom hooks for various functionalities.
- **Store**: Redux store configuration and Redux slices for managing different application states.
- **Styles**: CSS modules for styling individual components and pages.
- **Utils**: Utility functions and helpers used across the app.

### Backend

- **Controllers**: Handle incoming requests and return responses.
- **Models**: Mongoose models representing the application's data.
- **Routes**: Define the API endpoints.
- **Middlewares**: Middleware functions for authentication, error handling, etc.
- **Config**: Configuration files, including database connection settings.
- **Utils**: Utility functions and helpers used across the app.

## External Libraries

### Frontend

- **react**: Core library for building the user interface.
- **@types/react**: Type definitions for React.
- **react-redux**: Integration of Redux with React for state management.
- **redux-toolkit**: Simplified Redux development with modern patterns.
- **react-router-dom**: Routing for different pages in the application.
- **react-toastify**: For notification popups.
- **axios**: Promise-based HTTP client.

### Backend

- **express**: Web framework for Node.js.
- **nodemon**: For auto-restarting the server during development.
- **mongoose**: ODM library for MongoDB to manage database models and queries.
- **jsonwebtoken**: For creating and verifying JWTs.
- **bcryptjs**: For hashing and securely storing user passwords.
- **cors**: For enabling CORS across different origins.
- **dotenv**: For environment variable management.
- **stripe**: Stripe API integration for handling payments.

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
- [Stripe](https://stripe.com/)

## Contact

For inquiries or feedback, reach out at [barakkuzi1997@gmail.com](mailto:barakkuzi1997@gmail.com).

---

Thank you for choosing TechMarket for your online shopping needs!

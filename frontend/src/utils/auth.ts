import {redirect} from "react-router-dom";

const getTokenDuration = (): number | null => {
    const storedExpirationDate = localStorage.getItem('expiration');

    if (storedExpirationDate === null)
        return null;

    const expirationDate: Date = new Date(storedExpirationDate);
    const currentDate: Date = new Date();
    return expirationDate.getTime() - currentDate.getTime();
}

const getAuthToken = (): string | null => {
    const token = localStorage.getItem('token');
    if (!token)
        return null;

    const tokenDuration: number | null = getTokenDuration();
    if (tokenDuration && tokenDuration <= 0) {
        return 'EXPIRED';
    }

    return token;
}

const loaderToken = () => {
    return getAuthToken();
}

const checkAuthLoader = () => {
    const token = getAuthToken();

    if (!token) {
        redirect('/login');
    }

    return null;
}

export {loaderToken, checkAuthLoader, getTokenDuration, getAuthToken};
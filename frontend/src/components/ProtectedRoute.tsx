import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

interface ProtectedRouteProps {
    children: React.ReactNode;
    pathProtection: string;
    isUserPanel: boolean;
}

function ProtectedRoute({children, pathProtection, isUserPanel}: ProtectedRouteProps): React.JSX.Element {
    const location = useLocation();
    const userConnected = useSelector((state: RootState) => state.user.userConnected);

    if (!userConnected && isUserPanel) {
        return (
            <Navigate to={pathProtection} state={{from: location}} replace/>
        );
    }

    return (
        <>
            {children}
        </>
    );
}

export default ProtectedRoute;
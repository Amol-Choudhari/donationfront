import React from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from './useAuth'; // Adjust the path as needed

const AuthWrapper = ({ children }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    // Only run useAuth if not on the login page
    //if (!isLoginPage) {
        const { isLoading } = useAuth();
    //}

    // Only render children if loading is complete and not on the login page
    if (isLoading || (!isLoginPage && !sessionStorage.getItem('jwtToken'))) {
        return null; // or a loading spinner
    }

    return <>{children}</>;
};

export default AuthWrapper;
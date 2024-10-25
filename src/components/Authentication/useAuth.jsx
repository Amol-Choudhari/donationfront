import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (sessionStorage.getItem('jwtToken') == null) {
            navigate('/login');
        }

    setIsLoading(false); // Set loading to false after the check
    }, [navigate]);

    return { isLoading };
};

export default useAuth;
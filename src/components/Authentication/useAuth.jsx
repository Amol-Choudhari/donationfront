import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('jwtToken') == null) {
            navigate('/login');
        }
    }, [navigate]);
};

export default useAuth;
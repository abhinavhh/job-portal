import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useValidate = (): boolean => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const ValidateToken = async() => {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login'); // Redirect to login if no token
                return;
            }

            try {
                const response = await fetch('/api/authorization', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if(response.status === 200){
                    setIsAuthenticated(true);
                }

                else{
                    setIsAuthenticated(false);
                    navigate("/login");
                }

            }
            catch (error) {
                console.error('Token decode error:', error);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        ValidateToken();

    }, [navigate]);
    return isAuthenticated;
};

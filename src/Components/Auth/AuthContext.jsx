    import React, { createContext, useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import axios from 'axios';

    export const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
        const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
        const navigate = useNavigate();

        useEffect(() => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        }, []);

        const login = async (email, password) => {
            try {
                const response = await axios.post('https://api-tronix-reserve.supsofttech.tmc-innovations.com/api/auth/login', { email, password });
                localStorage.setItem('token', response.data.access_token);
                setIsAuthenticated(true);
                navigate('/'); // Redirect to dashboard or main page
            } catch (error) {
                console.error('Login failed', error);
            }
        };

        const logout = async () => {
            try {
                await axios.post('https://api-tronix-reserve.supsofttech.tmc-innovations.com/api/auth/logout', {}, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                navigate('/404');
            } catch (error) {
                console.error('Logout failed', error);
            }
        };

        return (
            <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
                {children}
            </AuthContext.Provider>
        );
    };

import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";
import toast from 'react-hot-toast';


const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be withing an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setToken(storedToken);
                setUser(parsedUser);
                console.log('User loaded from localStorage:', parsedUser);
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authAPI.login(credentials);
            const { token: newToken, user: userData } = response.data;

            console.log('Login response:', response.data);
            console.log('User data:', userData);

            if (!userData) {
                throw new Error('User data not received from server');
            }

            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(userData));

            setToken(newToken);
            setUser(userData);

            toast.success("Login Successfull");
            return { success: true };

        } catch (error) {
            const message = error.response?.data?.message || 'Login Failed';
            toast.error(message);

            return { success: false, error: message };
        }
    };

    const register = async (userData) => {
        try {
            const response = await authAPI.register(userData);
            const { token: newToken, user: newUser } = response.data;

            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser));

            setToken(token);
            setUser(user);

            toast.success("Registration Successful!");
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || "Registration Failed";
            toast.error(message);

            return { success: false, error: message };
        }
    };

    const logout = () => {
        console.log(`${ user } logged out`);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        setToken(null);
        setUser(null);

        toast.success('Logged Out Successfully');
    }

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>
};

export default AuthContext;
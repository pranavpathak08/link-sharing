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
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authAPI.login(credentials);
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setToken(token);
            setUser(user);

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
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

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
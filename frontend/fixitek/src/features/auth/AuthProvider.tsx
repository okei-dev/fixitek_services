import { api } from "@/lib/api";
import { RegisterFormData } from "@/types/register";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



interface AuthContextType {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
    login: (formData: { username: string; password: string }) => Promise<void>;
    register: (formData: RegisterFormData) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const storedAccess = localStorage.getItem('access');
        const storedRefresh = localStorage.getItem('refresh');

        if (storedAccess && storedRefresh) {
            setAccessToken(storedAccess);
            setRefreshToken(storedRefresh);
        }
        setLoading(false);
    }, []);


    const login = async (formData: { username: string; password: string}) => {
        setLoading(true);
        setError(null);
        
        try {
            const res = await api.post(`/auth/jwt/create/`, formData);
            const { access, refresh } = res.data;

            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);
            setAccessToken(access);
            setRefreshToken(refresh);

            navigate('/dashboard')
        } catch (error: any) {
            setError(error.response?.data?.detail || 'Login failed')
        } finally {
            setLoading(false);
        }
    };


    const register = async (formData: RegisterFormData) => {
        setLoading(true);
        setError(null);

        try {
            await api.post('/auth/users/', formData);
            alert(`${formData.username} was successfully registered.`);
            navigate('/')
        } catch (error: any) {
            const data = error.response?.data;
            if (data?.username?.[0]?.includes('already exists')) {
                setError('Username already exists.');
            } else if (data?.email?.[0]?.includes('already exists')) {
                setError('Email already in use.');
            } else {
                setError('Registration failed. Please try again.');
            }
            console.error('Registration error:', data);
        } finally {
            setLoading(false);
        }
    }


    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setAccessToken(null);
        setRefreshToken(null);
        navigate('/login');
    };


    const isAuthenticated = !!accessToken;

    if (loading) return <p className="text-2xl text-center">Loading...</p>;

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            accessToken, 
            refreshToken, 
            login, 
            register, 
            logout,
            loading,
            error,
            }}
            >
            {children}
        </AuthContext.Provider>
    )
}
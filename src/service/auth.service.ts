import { LoginPayload, LoginResponse } from '@/types/auth.types';
import axios from 'axios';
//import type { LoginResponse, LoginPayload } from '@/types/auth.types';

const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://172.21.2.20/posgrado';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token automáticamente a las peticiones
axiosInstance.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
    const query = `
        mutation {
            login(username: "${payload.username}", password: "${payload.password}", ip: "${payload.ip}") { 
                success              
                message
                usuario {
                  username
                }
                accessToken
            }
        }
    `;
    try {
        const response = await axiosInstance.post('', { query });
        return response.data.data.login;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Error in GraphQL request');
        }
        throw error;
    }
};

// Funciones helper para acceder al token y usuario del localStorage
export const getAccessToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
};

export const getUser = () => {
    if (typeof window === 'undefined') return null;
    const storage = localStorage.getItem('auth-storage');
    if (storage) {
        try {
            const parsed = JSON.parse(storage);
            return parsed.state?.user || null;
        } catch {
            return null;
        }
    }
    return null;
};

export const logout = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('auth-storage');
    localStorage.removeItem('user');
};
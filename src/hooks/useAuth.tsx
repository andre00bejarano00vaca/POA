"use client";

import { loginUser } from '@/service/auth.service';
import { LoginPayload, LoginResponse } from '@/types/auth.types';
import { useState } from 'react';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (payload: LoginPayload): Promise<LoginResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginUser(payload);
            
            // Guardar token y datos del usuario en localStorage
            if (response.accessToken && response.refreshToken && response.success) {
                // Guardar accessToken por separado para fácil acceso
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);
                // Guardar estructura completa que espera el Header (auth-storage)
                const authData = {
                    state: {
                        user: {
                            username: response.usuario.username,
                            // Puedes agregar más campos del usuario aquí si los necesitas
                        },
                        token: response.accessToken,
                    }
                };
                localStorage.setItem('auth-storage', JSON.stringify(authData));
                
                // También guardar usuario por separado para compatibilidad
                localStorage.setItem('user', JSON.stringify(response.usuario));
            }
            
            return response;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login error';
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        loading,
        error,
    };
};
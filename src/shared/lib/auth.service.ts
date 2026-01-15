import { LoginPayload, LoginResponse } from "@/shared/types/auth.types";
import axios from "axios";
//import type { LoginResponse, LoginPayload } from '@/types/auth.types';

const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Variables para manejar refresh token
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor para agregar el token automáticamente a las peticiones
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
  }
  return config;
});

//Interceptor de respuesta para auto-refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no hemos intentado refrescar aún
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `JWT ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        // No hay refresh token, hacer logout
        logout();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      try {
        const newAccessToken = await refreshAccessToken(refreshToken);
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = `JWT ${newAccessToken}`;
        processQueue(null, newAccessToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        logout();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const query = `
        mutation {
            login(username: "${payload.username}", password: "${payload.password}", ip: "${payload.ip}") { 
                success              
                message
                usuario {
                  username
                }
                accessToken
                refreshToken
            }
        }
    `;
  try {
    const response = await axiosInstance.post("", { query });
    return response.data.data.login;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error in GraphQL request"
      );
    }
    throw error;
  }
};

//Función para refrescar access token
export const refreshAccessToken = async (
  refreshToken: string
): Promise<string> => {
  const query = `
        mutation {
            refreshToken(token: "${refreshToken}") {
                token
            }
        }
    `;

  try {
    const response = await axios.post(API_URL!, { query });
    const data = response.data.data.refreshToken;
    return data.token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to refresh token"
      );
    }
    throw error;
  }
};

// Funciones helper para acceder al token y usuario del localStorage
export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

// Función para obtener el refresh token
export const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refreshToken");
};

export const getUser = () => {
  if (typeof window === "undefined") return null;
  const storage = localStorage.getItem("auth-storage");
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
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken"); // AGREGADO
  localStorage.removeItem("auth-storage");
  localStorage.removeItem("user");
};

// Verificar si el token está por expirar
export const isTokenExpiringSoon = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000;
    const now = Date.now();
    const timeLeft = exp - now;

    return timeLeft < 2 * 60 * 1000;
  } catch {
    return true;
  }
};

// Refrescar token proactivamente
export const refreshTokenIfNeeded = async (): Promise<void> => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken || !refreshToken) return;

  if (isTokenExpiringSoon(accessToken)) {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      localStorage.setItem("accessToken", newAccessToken);
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  }
};

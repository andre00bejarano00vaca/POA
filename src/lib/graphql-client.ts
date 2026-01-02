import { getAccessToken, getRefreshToken, refreshAccessToken, logout } from "@/service/auth.service";

/**
 * Este es el motor central de tu aplicación. 
 * Todos los servicios que hemos creado (Recaudación, PEI, etc.) 
 * utilizarán esta función para hablar con el servidor.
 */
export async function fetchGraphQL<T>(query: string, variables = {}): Promise<T> {
  const API_URL = process.env.NEXT_PUBLIC_PLANNING_URL || "http://localhost:8003/planning/";
 
//Función helper para hacer petición
  const makeRequest = async (token: string | null): Promise<Response> => {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `JWT ${token}` : '',
      },
      body: JSON.stringify({ query, variables }),
    });
  };

  let token = getAccessToken();
  let response = await makeRequest(token);

  if (response.status === 401) {
    const refreshToken = getRefreshToken();
    
    if (!refreshToken) {
      logout();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('Sesion expirada. Inicie sesión nuevamente.');
    }

    try {
      // Intentar obtener un nuevo access token
      const newAccessToken = await refreshAccessToken(refreshToken);
      
      // Guardar el nuevo token
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', newAccessToken);
      }
      
      // Reintentar la petición con el nuevo token
      response = await makeRequest(newAccessToken);
    } catch (refreshError) {
      // Si falla el refresh, hacer logout
      logout();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('Failed to refresh authentication. Please login again.');
    }
  }

  const { data, errors } = await response.json();

  if (errors) {
    console.error("Error en GraphQL:", errors);
    throw new Error(errors[0].message || "Error en la consulta");
  }

  return data;
}
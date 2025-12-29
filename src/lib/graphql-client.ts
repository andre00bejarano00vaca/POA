import { getAccessToken } from "@/service/auth.service";

/**
 * Este es el motor central de tu aplicación. 
 * Todos los servicios que hemos creado (Recaudación, PEI, etc.) 
 * utilizarán esta función para hablar con el servidor.
 */
export async function fetchGraphQL<T>(query: string, variables = {}): Promise<T> {
  // Asegúrate de configurar esta variable en tu archivo .env
  const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://172.21.2.20/planning";
  const token = getAccessToken();
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
      // Aquí podrías agregar el token de autenticación si fuera necesario
    },
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    console.error("Error en GraphQL:", errors);
    throw new Error(errors[0].message || "Error en la consulta");
  }

  return data;
}
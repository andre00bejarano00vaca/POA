import { fetchGraphQL } from '@/lib/graphql-client';

export const FuenteService = {
  // --- MUTATIONS ---

  /** Crea una nueva fuente de financiamiento */
  create: async (codigo: number, description: string) => {
    const mutation = `
      mutation CreateFuente($codigo: Int!, $description: String!) {
        createFuente(codigo: $codigo, description: $description) {
          success
          message
          data {
            id
            codigo
            description
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { codigo, description });
  },

  /** Actualiza la descripción de una fuente existente */
  update: async (id: number, description: string) => {
    const mutation = `
      mutation UpdateFuente($id: ID!, $description: String!) {
        updateFuente(id: $id, description: $description) {
          success
          message
          data {
            id
            codigo
            description
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, description });
  },

  /** Elimina una fuente por su ID */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteFuente($id: ID!) {
        deleteFuente(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene una fuente específica por su ID */
  getById: async (id: number) => {
    const query = `
      query GetFuente($id: ID!) {
        getFuente(id: $id) {
          success
          message
          data {
            id
            codigo
            description
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todas las fuentes con soporte para paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListFuentes($limit: Int, $offset: Int) {
        listFuentes(limit: $limit, offset: $offset) {
          count
          results {
            id
            codigo
            description
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca fuentes por coincidencia de texto (ej: "DONACIÓN") */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchFuentes($search: String!, $limit: Int) {
        searchFuentes(search: $search, limit: $limit) {
          count
          results {
            id
            codigo
            description
          }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  }
};
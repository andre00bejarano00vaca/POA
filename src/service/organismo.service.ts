import { fetchGraphQL } from '@/lib/graphql-client';

export const OrganismoService = {
  // --- MUTATIONS ---

  /** Crea un nuevo organismo financiador */
  create: async (codigo: number, description: string) => {
    const mutation = `
      mutation CreateOrganismo($codigo: Int!, $description: String!) {
        createOrganismo(codigo: $codigo, description: $description) {
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

  /** Actualiza la descripción de un organismo */
  update: async (id: number, description: string) => {
    const mutation = `
      mutation UpdateOrganismo($id: ID!, $description: String!) {
        updateOrganismo(id: $id, description: $description) {
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

  /** Elimina un organismo por su ID */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteOrganismo($id: ID!) {
        deleteOrganismo(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene un organismo y las fuentes de financiamiento asociadas */
  getById: async (id: number) => {
    const query = `
      query GetOrganismo($id: ID!) {
        getOrganismo(id: $id) {
          success
          message
          data {
            id
            codigo
            description
            fuentes {
              id
              codigo
              description
            }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todos los organismos con sus fuentes */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListOrganismos($limit: Int, $offset: Int) {
        listOrganismos(limit: $limit, offset: $offset) {
          count
          results {
            id
            codigo
            description
            fuentes {
              id
              codigo
            }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca organismos por descripción o código */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchOrganismos($search: String!, $limit: Int) {
        searchOrganismos(search: $search, limit: $limit) {
          count
          results {
            id
            codigo
            description
          }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  },

  /** Utilidades de conteo y existencia */
  utils: {
    count: () => fetchGraphQL<any>(`query { countOrganismos }`),
    exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsOrganismo(id: $id) }`, { id })
  }
};
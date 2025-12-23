import { fetchGraphQL } from '@/lib/graphql-client';

export const AreaEstrategicaService = {
  // --- MUTATIONS ---

  /** Crea una nueva área estratégica asociada a un PEI */
  create: async (description: string, peiId: number) => {
    const mutation = `
      mutation CreateArea($description: String!, $peiId: Int!) {
        createAreaEstrategica(description: $description, peiId: $peiId) {
          success
          message
          data {
            id
            description
            pei { id observacion }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { description, peiId });
  },

  /** Actualiza la descripción de un área estratégica existente */
  update: async (id: number, description: string) => {
    const mutation = `
      mutation UpdateArea($id: ID!, $description: String!) {
        updateAreaEstrategica(id: $id, description: $description) {
          success
          message
          data {
            id
            description
            pei { id observacion }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, description });
  },

  /** Elimina un área estratégica por su ID */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteArea($id: ID!) {
        deleteAreaEstrategica(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene una área estratégica específica por su ID */
  getById: async (id: number) => {
    const query = `
      query GetArea($id: ID!) {
        getAreaEstrategica(id: $id) {
          success
          message
          data {
            id
            description
            pei { id observacion }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista áreas estratégicas con soporte para paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListAreas($limit: Int, $offset: Int) {
        listAreasEstrategicas(limit: $limit, offset: $offset) {
          count
          results {
            id
            description
            pei { id observacion }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca áreas estratégicas por coincidencia de texto */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchAreas($search: String!, $limit: Int) {
        searchAreasEstrategicas(search: $search, limit: $limit) {
          count
          results {
            id
            description
            pei { id observacion }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  },

  /** Filtra áreas estratégicas por un PEI específico */
  filterByPei: async (peiId: number, limit = 100) => {
    const query = `
      query FilterByPei($peiId: Int!, $limit: Int) {
        filterAreasPorPei(peiId: $peiId, limit: $limit) {
          count
          results {
            id
            description
            pei { id observacion }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { peiId, limit });
  },

  /** Utilidades para conteo y validación de existencia */
  utils: {
    count: () => fetchGraphQL<any>(`query { countAreasEstrategicas }`),
    exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsAreaEstrategica(id: $id) }`, { id })
  }
};
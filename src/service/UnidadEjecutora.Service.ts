import { fetchGraphQL } from '@/lib/graphql-client'

export const UnidadEjecutoraService = {
  // --- QUERIES ---

  getById: async (id: number) => {
    const query = `
      query GetUnidadEjecutora($id: ID!) {
        getUnidadEjecutora(id: $id) {
          success
          message
          data {
            id
            description
            techoPres
            direccionAdministrativa { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListUnidadesEjecutoras($limit: Int, $offset: Int) {
        listUnidadesEjecutoras(limit: $limit, offset: $offset) {
          count
          results {
            id
            description
            techoPres
            direccionAdministrativa { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  search: async (text: string, limit = 50) => {
    const query = `
      query SearchUnidades($search: String!, $limit: Int) {
        searchUnidadesEjecutoras(search: $search, limit: $limit) {
          count
          results { id description techoPres }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  },

  // --- MUTATIONS ---

  create: async (data: { description: string; daId: number; techo: number }) => {
    const mutation = `
      mutation CreateUnidad($description: String!, $daId: Int!, $techo: Float!) {
        createUnidadEjecutora(
          description: $description,
          direccionAdministrativaId: $daId,
          techoPres: $techo
        ) {
          success
          message
          data { id description }
        }
      }`;
    return fetchGraphQL<any>(mutation, { 
      description: data.description, 
      daId: data.daId, 
      techo: data.techo 
    });
  },

  update: async (id: number, data: { description?: string; techo?: number }) => {
    const mutation = `
      mutation UpdateUnidad($id: ID!, $description: String, $techo: Float) {
        updateUnidadEjecutora(id: $id, description: $description, techoPres: $techo) {
          success
          message
          data { id description techoPres }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, ...data });
  },

  delete: async (id: number) => {
    const mutation = `
      mutation DeleteUnidad($id: ID!) {
        deleteUnidadEjecutora(id: $id) {
          success
          message
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  }
};
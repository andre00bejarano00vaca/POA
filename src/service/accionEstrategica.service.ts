import { fetchGraphQL } from '@/lib/graphql-client';

export const AccionEstrategicaService = {
  // --- MUTATIONS ---

  /** Crea una nueva acción estratégica vinculada a un objetivo estratégico */
  create: async (description: string, objetivoEstrategicoId: number) => {
    const mutation = `
      mutation CreateAccionEstrat($description: String!, $objId: Int!) {
        createAccionEstrategica(description: $description, objetivoEstrategicoId: $objId) {
          success
          message
          data {
            id
            description
            objetivoEstrategico { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { description, objId: objetivoEstrategicoId });
  },

  /** Actualiza la descripción de una acción estratégica */
  update: async (id: number, description: string) => {
    const mutation = `
      mutation UpdateAccionEstrat($id: ID!, $description: String!) {
        updateAccionEstrategica(id: $id, description: $description) {
          success
          message
          data {
            id
            description
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, description });
  },

  /** Elimina una acción estratégica por su ID */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteAccionEstrat($id: ID!) {
        deleteAccionEstrategica(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Lista todas las acciones estratégicas con paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListAccionesEstrat($limit: Int, $offset: Int) {
        listAccionesEstrategicas(limit: $limit, offset: $offset) {
          count
          results {
            id
            description
            objetivoEstrategico { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Obtiene acciones estratégicas ordenadas (ej: "description" o "-id") */
  getOrdered: async (orderBy: string, limit = 100) => {
    const query = `
      query GetAccionesOrdered($orderBy: String, $limit: Int) {
        getAccionesEstrategicasOrdenadas(orderBy: $orderBy, limit: $limit) {
          count
          results {
            id
            description
            objetivoEstrategico {
              id
              description
            }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { orderBy, limit });
  },

  /** Busca acciones estratégicas por texto */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchAccionesEstrat($search: String!, $limit: Int) {
        searchAccionesEstrategicas(search: $search, limit: $limit) {
          count
          results {
            id
            description
          }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  }
};
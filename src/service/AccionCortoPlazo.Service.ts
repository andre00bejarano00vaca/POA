import { fetchGraphQL } from '@/lib/graphql-client';

export const AccionCortoPlazoService = {
  // --- MUTATIONS ---

  /** Crea una nueva acción a corto plazo asociada a un programa [cite: 11] */
  create: async (description: string, programaId: number) => {
    const mutation = `
      mutation CreateAccion($description: String!, $programaId: Int!) {
        createAccionCortoPlazo(description: $description, programaId: $programaId) {
          success
          message
          data {
            id
            description
            programa { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { description, programaId });
  },

  /** Actualiza la descripción o el programa de una acción existente  */
  update: async (id: number, description: string, programaId: number) => {
    const mutation = `
      mutation UpdateAccion($id: ID!, $description: String!, $programaId: Int!) {
        updateAccionCortoPlazo(id: $id, description: $description, programaId: $programaId) {
          success
          message
          data {
            id
            description
            programa { description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, description, programaId });
  },

  /** Elimina una acción a corto plazo por su ID  */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteAccion($id: ID!) {
        deleteAccionCortoPlazo(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene una acción específica por su ID [cite: 13] */
  getById: async (id: number) => {
    const query = `
      query GetAccion($id: ID!) {
        getAccionCortoPlazo(id: $id) {
          success
          message
          data {
            id
            description
            programaId
            programa { description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista acciones con soporte para paginación [cite: 14] */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListAcciones($limit: Int, $offset: Int) {
        listAccionesCortoPlazo(limit: $limit, offset: $offset) {
          count
          results {
            id
            description
            programa { description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca acciones por coincidencia de texto en la descripción [cite: 15] */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchAcciones($search: String!, $limit: Int) {
        searchAccionesCortoPlazo(search: $search, limit: $limit) {
          count
          results {
            id
            description
            programa { description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  },

  /** Filtra acciones que pertenecen a un programa específico [cite: 16] */
  filterByPrograma: async (programaId: number, limit = 100) => {
    const query = `
      query FilterByPrograma($programaId: Int!, $limit: Int) {
        filterAccionesPorPrograma(programaId: $programaId, limit: $limit) {
          count
          results {
            id
            description
            programa { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { programaId, limit });
  },

  /** Obtiene la lista ordenada (ej: "description" o "-id") [cite: 16, 17] */
  getOrdered: async (orderBy: string, limit = 100) => {
    const query = `
      query GetOrdered($orderBy: String, $limit: Int) {
        getAccionesCortoPlazoOrdenadas(orderBy: $orderBy, limit: $limit) {
          count
          results {
            id
            description
            programa { description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { orderBy, limit });
  },

  /** Verifica si existe una acción o cuenta el total [cite: 16] */
  utils: {
    count: () => fetchGraphQL<any>(`query { countAccionesCortoPlazo }`),
    exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsAccionCortoPlazo(id: $id) }`, { id })
  }
};
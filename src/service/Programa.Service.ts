import { fetchGraphQL } from '@/lib/graphql-client';

export const ProgramaService = {
  // --- MUTATIONS ---

  /** Crea un nuevo programa asociado a un POA */
  create: async (description: string, poaId: number) => {
    const mutation = `
      mutation CreatePrograma($description: String!, $poaId: Int!) {
        createPrograma(description: $description, poaId: $poaId) {
          success
          message
          data { id description poaId }
        }
      }`;
    return fetchGraphQL<any>(mutation, { description, poaId });
  },

  /** Actualiza la descripción de un programa existente */
  update: async (id: number, description: string) => {
    const mutation = `
      mutation UpdatePrograma($id: ID!, $description: String!) {
        updatePrograma(id: $id, description: $description) {
          success
          message
          data { id description poaId }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, description });
  },

  /** Elimina un programa por su ID */
  delete: async (id: number) => {
    const mutation = `
      mutation DeletePrograma($id: ID!) {
        deletePrograma(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene un programa específico por ID */
  getById: async (id: number) => {
    const query = `
      query GetPrograma($id: ID!) {
        getPrograma(id: $id) {
          success
          message
          data { id description poaId }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista programas con soporte para paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListProgramas($limit: Int, $offset: Int) {
        listProgramas(limit: $limit, offset: $offset) {
          count
          results { id description poaId }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca programas por coincidencia de texto en la descripción */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchProgramas($search: String!, $limit: Int) {
        searchProgramas(search: $search, limit: $limit) {
          count
          results { id description poaId }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  },

  /** Filtra programas que pertenecen a un POA específico */
  filterByPoa: async (poaId: number, limit = 100) => {
    const query = `
      query FilterByPoa($poaId: Int!, $limit: Int) {
        filterProgramasPorPoa(poaId: $poaId, limit: $limit) {
          count
          results { id description poaId }
        }
      }`;
    return fetchGraphQL<any>(query, { poaId, limit });
  },

  /** Obtiene la lista ordenada (ej: "description" o "-id") */
  getOrdered: async (orderBy: string, limit = 100) => {
    const query = `
      query GetOrdered($orderBy: String, $limit: Int) {
        getProgramasOrdenados(orderBy: $orderBy, limit: $limit) {
          count
          results { id description poaId }
        }
      }`;
    return fetchGraphQL<any>(query, { orderBy, limit });
  },

  /** Utilidades para contar y verificar existencia */
  utils: {
    count: () => fetchGraphQL<any>(`query { countProgramas }`),
    exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsPrograma(id: $id) }`, { id })
  }
};

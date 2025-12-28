import { fetchGraphQL } from '@/lib/graphql-client';

export const RubroService = {
  // --- MUTATIONS ---

  /** Crea un nuevo rubro con descripción e importe */
  create: async (description: string, importeDouble: number) => {
    const mutation = `
      mutation CreateRubro($description: String!, $importe: Float!) {
        createRubro(description: $description, importeDouble: $importe) {
          success
          message
          data {
            id
            description
            importeDouble
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { description, importe: importeDouble });
  },

  /** Actualiza el importe de un rubro existente */
  update: async (id: number, importeDouble: number) => {
    const mutation = `
      mutation UpdateRubro($id: ID!, $importe: Float!) {
        updateRubro(id: $id, importeDouble: $importe) {
          success
          message
          data {
            id
            description
            importeDouble
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, importe: importeDouble });
  },

  /** Elimina un rubro por su ID */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteRubro($id: ID!) {
        deleteRubro(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene un rubro por su ID */
  getById: async (id: number) => {
    const query = `
      query GetRubro($id: ID!) {
        getRubro(id: $id) {
          success
          message
          data {
            id
            description
            importeDouble
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todos los rubros con soporte para paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListRubros($limit: Int, $offset: Int) {
        listRubros(limit: $limit, offset: $offset) {
          count
          results {
            id
            description
            importeDouble
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca rubros por coincidencia en la descripción (ej: "MATERIALES") */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchRubros($search: String!, $limit: Int) {
        searchRubros(search: $search, limit: $limit) {
          count
          results {
            id
            description
            importeDouble
          }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  },

  /** Obtiene la lista de rubros ordenada por un campo específico */
  getOrdered: async (orderBy: string, limit = 100) => {
    const query = `
      query GetOrdered($orderBy: String, $limit: Int) {
        getRubrosOrdenados(orderBy: $orderBy, limit: $limit) {
          count
          results {
            id
            description
            importeDouble
          }
        }
      }`;
    return fetchGraphQL<any>(query, { orderBy, limit });
  },

  /** Utilidades para conteo y validación de existencia */
  utils: {
    count: () => fetchGraphQL<any>(`query { countRubros }`),
    exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsRubro(id: $id) }`, { id })
  }
};
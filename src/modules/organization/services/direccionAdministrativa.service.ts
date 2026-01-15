import { fetchGraphQL } from "@/shared/lib/graphql-client";

export const DireccionAdministrativaService = {
  // --- MUTATIONS ---

  /** Crea una nueva dirección administrativa vinculada a una entidad */
  create: async (description: string, entidadId: number) => {
    const mutation = `
      mutation CreateDireccion($description: String!, $entidadId: Int!) {
        createDireccionAdministrativa(description: $description, entidadId: $entidadId) {
          success
          message
          data {
            id
            description
            entidad { id sigla codigo }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { description, entidadId });
  },

  /** Actualiza la descripción de una dirección administrativa */
  update: async (id: number, description: string) => {
    const mutation = `
      mutation UpdateDireccion($id: ID!, $description: String!) {
        updateDireccionAdministrativa(id: $id, description: $description) {
          success
          message
          data {
            id
            description
            entidad { id sigla codigo }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, description });
  },

  /** Elimina una dirección administrativa por su ID */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteDireccion($id: ID!) {
        deleteDireccionAdministrativa(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Lista todas las direcciones administrativas */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListDirecciones($limit: Int, $offset: Int) {
        getDireccionesAdministrativas(limit: $limit, offset: $offset) {
          count
          results {
            id
            description
            entidad { id codigo sigla }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca direcciones por texto (ej: "Recursos") */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchDirecciones($search: String!, $limit: Int) {
        searchDireccionesAdministrativas(search: $search, limit: $limit) {
          count
          results {
            id
            description
            entidad { id sigla }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  },

  /** Filtra direcciones por una entidad específica */
  filterByEntidad: async (entidadId: number, limit = 100) => {
    const query = `
      query FilterByEntidad($entidadId: Int!, $limit: Int) {
        filterDireccionesAdministrativas(entidadId: $entidadId, limit: $limit) {
          count
          results {
            id
            description
            entidad { id codigo sigla }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { entidadId, limit });
  },

  /** Obtiene la lista ordenada (ej: "-id") */
  getOrdered: async (orderBy: string, limit = 100) => {
    const query = `
      query GetOrdered($orderBy: String, $limit: Int) {
        getDireccionesAdministrativasOrdenadas(orderBy: $orderBy, limit: $limit) {
          count
          results {
            id
            description
            entidad { sigla }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { orderBy, limit });
  },

  /** Utilidades de conteo y existencia */
  utils: {
    count: () => fetchGraphQL<any>(`query { countDireccionesAdministrativas }`),
    exists: (id: number) =>
      fetchGraphQL<any>(
        `query Exists($id: ID!) { existsDireccionAdministrativa(id: $id) }`,
        { id }
      ),
  },
};

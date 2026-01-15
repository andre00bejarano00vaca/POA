import { fetchGraphQL } from "@/shared/lib/graphql-client";

export const EntidadService = {
  // --- MUTATIONS ---

  /** Crea una nueva entidad (ej: UAGRM, Facultad, etc.) */
  create: async (
    codigo: number,
    sigla: string,
    activo: number = 1,
    estado: number = 1
  ) => {
    const mutation = `
      mutation CreateEntidad($codigo: Int!, $sigla: String!, $activo: Int, $estado: Int) {
        createEntidad(codigo: $codigo, sigla: $sigla, activo: $activo, estado: $estado) {
          success
          message
          data {
            id
            codigo
            sigla
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { codigo, sigla, activo, estado });
  },

  /** Actualiza los datos básicos de una entidad */
  update: async (id: number, sigla: string, activo: number) => {
    const mutation = `
      mutation UpdateEntidad($id: ID!, $sigla: String!, $activo: Int!) {
        updateEntidad(id: $id, sigla: $sigla, activo: $activo) {
          success
          message
          data {
            id
            codigo
            sigla
            activo
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, sigla, activo });
  },

  /** Elimina una entidad (usualmente un borrado lógico/soft delete) */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteEntidad($id: ID!) {
        deleteEntidad(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene una entidad específica por su ID */
  getById: async (id: number) => {
    const query = `
      query GetEntidad($id: ID!) {
        getEntidad(id: $id) {
          success
          message
          data {
            id
            codigo
            sigla
            activo
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todas las entidades con soporte para paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListEntidades($limit: Int, $offset: Int) {
        listEntidades(limit: $limit, offset: $offset) {
          count
          results {
            id
            codigo
            sigla
            activo
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca entidades por sigla o código */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchEntidades($search: String!, $limit: Int) {
        searchEntidades(search: $search, limit: $limit) {
          count
          results {
            id
            codigo
            sigla
          }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  },

  /** Filtra entidades por su estado de actividad */
  filterByStatus: async (activo: number, limit = 100) => {
    const query = `
      query FilterEntidades($activo: Int!, $limit: Int) {
        filterEntidadesPorEstado(activo: $activo, limit: $limit) {
          count
          results {
            id
            codigo
            sigla
            activo
          }
        }
      }`;
    return fetchGraphQL<any>(query, { activo, limit });
  },

  /** Obtiene la lista ordenada (ej: "codigo" o "-sigla") */
  getOrdered: async (orderBy: string, limit = 100) => {
    const query = `
      query GetOrdered($orderBy: String, $limit: Int) {
        getEntidadesOrdenadas(orderBy: $orderBy, limit: $limit) {
          count
          results {
            id
            codigo
            sigla
          }
        }
      }`;
    return fetchGraphQL<any>(query, { orderBy, limit });
  },

  /** Utilidades de conteo y validación */
  utils: {
    count: () => fetchGraphQL<any>(`query { countEntidades }`),
    exists: (id: number) =>
      fetchGraphQL<any>(`query Exists($id: ID!) { existsEntidad(id: $id) }`, {
        id,
      }),
  },
};

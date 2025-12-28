import { fetchGraphQL } from '@/lib/graphql-client';

export const EntidadTransferenciaService = {
  // --- MUTATIONS ---

  /** Crea una nueva entidad de transferencia vinculada a un rubro */
  create: async (codigo: number, description: string, rubroId: number) => {
    const mutation = `
      mutation CreateEntidadTransferencia($codigo: Int!, $description: String!, $rubroId: Int!) {
        createEntidadTransferencia(
          codigo: $codigo
          description: $description
          rubroIdRubroId: $rubroId
        ) {
          success
          message
          data {
            id
            codigo
            description
            rubro {
              id
              description
            }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { codigo, description, rubroId });
  },

  /** Actualiza la descripción de una entidad de transferencia */
  update: async (id: number, description: string) => {
    const mutation = `
      mutation UpdateEntidadTransferencia($id: ID!, $description: String!) {
        updateEntidadTransferencia(id: $id, description: $description) {
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

  /** Elimina una entidad de transferencia */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteEntidadTransferencia($id: ID!) {
        deleteEntidadTransferencia(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene una entidad de transferencia por ID incluyendo datos del rubro */
  getById: async (id: number) => {
    const query = `
      query GetEntidadTransferencia($id: ID!) {
        getEntidadTransferencia(id: $id) {
          success
          message
          data {
            id
            codigo
            description
            rubro {
              id
              description
              importeDouble
            }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todas las entidades de transferencia con paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListEntidadesTransferencia($limit: Int, $offset: Int) {
        listEntidadesTransferencia(limit: $limit, offset: $offset) {
          count
          results {
            id
            codigo
            description
            rubro {
              description
            }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca entidades de transferencia por coincidencia de texto */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchEntidadesTransferencia($search: String!, $limit: Int) {
        searchEntidadesTransferencia(search: $search, limit: $limit) {
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

  /** Filtra entidades de transferencia por un rubro específico */
  filterByRubro: async (rubroId: number, limit = 100) => {
    const query = `
      query FilterByRubro($rubroId: Int!, $limit: Int) {
        filterEntidadTransferenciaPorRubro(rubroId: $rubroId, limit: $limit) {
          count
          results {
            id
            codigo
            description
          }
        }
      }`;
    return fetchGraphQL<any>(query, { rubroId, limit });
  },

  /** Utilidades de conteo y validación */
  utils: {
    count: () => fetchGraphQL<any>(`query { countEntidadesTransferencia }`),
    exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsEntidadTransferencia(id: $id) }`, { id })
  }
};
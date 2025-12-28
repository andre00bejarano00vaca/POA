import { fetchGraphQL } from '@/lib/graphql-client';

export const RecaudacionService = {
  // --- MUTATIONS ---

  /** Crea un nuevo registro de recaudación */
  create: async (variables: {
    description: string;
    codOec: string;
    nBienes: number;
    costoUServicio: number;
    totalDouble: number;
    idRubro: number;
  }) => {
    const mutation = `
      mutation CreateRecaudacion($desc: String!, $cod: String!, $n: Int!, $costo: Float!, $total: Float!, $rubroId: Int!) {
        createRecaudacion(
          description: $desc
          codOec: $cod
          nBienes: $n
          costoUServicio: $costo
          totalDouble: $total
          idRubro: $rubroId
        ) {
          success
          message
          data {
            id
            description
            codOec
            totalDouble
            idRubro { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, {
      desc: variables.description,
      cod: variables.codOec,
      n: variables.nBienes,
      costo: variables.costoUServicio,
      total: variables.totalDouble,
      rubroId: variables.idRubro
    });
  },

  /** Actualiza cantidad de bienes e importe total */
  update: async (id: number, nBienes: number, totalDouble: number) => {
    const mutation = `
      mutation UpdateRecaudacion($id: ID!, $n: Int!, $total: Float!) {
        updateRecaudacion(id: $id, nBienes: $n, totalDouble: $total) {
          success
          message
          data {
            id
            description
            nBienes
            totalDouble
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, n: nBienes, total: totalDouble });
  },

  /** Elimina un registro de recaudación */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteRecaudacion($id: ID!) {
        deleteRecaudacion(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene el detalle de una recaudación y su rubro asociado */
  getById: async (id: number) => {
    const query = `
      query GetRecaudacion($id: ID!) {
        getRecaudacion(id: $id) {
          success
          message
          data {
            id
            description
            codOec
            nBienes
            costoUServicio
            totalDouble
            idRubro {
              id
              description
            }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todas las recaudaciones con paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListRecaudaciones($limit: Int, $offset: Int) {
        listRecaudaciones(limit: $limit, offset: $offset) {
          count
          results {
            id
            description
            codOec
            totalDouble
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca recaudaciones por descripción o código OEC */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchRecaudaciones($search: String!, $limit: Int) {
        searchRecaudaciones(search: $search, limit: $limit) {
          count
          results {
            id
            description
            codOec
            totalDouble
          }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  },

  /** Filtra recaudaciones por un Rubro específico */
  filterByRubro: async (rubroId: number, limit = 100) => {
    const query = `
      query FilterByRubro($rubroId: Int!, $limit: Int) {
        filterRecaudacionesPorRubro(idRubroId: $rubroId, limit: $limit) {
          count
          results {
            id
            description
            totalDouble
          }
        }
      }`;
    return fetchGraphQL<any>(query, { rubroId, limit });
  }
};
// src/graphql/presupuesto/queries/recaudacion.queries.ts

export const LIST_RECAUDACIONES = `
  query ListRecaudaciones($limit: Int!, $offset: Int!) {
    listRecaudaciones(limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        codOec
        nBienes
        costoUServicio
        totalDouble
        idRubro {
          id
          description
          importeDouble
        }
      }
    }
  }
`;

export const SEARCH_RECAUDACIONES = `
  query SearchRecaudaciones($search: String!, $limit: Int!, $offset: Int!) {
    searchRecaudaciones(search: $search, limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        codOec
        nBienes
        costoUServicio
        totalDouble
        idRubro {
          id
          description
          importeDouble
        }
      }
    }
  }
`;

export const GET_RECAUDACION = `
  query GetRecaudacion($id: Int!) {
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
          importeDouble
        }
      }
    }
  }
`;

export const FILTER_RECAUDACIONES_POR_RUBRO = `
  query FilterRecaudacionesPorRubro($idRubro: Int!, $limit: Int!, $offset: Int!) {
    filterRecaudacionesPorRubro(idRubro: $idRubro, limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        codOec
        nBienes
        costoUServicio
        totalDouble
        idRubro {
          id
          description
          importeDouble
        }
      }
    }
  }
`;

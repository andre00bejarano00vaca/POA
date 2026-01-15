// src/graphql/presupuesto/queries/entidadTransferencia.queries.ts

export const LIST_ENTIDADES_TRANSFERENCIA = `
  query ListEntidadesTransferencia($limit: Int!, $offset: Int!) {
    listEntidadesTransferencia(limit: $limit, offset: $offset) {
      count
      results {
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
  }
`;

export const SEARCH_ENTIDADES_TRANSFERENCIA = `
  query SearchEntidadesTransferencia($search: String!, $limit: Int!, $offset: Int!) {
    searchEntidadesTransferencia(search: $search, limit: $limit, offset: $offset) {
      count
      results {
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
  }
`;

export const GET_ENTIDAD_TRANSFERENCIA = `
  query GetEntidadTransferencia($id: Int!) {
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
  }
`;

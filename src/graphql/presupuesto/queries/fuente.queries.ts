// src/graphql/presupuesto/queries/fuente.queries.ts

export const LIST_FUENTES = `
  query ListFuentes($limit: Int!, $offset: Int!) {
    listFuentes(limit: $limit, offset: $offset) {
      count
      results {
        id
        codigo
        description
      }
    }
  }
`;

export const SEARCH_FUENTES = `
  query SearchFuentes($search: String!, $limit: Int!, $offset: Int!) {
    searchFuentes(search: $search, limit: $limit, offset: $offset) {
      count
      results {
        id
        codigo
        description
      }
    }
  }
`;

export const GET_FUENTE = `
  query GetFuente($id: Int!) {
    getFuente(id: $id) {
      success
      message
      data {
        id
        codigo
        description
      }
    }
  }
`;

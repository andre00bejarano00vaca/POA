// src/graphql/presupuesto/queries/rubro.queries.ts

export const LIST_RUBROS = `
  query ListRubros($limit: Int!, $offset: Int!) {
    listRubros(limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        importeDouble
      }
    }
  }
`;

export const SEARCH_RUBROS = `
  query SearchRubros($search: String!, $limit: Int!, $offset: Int!) {
    searchRubros(search: $search, limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        importeDouble
      }
    }
  }
`;

export const GET_RUBRO = `
  query GetRubro($id: Int!) {
    getRubro(id: $id) {
      success
      message
      data {
        id
        description
        importeDouble
      }
    }
  }
`;

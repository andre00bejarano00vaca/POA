// src/graphql/presupuesto/queries/organismo.queries.ts

export const LIST_ORGANISMOS = `
  query ListOrganismos($limit: Int!, $offset: Int!) {
    listOrganismos(limit: $limit, offset: $offset) {
      count
      results {
        id
        codigo
        description
        fuentes {
          id
          codigo
          description
        }
      }
    }
  }
`;

export const SEARCH_ORGANISMOS = `
  query SearchOrganismos($search: String!, $limit: Int!, $offset: Int!) {
    searchOrganismos(search: $search, limit: $limit, offset: $offset) {
      count
      results {
        id
        codigo
        description
        fuentes {
          id
          codigo
          description
        }
      }
    }
  }
`;

export const GET_ORGANISMO = `
  query GetOrganismo($id: Int!) {
    getOrganismo(id: $id) {
      success
      message
      data {
        id
        codigo
        description
        fuentes {
          id
          codigo
          description
        }
      }
    }
  }
`;

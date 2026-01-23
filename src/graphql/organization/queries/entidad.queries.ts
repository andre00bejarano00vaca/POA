// src/graphql/planificacion/queries/entidad.queries.ts

export const LIST_ENTIDADES = `
  query ListEntidades($limit: Int!, $offset: Int!) {
    listEntidades(limit: $limit, offset: $offset) {
      count
      results {
        id
        codigo
        sigla
      }
    }
  }
`;

export const GET_ENTIDAD = `
  query GetEntidad($id: Int!) {
    getEntidad(id: $id) {
      success
      message
      data {
        id
        codigo
        sigla
      }
    }
  }
`;

export const SEARCH_ENTIDADES = `
  query SearchEntidades($search: String!, $limit: Int!, $offset: Int!) {
    searchEntidades(search: $search, limit: $limit, offset: $offset) {
      count
      results {
        id
        codigo
        sigla
      }
    }
  }
`;

export const FILTER_ENTIDADES = `
  query FilterEntidades($codigo: Int, $sigla: String, $limit: Int!, $offset: Int!) {
    filterEntidades(codigo: $codigo, sigla: $sigla, limit: $limit, offset: $offset) {
      count
      results {
        id
        codigo
        sigla
      }
    }
  }
`;

// src/graphql/pei/pei.queries.ts

export const LIST_PEIS = /* GraphQL */ `
  query ListPeis($limit: Int!, $offset: Int!) {
    listPeis(limit: $limit, offset: $offset) {
      count
      results {
        id
        anioIni
        anioFin
        observacion
        metaTotal
        ejecucion
      }
    }
  }
`;

export const FILTER_PEIS_POR_ANIO = /* GraphQL */ `
  query FilterPeisPorAnio($anioIni: Int!, $limit: Int!, $offset: Int!) {
    filterPeisPorAnio(anioIni: $anioIni, limit: $limit, offset: $offset) {
      count
      results {
        id
        anioIni
        anioFin
        observacion
        metaTotal
        ejecucion
      }
    }
  }
`;

export const FILTER_PEIS_POR_META = /* GraphQL */ `
  query FilterPeisPorMeta(
    $metaTotalMin: Int!
    $metaTotalMax: Int!
    $limit: Int!
    $offset: Int!
  ) {
    filterPeisPorMeta(
      metaTotalMin: $metaTotalMin
      metaTotalMax: $metaTotalMax
      limit: $limit
      offset: $offset
    ) {
      count
      results {
        id
        anioIni
        anioFin
        observacion
        metaTotal
        ejecucion
      }
    }
  }
`;

export const SEARCH_PEIS = /* GraphQL */ `
  query SearchPeis($search: String!, $limit: Int!, $offset: Int!) {
    searchPeis(search: $search, limit: $limit, offset: $offset) {
      count
      results {
        id
        anioIni
        anioFin
        observacion
        metaTotal
        ejecucion
      }
    }
  }
`;

export const GET_PEI = /* GraphQL */ `
  query GetPei($id: Int!) {
    getPei(id: $id) {
      success
      message
      data {
        id
        anioIni
        anioFin
        observacion
        metaTotal
        ejecucion
      }
    }
  }
`;

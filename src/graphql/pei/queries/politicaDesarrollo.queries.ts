// src/graphql/planificacion/queries/politicaDesarrollo.queries.ts

export const LIST_POLITICAS_DESARROLLO = `
  query ListPoliticasDesarrollo($limit: Int!, $offset: Int!) {
    listPoliticasDesarrollo(limit: $limit, offset: $offset) {
      count
      results {
        id
        idPd
        description
        areaEstrategica {
          id
          description
          pei {
            id
            anioIni
            anioFin
            ejecucion
            metaTotal
            observacion
          }
        }
      }
    }
  }
`;

export const SEARCH_POLITICAS_DESARROLLO = `
  query SearchPoliticasDesarrollo($search: String!, $limit: Int!, $offset: Int!) {
    searchPoliticasDesarrollo(search: $search, limit: $limit, offset: $offset) {
      count
      results {
        id
        idPd
        description
        areaEstrategica {
          id
          description
          pei {
            id
            anioIni
            anioFin
            ejecucion
            metaTotal
            observacion
          }
        }
      }
    }
  }
`;

export const GET_POLITICA_DESARROLLO = `
  query GetPoliticaDesarrollo($id: Int!) {
    getPoliticaDesarrollo(id: $id) {
      success
      message
      data {
        id
        idPd
        description
        areaEstrategica {
          id
          description
          pei {
            id
            anioIni
            anioFin
            ejecucion
            metaTotal
            observacion
          }
        }
      }
    }
  }
`;

export const FILTER_POLITICAS_POR_AREA = `
  query FilterPoliticasPorArea($areaEstrategicaId: Int!, $limit: Int!, $offset: Int!) {
    filterPoliticasPorArea(areaEstrategicaId: $areaEstrategicaId, limit: $limit, offset: $offset) {
      count
      results {
        id
        idPd
        description
        areaEstrategica {
          id
          description
          pei {
            id
            anioIni
            anioFin
            ejecucion
            metaTotal
            observacion
          }
        }
      }
    }
  }
`;

export const FILTER_POLITICAS_POR_ID_PD = `
  query FilterPoliticasPorIdPd($idPd: Int!) {
    filterPoliticasPorIdPd(idPd: $idPd) {
      success
      message
      data {
        id
        idPd
        description
        areaEstrategica {
          id
          description
          pei {
            id
            anioIni
            anioFin
            ejecucion
            metaTotal
            observacion
          }
        }
      }
    }
  }
`;

export const GET_POLITICAS_ORDENADAS = `
  query GetPoliticasDesarrolloOrdenadas($limit: Int!, $offset: Int!, $orderBy: String!) {
    getPoliticasDesarrolloOrdenadas(limit: $limit, offset: $offset, orderBy: $orderBy) {
      count
      results {
        id
        idPd
        description
        areaEstrategica {
          id
          description
          pei {
            id
            anioIni
            anioFin
            ejecucion
            metaTotal
            observacion
          }
        }
      }
    }
  }
`;

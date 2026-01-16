// src/graphql/pei/queries/objetivoEstrategico.queries.ts

export const LIST_OBJETIVOS_ESTRATEGICOS = `
  query ListObjetivosEstrategicosAmp($limit: Int!, $offset: Int!) {
    listObjetivosEstrategicosAmp(limit: $limit, offset: $offset) {
      count
      results {
        id
        idOe
        description
        politicaDesarrollo {
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
  }
`;

export const SEARCH_OBJETIVOS_ESTRATEGICOS = `
  query SearchObjetivosEstrategicosAmp($search: String!, $limit: Int!, $offset: Int!) {
    searchObjetivosEstrategicosAmp(search: $search, limit: $limit, offset: $offset) {
      count
      results {
        id
        idOe
        description
        politicaDesarrollo {
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
  }
`;

export const GET_OBJETIVO_ESTRATEGICO = `
  query GetObjetivoEstrategicoAmp($id: Int!) {
    getObjetivoEstrategicoAmp(id: $id) {
      success
      message
      data {
        id
        idOe
        description
        politicaDesarrollo {
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
  }
`;

export const FILTER_OBJETIVOS_POR_POLITICA = `
  query FilterObjetivosPorPolitica($politicaDesarrolloId: Int!, $limit: Int!, $offset: Int!) {
    filterObjetivosPorPolitica(politicaDesarrolloId: $politicaDesarrolloId, limit: $limit, offset: $offset) {
      count
      results {
        id
        idOe
        description
        politicaDesarrollo {
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
  }
`;

export const FILTER_OBJETIVO_POR_ID_OE = `
  query FilterObjetivoPorIdOe($idOe: Int!) {
    filterObjetivoPorIdOe(idOe: $idOe) {
      success
      message
      data {
        id
        idOe
        description
        politicaDesarrollo {
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
  }
`;

export const GET_OBJETIVOS_ORDENADOS = `
  query GetObjetivosEstrategicosAmpOrdenados($limit: Int!, $offset: Int!, $orderBy: String!) {
    getObjetivosEstrategicosAmpOrdenados(limit: $limit, offset: $offset, orderBy: $orderBy) {
      count
      results {
        id
        idOe
        description
        politicaDesarrollo {
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
  }
`;

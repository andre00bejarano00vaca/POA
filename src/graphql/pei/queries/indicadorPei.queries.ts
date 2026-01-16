// src/graphql/pei/queries/indicadorPei.queries.ts

export const LIST_INDICADORES_PEI = `
  query ListIndicadoresPei($limit: Int!, $offset: Int!) {
    listIndicadoresPei(limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        formula
        lineaBase
        meta
        unidadMedida
        objetivoEstrategico {
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
  }
`;

export const SEARCH_INDICADORES_PEI = `
  query SearchIndicadoresPei($search: String!, $limit: Int!, $offset: Int!) {
    searchIndicadoresPei(search: $search, limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        formula
        lineaBase
        meta
        unidadMedida
        objetivoEstrategico {
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
  }
`;

export const GET_INDICADOR_PEI = `
  query GetIndicadorPei($id: Int!) {
    getIndicadorPei(id: $id) {
      success
      message
      data {
        id
        description
        formula
        lineaBase
        meta
        unidadMedida
        objetivoEstrategico {
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
  }
`;

export const FILTER_INDICADORES_POR_OBJETIVO = `
  query FilterIndicadoresPorObjetivo($objetivoEstrategicoId: Int!, $limit: Int!, $offset: Int!) {
    filterIndicadoresPorObjetivo(objetivoEstrategicoId: $objetivoEstrategicoId, limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        formula
        lineaBase
        meta
        unidadMedida
        objetivoEstrategico {
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
  }
`;

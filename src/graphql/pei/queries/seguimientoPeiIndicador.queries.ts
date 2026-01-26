// src/graphql/pei/queries/seguimientoPeiIndicador.queries.ts

export const LIST_SEGUIMIENTOS_PEI_INDICADORES = `
  query ListSeguimientosPeiIndicadores($limit: Int, $offset: Int) {
    listSeguimientosPeiIndicadores(limit: $limit, offset: $offset) {
      count
      results {
        id
        comentarios
        ejecutado
        escalaValoracion
        gradoComplimiento
        programado
        metaAnual {
          id
          anio
          programado
          idIndicadorPeiImp {
            id
            description
            formula
            lineaBase
            meta
            unidadMedida
            objetivoEstrategico {
              id
              description
              idOe
            }
          }
        }
        seguimientoPeiObjetivo {
          id
          escalaValoracion
          promedioCumplimiento
          valoracionCualitativa
          objetivoEstrategico {
            id
            description
            idOe
          }
        }
      }
    }
  }
`;

export const GET_SEGUIMIENTO_PEI_INDICADOR = `
  query GetSeguimientoPeiIndicador($id: Int!) {
    getSeguimientoPeiIndicador(id: $id) {
      success
      message
      data {
        id
        comentarios
        ejecutado
        escalaValoracion
        gradoComplimiento
        programado
        metaAnual {
          id
          anio
          programado
          idIndicadorPeiImp {
            id
            description
            formula
            lineaBase
            meta
            unidadMedida
            objetivoEstrategico {
              id
              description
              idOe
            }
          }
        }
        seguimientoPeiObjetivo {
          id
          escalaValoracion
          promedioCumplimiento
          valoracionCualitativa
          objetivoEstrategico {
            id
            description
            idOe
          }
        }
      }
    }
  }
`;

export const GET_SEGUIMIENTOS_PEI_INDICADORES_ORDENADOS = `
  query GetSeguimientosPeiIndicadoresOrdenados($orderBy: String!, $limit: Int, $offset: Int) {
    getSeguimientosPeiIndicadoresOrdenados(orderBy: $orderBy, limit: $limit, offset: $offset) {
      count
      results {
        id
        comentarios
        ejecutado
        escalaValoracion
        gradoComplimiento
        programado
        metaAnual {
          id
          anio
          programado
          idIndicadorPeiImp {
            id
            description
            unidadMedida
          }
        }
        seguimientoPeiObjetivo {
          id
          promedioCumplimiento
        }
      }
    }
  }
`;

export const COUNT_SEGUIMIENTOS_PEI_INDICADORES = `
  query CountSeguimientosPeiIndicadores {
    countSeguimientosPeiIndicadores
  }
`;

export const EXISTS_SEGUIMIENTO_PEI_INDICADOR = `
  query ExistsSeguimientoPeiIndicador($id: Int!) {
    existsSeguimientoPeiIndicador(id: $id)
  }
`;

export const FILTER_INDICADORES_POR_OBJETIVO = `
  query FilterIndicadoresPorObjetivo($objetivoId: Int!, $limit: Int, $offset: Int) {
    filterIndicadoresPorObjetivo(objetivoEstrategicoId: $objetivoId, limit: $limit, offset: $offset) {
      count
      results {
        id
        comentarios
        ejecutado
        escalaValoracion
        gradoComplimiento
        programado
        metaAnual {
          id
          anio
          programado
          idIndicadorPeiImp {
            id
            description
            formula
            lineaBase
            meta
            unidadMedida
            objetivoEstrategico {
              id
              description
              idOe
            }
          }
        }
        seguimientoPeiObjetivo {
          id
          escalaValoracion
          promedioCumplimiento
          valoracionCualitativa
          objetivoEstrategico {
            id
            description
            idOe
          }
        }
      }
    }
  }
`;

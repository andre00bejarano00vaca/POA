// src/graphql/planificacion/queries/programacionMetaAnual.queries.ts

export const LIST_PROGRAMACIONES_METAS_ANUALES = `
  query ListProgramacionesMetasAnuales($limit: Int!, $offset: Int!) {
    listProgramacionesMetasAnuales(limit: $limit, offset: $offset) {
      count
      results {
        id
        anio
        programado
        ejecutado
        idIndicadorPeiImp {
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
        peiIdPei {
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
`;

export const GET_PROGRAMACION_META_ANUAL = `
  query GetProgramacionMetaAnual($id: Int!) {
    getProgramacionMetaAnual(id: $id) {
      success
      message
      data {
        id
        anio
        programado
        ejecutado
        idIndicadorPeiImp {
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
        peiIdPei {
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
`;

export const FILTER_METAS_POR_ANIO = `
  query FilterMetasPorAnio($anio: Int!, $limit: Int!, $offset: Int!) {
    filterMetasPorAnio(anio: $anio, limit: $limit, offset: $offset) {
      count
      results {
        id
        anio
        programado
        ejecutado
        idIndicadorPeiImp {
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
        peiIdPei {
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
`;

export const FILTER_METAS_POR_INDICADOR = `
  query FilterMetasPorIndicador($idIndicadorPeiImpId: Int!, $limit: Int!, $offset: Int!) {
    filterMetasPorIndicador(idIndicadorPeiImpId: $idIndicadorPeiImpId, limit: $limit, offset: $offset) {
      count
      results {
        id
        anio
        programado
        ejecutado
        idIndicadorPeiImp {
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
        peiIdPei {
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
`;

export const FILTER_METAS_POR_PEI = `
  query FilterMetasPorPei($peiIdPeiId: Int!, $limit: Int!, $offset: Int!) {
    filterMetasPorPei(peiIdPeiId: $peiIdPeiId, limit: $limit, offset: $offset) {
      count
      results {
        id
        anio
        programado
        ejecutado
        idIndicadorPeiImp {
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
        peiIdPei {
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
`;

export const GET_PROGRAMACIONES_METAS_ANUALES_ORDENADAS = `
  query GetProgramacionesMetasAnualesOrdenadas($limit: Int!, $offset: Int!, $orderBy: String!) {
    getProgramacionesMetasAnualesOrdenadas(limit: $limit, offset: $offset, orderBy: $orderBy) {
      count
      results {
        id
        anio
        programado
        ejecutado
        idIndicadorPeiImp {
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
        peiIdPei {
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
`;

export const COUNT_PROGRAMACIONES_METAS_ANUALES = `
  query CountProgramacionesMetasAnuales {
    countProgramacionesMetasAnuales
  }
`;

export const EXISTS_PROGRAMACION_META_ANUAL = `
  query ExistsProgramacionMetaAnual($id: Int!) {
    existsProgramacionMetaAnual(id: $id)
  }
`;

// src/graphql/seguimiento/queries/seguimientoPeiIndicador.queries.ts

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
        procesoAnualMeta {
          id
          anio
          ejecutado
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
              politicaDesarrollo {
                id
                description
                idPd
                areaEstrategica {
                  id
                  description
                  pei {
                    id
                    anioFin
                    anioIni
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
            anioFin
            anioIni
            ejecucion
            metaTotal
            observacion
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
            politicaDesarrollo {
              id
              description
              idPd
              areaEstrategica {
                id
                description
                pei {
                  id
                  anioFin
                  anioIni
                  ejecucion
                  metaTotal
                  observacion
                }
              }
            }
          }
          seguimientoPei {
            id
            anio
            fechaRegistro
            observaciones
            porcAlta
            porcBaja
            porcMedia
            promediaGeneral
            valoracionGlobal
            pei {
              id
              anioFin
              anioIni
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

export const GET_SEGUIMIENTO_PEI_INDICADOR = `
  query GetSeguimientoPeiIndicador($id: Int!) {
    getSeguimientoPeiIndicador(id: $id) {
      success
      message
      data {
        id
        comentarios
        ejecutado
        gradoComplimiento
        escalaValoracion
        programado
        procesoAnualMeta {
          id
          anio
          ejecutado
          programado
          idIndicadorPeiImp {
            id
            description
            formula
            meta
            unidadMedida
            lineaBase
            objetivoEstrategico {
              id
              description
              idOe
              politicaDesarrollo {
                id
                description
                idPd
                areaEstrategica {
                  id
                  description
                  pei {
                    id
                    anioFin
                    anioIni
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
            anioFin
            anioIni
            ejecucion
            metaTotal
            observacion
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
            politicaDesarrollo {
              id
              description
              idPd
              areaEstrategica {
                id
                description
                pei {
                  id
                  anioFin
                  anioIni
                  ejecucion
                  metaTotal
                  observacion
                }
              }
            }
          }
          seguimientoPei {
            id
            anio
            fechaRegistro
            observaciones
            porcAlta
            porcBaja
            porcMedia
            promediaGeneral
            valoracionGlobal
            pei {
              id
              anioFin
              anioIni
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

export const GET_SEGUIMIENTOS_PEI_INDICADORES_ORDENADOS = `
  query GetSeguimientosPeiIndicadoresOrdenados($limit: Int, $offset: Int, $orderBy: String!) {
    getSeguimientosPeiIndicadoresOrdenados(limit: $limit, offset: $offset, orderBy: $orderBy) {
      count
      results {
        id
        ejecutado
        comentarios
        escalaValoracion
        gradoComplimiento
        programado
        seguimientoPeiObjetivo {
          id
          escalaValoracion
          promedioCumplimiento
          valoracionCualitativa
          objetivoEstrategico {
            id
            description
            idOe
            politicaDesarrollo {
              id
              description
              idPd
              areaEstrategica {
                id
                description
                pei {
                  id
                  anioFin
                  anioIni
                  ejecucion
                  metaTotal
                  observacion
                }
              }
            }
          }
          seguimientoPei {
            id
            anio
            fechaRegistro
            observaciones
            porcAlta
            porcBaja
            porcMedia
            promediaGeneral
            valoracionGlobal
            pei {
              id
              anioFin
              anioIni
              ejecucion
              metaTotal
              observacion
            }
          }
        }
        procesoAnualMeta {
          id
          anio
          ejecutado
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
              politicaDesarrollo {
                id
                idPd
                description
                areaEstrategica {
                  id
                  description
                  pei {
                    id
                    anioFin
                    anioIni
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
    filterIndicadoresPorObjetivo(objetivoId: $objetivoId, limit: $limit, offset: $offset) {
      count
      results {
        id
        comentarios
        ejecutado
        escalaValoracion
        gradoComplimiento
        programado
        procesoAnualMeta {
          id
          anio
          ejecutado
          programado
          idIndicadorPeiImp {
            id
            description
            formula
            meta
            unidadMedida
          }
        }
        seguimientoPeiObjetivo {
          id
          escalaValoracion
          promedioCumplimiento
          valoracionCualitativa
        }
      }
    }
  }
`;

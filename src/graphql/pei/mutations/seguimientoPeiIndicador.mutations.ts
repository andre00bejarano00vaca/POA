// src/graphql/seguimiento/mutations/seguimientoPeiIndicador.mutations.ts

export const CREATE_SEGUIMIENTO_PEI_INDICADOR = `
  mutation CreateSeguimientoPeiIndicador(
    $ejecutado: Float!,
    $escalaValoracion: String!,
    $gradoComplimiento: Float!,
    $procesoAnualMetaId: Int!,
    $programado: Float!,
    $seguimientoPeiObjetivoId: Int!,
    $comentarios: String
  ) {
    createSeguimientoPeiIndicador(
      ejecutado: $ejecutado,
      escalaValoracion: $escalaValoracion,
      gradoComplimiento: $gradoComplimiento,
      procesoAnualMetaId: $procesoAnualMetaId,
      programado: $programado,
      seguimientoPeiObjetivoId: $seguimientoPeiObjetivoId,
      comentarios: $comentarios
    ) {
      success
      message
      data {
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
              description
              idPd
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

export const UPDATE_SEGUIMIENTO_PEI_INDICADOR = `
  mutation UpdateSeguimientoPeiIndicador(
    $id: Int!,
    $comentarios: String,
    $ejecutado: Float,
    $escalaValoracion: String,
    $gradoComplimiento: Float,
    $procesoAnualMetaId: Int,
    $programado: Float,
    $seguimientoPeiObjetivoId: Int
  ) {
    updateSeguimientoPeiIndicador(
      id: $id,
      comentarios: $comentarios,
      ejecutado: $ejecutado,
      escalaValoracion: $escalaValoracion,
      gradoComplimiento: $gradoComplimiento,
      procesoAnualMetaId: $procesoAnualMetaId,
      programado: $programado,
      seguimientoPeiObjetivoId: $seguimientoPeiObjetivoId
    ) {
      success
      message
      data {
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
                    ejecucion
                    metaTotal
                    observacion
                    anioIni
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
                  anioIni
                  anioFin
                  ejecucion
                  metaTotal
                  observacion
                }
              }
            }
          }
          valoracionCualitativa
          seguimientoPei {
            id
            anio
            fechaRegistro
            porcAlta
            porcMedia
            porcBaja
            promediaGeneral
            valoracionGlobal
            observaciones
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

export const DELETE_SEGUIMIENTO_PEI_INDICADOR = `
  mutation DeleteSeguimientoPeiIndicador($id: Int!) {
    deleteSeguimientoPeiIndicador(id: $id) {
      success
      message
      data
    }
  }
`;

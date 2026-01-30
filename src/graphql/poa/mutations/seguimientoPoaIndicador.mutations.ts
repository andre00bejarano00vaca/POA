// src/graphql/poa/mutations/seguimientoPoaIndicador.mutations.ts

export const UPDATE_SEGUIMIENTO_POA_INDICADOR = `
  mutation UpdateSeguimientoPoaIndicador(
    $id: Int!
    $comentarios: String
    $ejecutado: Int
  ) {
    updateSeguimientoPoaIndicador(
      id: $id
      comentarios: $comentarios
      ejecutado: $ejecutado
    ) {
      message
      success
      data {
        comentarios
        ejecutado
        escalaValoracion
        gradoCumplimiento
        id
        programado
        programacionTrimestral {
          id
          programado
          trimestre
          indicadorPoa {
            description
            unidadMedida
            meta
            lineaBase
            formula
            id
          }
        }
        seguimientoPoaActividad {
          id
          promedioCumplimiento
          valoracionCualitativa
          seguimientoPoa {
            fechaRegistro
            id
            observaciones
            poa {
              anio
              id
              fechaRegistro
              unidadEjecutora {
                description
                direccionAdministrativa {
                  description
                  id
                  entidad {
                    activo
                    codigo
                    id
                    sigla
                  }
                }
                id
                techoPres
              }
            }
            valoracionGlobal
            trimestre
            promedioGeneral
            porcMedia
            porcBaja
            porcAlta
          }
        }
      }
    }
  }
`;

export const ACTUALIZAR_EJECUTADO_INDICADOR_POA = `
  mutation ActualizarEjecutadoIndicadorPoa(
    $ejecutado: Int!
    $seguimientoIndicadorId: Int!
    $comentarios: String
  ) {
    actualizarEjecutadoIndicadorPoa(
      ejecutado: $ejecutado
      seguimientoIndicadorId: $seguimientoIndicadorId
      comentarios: $comentarios
    ) {
      message
      success
      data {
        comentarios
        ejecutado
        escalaValoracion
        gradoCumplimiento
        id
        programado
        programacionTrimestral {
          id
          indicadorPoa {
            description
            formula
            lineaBase
            meta
            id
            unidadMedida
            actividad {
              categProgramatica
              causasDesv
              clase
              description
              docVerif
              fechaFinal
              fechaIni
              tipo
              id
              accionCortoPlazo {
                description
                id
                programa {
                  description
                  id
                  poa {
                    anio
                    fechaRegistro
                    id
                    unidadEjecutora {
                      description
                      id
                      techoPres
                      direccionAdministrativa {
                        description
                        id
                        entidad {
                          activo
                          codigo
                          id
                          sigla
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          programado
          trimestre
        }
        seguimientoPoaActividad {
          promedioCumplimiento
          id
          escalaValoracion
          seguimientoPoa {
            fechaRegistro
            id
            observaciones
            valoracionGlobal
            trimestre
            promedioGeneral
            porcMedia
            porcBaja
            porcAlta
            poa {
              anio
              fechaRegistro
              id
              unidadEjecutora {
                description
                id
                techoPres
                direccionAdministrativa {
                  description
                  id
                  entidad {
                    codigo
                    activo
                    id
                    sigla
                  }
                }
              }
            }
          }
          valoracionCualitativa
          actividad {
            categProgramatica
            tipo
            id
            fechaIni
            fechaFinal
            docVerif
            description
            clase
            causasDesv
            accionCortoPlazo {
              id
              description
              programa {
                description
                id
                poa {
                  anio
                  fechaRegistro
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

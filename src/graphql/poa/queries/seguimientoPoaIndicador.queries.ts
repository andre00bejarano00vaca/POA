// src/graphql/poa/queries/seguimientoPoaIndicador.queries.ts

export const LIST_SEGUIMIENTOS_POA_INDICADOR = `
  query ListSeguimientosPoaIndicador($limit: Int, $offset: Int) {
    listSeguimientosPoaIndicador(limit: $limit, offset: $offset) {
      count
      results {
        comentarios
        ejecutado
        escalaValoracion
        gradoCumplimiento
        id
        programado
        programacionTrimestral {
          id
          trimestre
          programado
          indicadorPoa {
            formula
            description
            id
            lineaBase
            meta
            unidadMedida
            actividad {
              causasDesv
              tipo
              id
              fechaIni
              fechaFinal
              docVerif
              description
              clase
              categProgramatica
              accionCortoPlazo {
                description
                id
                programa {
                  id
                  description
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
                          sigla
                          id
                          codigo
                          activo
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        seguimientoPoaActividad {
          escalaValoracion
          id
          promedioCumplimiento
          valoracionCualitativa
          actividad {
            tipo
            id
            fechaIni
            fechaFinal
            docVerif
            description
            clase
            causasDesv
            categProgramatica
            accionCortoPlazo {
              description
              id
              programa {
                id
                description
                poa {
                  anio
                  fechaRegistro
                  id
                  unidadEjecutora {
                    description
                    techoPres
                    id
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
          seguimientoPoa {
            id
            fechaRegistro
            valoracionGlobal
            trimestre
            promedioGeneral
            porcMedia
            porcBaja
            porcAlta
            poa {
              id
              fechaRegistro
              anio
              unidadEjecutora {
                id
                techoPres
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
              }
            }
            observaciones
          }
        }
      }
    }
  }
`;

export const GET_SEGUIMIENTO_POA_INDICADOR = `
  query GetSeguimientoPoaIndicador($id: Int!) {
    getSeguimientoPoaIndicador(id: $id) {
      data {
        comentarios
        ejecutado
        escalaValoracion
        programado
        id
        gradoCumplimiento
        seguimientoPoaActividad {
          valoracionCualitativa
          id
          escalaValoracion
          promedioCumplimiento
          actividad {
            categProgramatica
            causasDesv
            clase
            docVerif
            fechaIni
            id
            tipo
            fechaFinal
            description
            accionCortoPlazo {
              description
              programa {
                id
                description
                poa {
                  id
                  fechaRegistro
                  anio
                  unidadEjecutora {
                    techoPres
                    id
                    direccionAdministrativa {
                      description
                      id
                      entidad {
                        activo
                        sigla
                        id
                        codigo
                      }
                    }
                    description
                  }
                }
              }
              id
            }
          }
        }
        programacionTrimestral {
          trimestre
          programado
          indicadorPoa {
            actividad {
              accionCortoPlazo {
                description
                id
                programa {
                  description
                  id
                  poa {
                    fechaRegistro
                    anio
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
              categProgramatica
              causasDesv
              clase
              description
              docVerif
              fechaFinal
              fechaIni
              tipo
              id
            }
            formula
            id
            lineaBase
            unidadMedida
            description
            meta
          }
          id
        }
      }
      success
      message
    }
  }
`;

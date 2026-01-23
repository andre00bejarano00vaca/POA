// src/graphql/poa/queries/programacionTrimestralMeta.queries.ts

export const LIST_PROGRAMACIONES_TRIMESTRALES_META_POA = `
  query ListProgramacionesTrimestralesMetaPoa($limit: Int!, $offset: Int!) {
    listProgramacionesTrimestralesMetaPoa(limit: $limit, offset: $offset) {
      count
      results {
        id
        trimestre
        programado
        ejecutado
        indicadorPoa {
          id
          description
          formula
          lineaBase
          meta
          unidadMedida
          actividad {
            id
            description
            tipo
            clase
            categProgramatica
            fechaIni
            fechaFinal
            docVerif
            causasDesv
            accionCortoPlazo {
              id
              description
              programa {
                id
                description
                poa {
                  id
                  anio
                  fechaRegistro
                  unidadEjecutora {
                    id
                    description
                    techoPres
                    direccionAdministrativa {
                      id
                      description
                      entidad {
                        id
                        codigo
                        sigla
                      }
                    }
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

export const GET_PROGRAMACION_TRIMESTRAL_META_POA = `
  query GetProgramacionTrimestralMetaPoa($id: Int!) {
    getProgramacionTrimestralMetaPoa(id: $id) {
      success
      message
      data {
        id
        trimestre
        programado
        ejecutado
        indicadorPoa {
          id
          description
          formula
          lineaBase
          meta
          unidadMedida
          actividad {
            id
            description
            tipo
            clase
            categProgramatica
            fechaIni
            fechaFinal
            docVerif
            causasDesv
            accionCortoPlazo {
              id
              description
              programa {
                id
                description
                poa {
                  id
                  anio
                  fechaRegistro
                  unidadEjecutora {
                    id
                    description
                    techoPres
                    direccionAdministrativa {
                      id
                      description
                      entidad {
                        id
                        codigo
                        sigla
                      }
                    }
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

export const FILTER_PROGRAMACIONES_POR_TRIMESTRE = `
  query FilterProgramacionesPorTrimestre($trimestre: Int!, $limit: Int!, $offset: Int!) {
    filterProgramacionesPorTrimestre(trimestre: $trimestre, limit: $limit, offset: $offset) {
      count
      results {
        id
        trimestre
        programado
        ejecutado
        indicadorPoa {
          id
          description
          formula
          lineaBase
          meta
          unidadMedida
          actividad {
            id
            description
            tipo
            clase
            categProgramatica
            fechaIni
            fechaFinal
            docVerif
            causasDesv
            accionCortoPlazo {
              id
              description
              programa {
                id
                description
                poa {
                  id
                  anio
                  fechaRegistro
                  unidadEjecutora {
                    id
                    description
                    techoPres
                    direccionAdministrativa {
                      id
                      description
                      entidad {
                        id
                        codigo
                        sigla
                      }
                    }
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

export const GET_PROGRAMACIONES_TRIMESTRALES_META_POA_ORDENADAS = `
  query GetProgramacionesTrimestralesMetaPoaOrdenadas($limit: Int!, $offset: Int!, $orderBy: String!) {
    getProgramacionesTrimestralesMetaPoaOrdenadas(limit: $limit, offset: $offset, orderBy: $orderBy) {
      count
      results {
        id
        trimestre
        programado
        ejecutado
        indicadorPoa {
          id
          description
          formula
          lineaBase
          meta
          unidadMedida
          actividad {
            id
            description
            tipo
            clase
            categProgramatica
            fechaIni
            fechaFinal
            docVerif
            causasDesv
            accionCortoPlazo {
              id
              description
              programa {
                id
                description
                poa {
                  id
                  anio
                  fechaRegistro
                  unidadEjecutora {
                    id
                    description
                    techoPres
                    direccionAdministrativa {
                      id
                      description
                      entidad {
                        id
                        codigo
                        sigla
                      }
                    }
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

export const COUNT_PROGRAMACIONES_TRIMESTRALES_META_POA = `
  query CountProgramacionesTrimestralesMetaPoa {
    countProgramacionesTrimestralesMetaPoa
  }
`;

export const EXISTS_PROGRAMACION_TRIMESTRAL_META_POA = `
  query ExistsProgramacionTrimestralMetaPoa($id: Int!) {
    existsProgramacionTrimestralMetaPoa(id: $id)
  }
`;

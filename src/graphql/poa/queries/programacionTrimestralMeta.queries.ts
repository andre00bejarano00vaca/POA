// src/graphql/poa/queries/programacionTrimestral.queries.ts

export const LIST_PROGRAMACIONES_TRIMESTRAL_META_POA = `
  query ListProgramacionesTrimestralMetaPoa($limit: Int, $offset: Int) {
    listProgramacionesTrimestralMetaPoa(limit: $limit, offset: $offset) {
      count
      results {
        id
        programado
        trimestre
        indicadorPoa {
          actividad {
            accionCortoPlazo {
              description
              id
              programa {
                description
                id
                poa {
                  anio
                  fechaRegistro
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
                  id
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
            id
            tipo
          }
          description
          formula
          id
          lineaBase
          meta
          unidadMedida
        }
      }
    }
  }
`;

export const GET_PROGRAMACION_TRIMESTRAL_META_POA = `
  query GetProgramacionTrimestralMetaPoa($id: Int!) {
    getProgramacionTrimestralMetaPoa(id: $id) {
      data {
        id
        trimestre
        programado
        indicadorPoa {
          unidadMedida
          meta
          lineaBase
          id
          formula
          description
          actividad {
            id
            tipo
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
      }
      success
      message
    }
  }
`;

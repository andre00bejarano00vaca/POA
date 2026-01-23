// src/graphql/poa/mutations/programacionTrimestralMeta.mutations.ts

export const CREATE_PROGRAMACION_TRIMESTRAL_META_POA = `
  mutation CreateProgramacionTrimestralMetaPoa(
    $trimestre: Int!
    $programado: Int!
    $ejecutado: Int!
    $indicadorPoaId: Int!
  ) {
    createProgramacionTrimestralMetaPoa(
      trimestre: $trimestre
      programado: $programado
      ejecutado: $ejecutado
      indicadorPoaId: $indicadorPoaId
    ) {
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

export const UPDATE_PROGRAMACION_TRIMESTRAL_META_POA = `
  mutation UpdateProgramacionTrimestralMetaPoa(
    $id: Int!
    $trimestre: Int
    $programado: Int
    $ejecutado: Int
    $indicadorPoaId: Int
  ) {
    updateProgramacionTrimestralMetaPoa(
      id: $id
      trimestre: $trimestre
      programado: $programado
      ejecutado: $ejecutado
      indicadorPoaId: $indicadorPoaId
    ) {
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

export const DELETE_PROGRAMACION_TRIMESTRAL_META_POA = `
  mutation DeleteProgramacionTrimestralMetaPoa($id: Int!) {
    deleteProgramacionTrimestralMetaPoa(id: $id) {
      success
      message
      data
    }
  }
`;

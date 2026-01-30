// src/graphql/poa/mutations/programacionTrimestral.mutations.ts

export const UPDATE_PROGRAMACION_TRIMESTRAL_META_POA = `
  mutation UpdateProgramacionTrimestralMetaPoa($id: Int!, $programado: Int!) {
    updateProgramacionTrimestralMetaPoa(id: $id, programado: $programado) {
      success
      message
      data {
        id
        programado
        trimestre
        indicadorPoa {
          description
          formula
          id
          lineaBase
          meta
          unidadMedida
          actividad {
            categProgramatica
            causasDesv
            tipo
            id
            fechaIni
            fechaFinal
            docVerif
            description
            clase
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
    }
  }
`;

export const DELETE_PROGRAMACION_TRIMESTRAL_META_POA = `
  mutation DeleteProgramacionTrimestralMetaPoa($id: Int!) {
    deleteProgramacionTrimestralMetaPoa(id: $id) {
      data
      message
      success
    }
  }
`;

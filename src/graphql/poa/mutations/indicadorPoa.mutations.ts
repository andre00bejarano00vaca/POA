// src/graphql/poa/mutations/indicadorPoa.mutations.ts

export const CREATE_INDICADOR_POA = `
  mutation CreateIndicadorPoa(
    $description: String!
    $formula: String!
    $lineaBase: Int!
    $meta: Int!
    $unidadMedida: String!
    $actividadId: Int!
  ) {
    createIndicadorPoa(
      description: $description
      formula: $formula
      lineaBase: $lineaBase
      meta: $meta
      unidadMedida: $unidadMedida
      actividadId: $actividadId
    ) {
      success
      message
      data {
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
`;

export const UPDATE_INDICADOR_POA = `
  mutation UpdateIndicadorPoa(
    $id: Int!
    $description: String
    $formula: String
    $lineaBase: Int
    $meta: Int
    $unidadMedida: String
    $actividadId: Int
  ) {
    updateIndicadorPoa(
      id: $id
      description: $description
      formula: $formula
      lineaBase: $lineaBase
      meta: $meta
      unidadMedida: $unidadMedida
      actividadId: $actividadId
    ) {
      success
      message
      data {
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
`;

export const DELETE_INDICADOR_POA = `
  mutation DeleteIndicadorPoa($id: Int!) {
    deleteIndicadorPoa(id: $id) {
      success
      message
      data
    }
  }
`;

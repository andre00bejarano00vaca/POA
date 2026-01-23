// src/graphql/poa/mutations/actividad.mutations.ts

export const CREATE_ACTIVIDAD = `
  mutation CreateActividad(
    $description: String!
    $tipo: String!
    $clase: String!
    $categProgramatica: String!
    $fechaIni: Date!
    $fechaFinal: Date!
    $docVerif: Int!
    $causasDesv: String!
    $accionCortoPlazoId: Int!
  ) {
    createActividad(
      description: $description
      tipo: $tipo
      clase: $clase
      categProgramatica: $categProgramatica
      fechaIni: $fechaIni
      fechaFinal: $fechaFinal
      docVerif: $docVerif
      causasDesv: $causasDesv
      accionCortoPlazoId: $accionCortoPlazoId
    ) {
      success
      message
      data {
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
`;

export const UPDATE_ACTIVIDAD = `
  mutation UpdateActividad(
    $id: Int!
    $description: String
    $tipo: String
    $clase: String
    $categProgramatica: String
    $fechaIni: Date
    $fechaFinal: Date
    $docVerif: Int
    $causasDesv: String
    $accionCortoPlazoId: Int
  ) {
    updateActividad(
      id: $id
      description: $description
      tipo: $tipo
      clase: $clase
      categProgramatica: $categProgramatica
      fechaIni: $fechaIni
      fechaFinal: $fechaFinal
      docVerif: $docVerif
      causasDesv: $causasDesv
      accionCortoPlazoId: $accionCortoPlazoId
    ) {
      success
      message
      data {
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
`;

export const DELETE_ACTIVIDAD = `
  mutation DeleteActividad($id: Int!) {
    deleteActividad(id: $id) {
      success
      message
      data
    }
  }
`;

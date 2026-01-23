// src/graphql/poa/mutations/accionCortoPlazo.mutations.ts

export const CREATE_ACCION_CORTO_PLAZO = `
  mutation CreateAccionCortoPlazo(
    $description: String!
    $programaId: Int!
  ) {
    createAccionCortoPlazo(
      description: $description
      programaId: $programaId
    ) {
      success
      message
      data {
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
`;

export const UPDATE_ACCION_CORTO_PLAZO = `
  mutation UpdateAccionCortoPlazo(
    $id: Int!
    $description: String
    $programaId: Int
  ) {
    updateAccionCortoPlazo(
      id: $id
      description: $description
      programaId: $programaId
    ) {
      success
      message
      data {
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
`;

export const DELETE_ACCION_CORTO_PLAZO = `
  mutation DeleteAccionCortoPlazo($id: Int!) {
    deleteAccionCortoPlazo(id: $id) {
      success
      message
      data
    }
  }
`;

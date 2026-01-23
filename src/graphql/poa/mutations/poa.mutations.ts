// src/graphql/poa/mutations/poa.mutations.ts

export const CREATE_POA = `
  mutation CreatePoa(
    $anio: Int!
    $fechaRegistro: Date!
    $unidadEjecutoraId: Int!
  ) {
    createPoa(
      anio: $anio
      fechaRegistro: $fechaRegistro
      unidadEjecutoraId: $unidadEjecutoraId
    ) {
      success
      message
      data {
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
`;

export const UPDATE_POA = `
  mutation UpdatePoa(
    $id: Int!
    $anio: Int
    $fechaRegistro: Date
    $unidadEjecutoraId: Int
  ) {
    updatePoa(
      id: $id
      anio: $anio
      fechaRegistro: $fechaRegistro
      unidadEjecutoraId: $unidadEjecutoraId
    ) {
      success
      message
      data {
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
`;

export const DELETE_POA = `
  mutation DeletePoa($id: Int!) {
    deletePoa(id: $id) {
      success
      message
      data
    }
  }
`;

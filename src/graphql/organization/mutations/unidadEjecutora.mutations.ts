// src/graphql/planificacion/mutations/unidadEjecutora.mutations.ts

export const CREATE_UNIDAD_EJECUTORA = `
  mutation CreateUnidadEjecutora(
    $description: String!
    $direccionAdministrativaId: Int!
    $techoPres: Float!
  ) {
    createUnidadEjecutora(
      description: $description
      direccionAdministrativaId: $direccionAdministrativaId
      techoPres: $techoPres
    ) {
      success
      message
      data {
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
`;

export const UPDATE_UNIDAD_EJECUTORA = `
  mutation UpdateUnidadEjecutora(
    $id: Int!
    $description: String
    $techoPres: Float
  ) {
    updateUnidadEjecutora(
      id: $id
      description: $description
      techoPres: $techoPres
    ) {
      success
      message
      data {
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
`;

export const DELETE_UNIDAD_EJECUTORA = `
  mutation DeleteUnidadEjecutora($id: Int!) {
    deleteUnidadEjecutora(id: $id) {
      success
      message
      data
    }
  }
`;

// src/graphql/planificacion/mutations/entidad.mutations.ts

export const CREATE_ENTIDAD = `
  mutation CreateEntidad(
    $codigo: Int!
    $sigla: String!
  ) {
    createEntidad(
      codigo: $codigo
      sigla: $sigla
    ) {
      success
      message
      data {
        id
        codigo
        sigla
      }
    }
  }
`;

export const UPDATE_ENTIDAD = `
  mutation UpdateEntidad(
    $id: Int!
    $codigo: Int
    $sigla: String
  ) {
    updateEntidad(
      id: $id
      codigo: $codigo
      sigla: $sigla
    ) {
      success
      message
      data {
        id
        codigo
        sigla
      }
    }
  }
`;

export const DELETE_ENTIDAD = `
  mutation DeleteEntidad($id: Int!) {
    deleteEntidad(id: $id) {
      success
      message
      data
    }
  }
`;

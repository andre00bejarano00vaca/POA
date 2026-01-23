// src/graphql/planificacion/mutations/direccionAdministrativa.mutations.ts

export const CREATE_DIRECCION_ADMINISTRATIVA = `
  mutation CreateDireccionAdministrativa(
    $description: String!
    $entidadId: Int!
  ) {
    createDireccionAdministrativa(
      description: $description
      entidadId: $entidadId
    ) {
      success
      message
      data {
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
`;

export const UPDATE_DIRECCION_ADMINISTRATIVA = `
  mutation UpdateDireccionAdministrativa(
    $id: Int!
    $description: String
    $entidadId: Int
  ) {
    updateDireccionAdministrativa(
      id: $id
      description: $description
      entidadId: $entidadId
    ) {
      success
      message
      data {
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
`;

export const DELETE_DIRECCION_ADMINISTRATIVA = `
  mutation DeleteDireccionAdministrativa($id: Int!) {
    deleteDireccionAdministrativa(id: $id) {
      success
      message
      data
    }
  }
`;

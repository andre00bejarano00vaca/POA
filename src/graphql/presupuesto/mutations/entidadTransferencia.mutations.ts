// src/graphql/presupuesto/mutations/entidadTransferencia.mutations.ts

export const CREATE_ENTIDAD_TRANSFERENCIA = `
  mutation CreateEntidadTransferencia(
    $codigo: Int!
    $description: String!
    $rubroIdRubroId: Int!
  ) {
    createEntidadTransferencia(
      codigo: $codigo
      description: $description
      rubroIdRubroId: $rubroIdRubroId
    ) {
      success
      message
      data {
        id
        codigo
        description
        rubro {
          id
          description
          importeDouble
        }
      }
    }
  }
`;

export const UPDATE_ENTIDAD_TRANSFERENCIA = `
  mutation UpdateEntidadTransferencia(
    $id: Int!
    $codigo: Int
    $description: String
    $rubroIdRubroId: Int
  ) {
    updateEntidadTransferencia(
      id: $id
      codigo: $codigo
      description: $description
      rubroIdRubroId: $rubroIdRubroId
    ) {
      success
      message
      data {
        id
        codigo
        description
        rubro {
          id
          description
          importeDouble
        }
      }
    }
  }
`;

export const DELETE_ENTIDAD_TRANSFERENCIA = `
  mutation DeleteEntidadTransferencia($id: Int!) {
    deleteEntidadTransferencia(id: $id) {
      success
      message
      data
    }
  }
`;

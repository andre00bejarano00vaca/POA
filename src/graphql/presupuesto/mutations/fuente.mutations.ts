// src/graphql/presupuesto/mutations/fuente.mutations.ts

export const CREATE_FUENTE = `
  mutation CreateFuente($codigo: Int!, $description: String!) {
    createFuente(codigo: $codigo, description: $description) {
      success
      message
      data {
        id
        codigo
        description
      }
    }
  }
`;

export const UPDATE_FUENTE = `
  mutation UpdateFuente($id: Int!, $codigo: Int, $description: String) {
    updateFuente(id: $id, codigo: $codigo, description: $description) {
      success
      message
      data {
        id
        codigo
        description
      }
    }
  }
`;

export const DELETE_FUENTE = `
  mutation DeleteFuente($id: Int!) {
    deleteFuente(id: $id) {
      success
      message
      data
    }
  }
`;

// src/graphql/presupuesto/mutations/rubro.mutations.ts

export const CREATE_RUBRO = `
  mutation CreateRubro($description: String!, $importeDouble: Float!) {
    createRubro(description: $description, importeDouble: $importeDouble) {
      success
      message
      data {
        id
        description
        importeDouble
      }
    }
  }
`;

export const UPDATE_RUBRO = `
  mutation UpdateRubro($id: Int!, $description: String, $importeDouble: Float) {
    updateRubro(id: $id, description: $description, importeDouble: $importeDouble) {
      success
      message
      data {
        id
        description
        importeDouble
      }
    }
  }
`;

export const DELETE_RUBRO = `
  mutation DeleteRubro($id: Int!) {
    deleteRubro(id: $id) {
      success
      message
      data
    }
  }
`;

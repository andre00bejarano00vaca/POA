// src/graphql/presupuesto/mutations/organismo.mutations.ts

export const CREATE_ORGANISMO = `
  mutation CreateOrganismo($codigo: Int!, $description: String!) {
    createOrganismo(codigo: $codigo, description: $description) {
      success
      message
      data {
        id
        codigo
        description
        fuentes {
          id
          codigo
          description
        }
      }
    }
  }
`;

export const UPDATE_ORGANISMO = `
  mutation UpdateOrganismo($id: Int!, $codigo: Int, $description: String) {
    updateOrganismo(id: $id, codigo: $codigo, description: $description) {
      success
      message
      data {
        id
        codigo
        description
        fuentes {
          id
          codigo
          description
        }
      }
    }
  }
`;

export const DELETE_ORGANISMO = `
  mutation DeleteOrganismo($id: Int!) {
    deleteOrganismo(id: $id) {
      success
      message
      data
    }
  }
`;

export const ADD_FUENTE_TO_ORGANISMO = `
  mutation AddFuenteToOrganismo($organismoId: Int!, $fuenteId: Int!) {
    addFuenteToOrganismo(organismoId: $organismoId, fuenteId: $fuenteId) {
      success
      message
      data {
        id
        codigo
        description
        fuentes {
          id
          codigo
          description
        }
      }
    }
  }
`;

export const REMOVE_FUENTE_FROM_ORGANISMO = `
  mutation RemoveFuenteFromOrganismo($organismoId: Int!, $fuenteId: Int!) {
    removeFuenteFromOrganismo(organismoId: $organismoId, fuenteId: $fuenteId) {
      success
      message
      data {
        id
        codigo
        description
        fuentes {
          id
          codigo
          description
        }
      }
    }
  }
`;

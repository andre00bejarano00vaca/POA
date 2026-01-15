// src/graphql/pei/mutations/area.mutations.ts

export const CREATE_AREA = `
  mutation CreateAreaEstrategica($description: String!, $peiId: Int!) {
    createAreaEstrategica(description: $description, peiId: $peiId) {
      success
      message
      data {
        id
        description
        pei {
          id
          anioIni
          anioFin
          observacion
          metaTotal
          ejecucion
        }
      }
    }
  }
`;

export const UPDATE_AREA = `
  mutation UpdateAreaEstrategica($id: Int!, $description: String, $peiId: Int) {
    updateAreaEstrategica(id: $id, description: $description, peiId: $peiId) {
      success
      message
      data {
        id
        description
        pei {
          id
          anioIni
          anioFin
          observacion
          metaTotal
          ejecucion
        }
      }
    }
  }
`;

export const DELETE_AREA = `
  mutation DeleteAreaEstrategica($id: Int!) {
    deleteAreaEstrategica(id: $id) {
      success
      message
      data
    }
  }
`;

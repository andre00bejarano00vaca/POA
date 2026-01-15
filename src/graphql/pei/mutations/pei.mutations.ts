// src/graphql/pei/pei.mutations.ts

export const CREATE_PEI = /* GraphQL */ `
  mutation CreatePei(
    $anioIni: Date!
    $anioFin: Date!
    $metaTotal: Int!
    $ejecucion: Int!
    $observacion: String
  ) {
    createPei(
      anioIni: $anioIni
      anioFin: $anioFin
      metaTotal: $metaTotal
      ejecucion: $ejecucion
      observacion: $observacion
    ) {
      success
      message
      data {
        id
        anioIni
        anioFin
        observacion
        metaTotal
        ejecucion
      }
    }
  }
`;

export const UPDATE_PEI = /* GraphQL */ `
  mutation UpdatePei(
    $id: Int!
    $anioIni: Date
    $anioFin: Date
    $metaTotal: Int
    $ejecucion: Int
    $observacion: String
  ) {
    updatePei(
      id: $id
      anioIni: $anioIni
      anioFin: $anioFin
      metaTotal: $metaTotal
      ejecucion: $ejecucion
      observacion: $observacion
    ) {
      success
      message
      data {
        id
        anioIni
        anioFin
        observacion
        metaTotal
        ejecucion
      }
    }
  }
`;

export const DELETE_PEI = /* GraphQL */ `
  mutation DeletePei($id: Int!) {
    deletePei(id: $id) {
      success
      message
      data
    }
  }
`;

// src/graphql/planificacion/mutations/politicaDesarrollo.mutations.ts

export const CREATE_POLITICA_DESARROLLO = `
  mutation CreatePoliticaDesarrollo(
    $idPd: Int!
    $description: String!
    $areaEstrategicaId: Int!
  ) {
    createPoliticaDesarrollo(
      idPd: $idPd
      description: $description
      areaEstrategicaId: $areaEstrategicaId
    ) {
      success
      message
      data {
        id
        idPd
        description
        areaEstrategica {
          id
          description
          pei {
            id
            anioIni
            anioFin
            ejecucion
            metaTotal
            observacion
          }
        }
      }
    }
  }
`;

export const UPDATE_POLITICA_DESARROLLO = `
  mutation UpdatePoliticaDesarrollo(
    $id: Int!
    $idPd: Int
    $description: String
    $areaEstrategicaId: Int
  ) {
    updatePoliticaDesarrollo(
      id: $id
      idPd: $idPd
      description: $description
      areaEstrategicaId: $areaEstrategicaId
    ) {
      success
      message
      data {
        id
        idPd
        description
        areaEstrategica {
          id
          description
          pei {
            id
            anioIni
            anioFin
            ejecucion
            metaTotal
            observacion
          }
        }
      }
    }
  }
`;

export const DELETE_POLITICA_DESARROLLO = `
  mutation DeletePoliticaDesarrollo($id: Int!) {
    deletePoliticaDesarrollo(id: $id) {
      success
      message
      data
    }
  }
`;

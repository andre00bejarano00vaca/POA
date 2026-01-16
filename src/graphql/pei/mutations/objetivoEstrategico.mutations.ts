// src/graphql/pei/mutations/objetivoEstrategico.mutations.ts

export const CREATE_OBJETIVO_ESTRATEGICO = `
  mutation CreateObjetivoEstrategicoAmp(
    $idOe: Int!
    $description: String!
    $politicaDesarrolloId: Int!
  ) {
    createObjetivoEstrategicoAmp(
      idOe: $idOe
      description: $description
      politicaDesarrolloId: $politicaDesarrolloId
    ) {
      success
      message
      data {
        id
        idOe
        description
        politicaDesarrollo {
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
  }
`;

export const UPDATE_OBJETIVO_ESTRATEGICO = `
  mutation UpdateObjetivoEstrategicoAmp(
    $id: Int!
    $idOe: Int
    $description: String
    $politicaDesarrolloId: Int
  ) {
    updateObjetivoEstrategicoAmp(
      id: $id
      idOe: $idOe
      description: $description
      politicaDesarrolloId: $politicaDesarrolloId
    ) {
      success
      message
      data {
        id
        idOe
        description
        politicaDesarrollo {
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
  }
`;

export const DELETE_OBJETIVO_ESTRATEGICO = `
  mutation DeleteObjetivoEstrategicoAmp($id: Int!) {
    deleteObjetivoEstrategicoAmp(id: $id) {
      success
      message
      data
    }
  }
`;

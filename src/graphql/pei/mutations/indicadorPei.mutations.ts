// src/graphql/pei/mutations/indicadorPei.mutations.ts

export const CREATE_INDICADOR_PEI = `
  mutation CreateIndicadorPei(
    $description: String!
    $formula: String!
    $lineaBase: Int!
    $meta: Int!
    $unidadMedida: String!
    $objetivoEstrategicoId: Int!
  ) {
    createIndicadorPei(
      description: $description
      formula: $formula
      lineaBase: $lineaBase
      meta: $meta
      unidadMedida: $unidadMedida
      objetivoEstrategicoId: $objetivoEstrategicoId
    ) {
      success
      message
      data {
        id
        description
        formula
        lineaBase
        meta
        unidadMedida
        objetivoEstrategico {
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
  }
`;

export const UPDATE_INDICADOR_PEI = `
  mutation UpdateIndicadorPei(
    $id: Int!
    $description: String
    $formula: String
    $lineaBase: Int
    $meta: Int
    $unidadMedida: String
    $objetivoEstrategicoId: Int
  ) {
    updateIndicadorPei(
      id: $id
      description: $description
      formula: $formula
      lineaBase: $lineaBase
      meta: $meta
      unidadMedida: $unidadMedida
      objetivoEstrategicoId: $objetivoEstrategicoId
    ) {
      success
      message
      data {
        id
        description
        formula
        lineaBase
        meta
        unidadMedida
        objetivoEstrategico {
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
  }
`;

export const DELETE_INDICADOR_PEI = `
  mutation DeleteIndicadorPei($id: Int!) {
    deleteIndicadorPei(id: $id) {
      success
      message
      data
    }
  }
`;

// src/graphql/pei/mutations/accionEstrategica.mutations.ts

export const CREATE_ACCION_ESTRATEGICA = `
  mutation CreateAccionEstrategicaInstitucional(
    $description: String!
    $objetivoEstrategicoId: Int!
  ) {
    createAccionEstrategicaInstitucional(
      description: $description
      objetivoEstrategicoId: $objetivoEstrategicoId
    ) {
      success
      message
      data {
        id
        description
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

export const UPDATE_ACCION_ESTRATEGICA = `
  mutation UpdateAccionEstrategicaInstitucional(
    $id: Int!
    $description: String
    $objetivoEstrategicoId: Int
  ) {
    updateAccionEstrategicaInstitucional(
      id: $id
      description: $description
      objetivoEstrategicoId: $objetivoEstrategicoId
    ) {
      success
      message
      data {
        id
        description
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

export const DELETE_ACCION_ESTRATEGICA = `
  mutation DeleteAccionEstrategicaInstitucional($id: Int!) {
    deleteAccionEstrategicaInstitucional(id: $id) {
      success
      message
      data
    }
  }
`;

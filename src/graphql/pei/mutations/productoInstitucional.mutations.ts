// src/graphql/pei/mutations/productoInstitucional.mutations.ts

export const CREATE_PRODUCTO_INSTITUCIONAL = `
  mutation CreateProductoInstitucion(
    $idPi: Int!
    $description: String!
    $accionEstrategicaId: Int!
  ) {
    createProductoInstitucion(
      idPi: $idPi
      description: $description
      accionEstrategicaId: $accionEstrategicaId
    ) {
      success
      message
      data {
        id
        idPi
        description
        accionEstrategica {
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
  }
`;

export const UPDATE_PRODUCTO_INSTITUCIONAL = `
  mutation UpdateProductoInstitucion(
    $id: Int!
    $idPi: Int
    $description: String
    $accionEstrategicaId: Int
  ) {
    updateProductoInstitucion(
      id: $id
      idPi: $idPi
      description: $description
      accionEstrategicaId: $accionEstrategicaId
    ) {
      success
      message
      data {
        id
        idPi
        description
        accionEstrategica {
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
  }
`;

export const DELETE_PRODUCTO_INSTITUCIONAL = `
  mutation DeleteProductoInstitucion($id: Int!) {
    deleteProductoInstitucion(id: $id) {
      success
      message
      data
    }
  }
`;

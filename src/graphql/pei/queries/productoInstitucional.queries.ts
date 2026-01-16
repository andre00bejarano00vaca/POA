// src/graphql/pei/queries/productoInstitucional.queries.ts

export const LIST_PRODUCTOS_INSTITUCIONALES = `
  query ListProductosInstitucion($limit: Int!, $offset: Int!) {
    listProductosInstitucion(limit: $limit, offset: $offset) {
      count
      results {
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

export const SEARCH_PRODUCTOS_INSTITUCIONALES = `
  query SearchProductosInstitucion($search: String!, $limit: Int!, $offset: Int!) {
    searchProductosInstitucion(search: $search, limit: $limit, offset: $offset) {
      count
      results {
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

export const GET_PRODUCTO_INSTITUCIONAL = `
  query GetProductoInstitucion($id: Int!) {
    getProductoInstitucion(id: $id) {
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

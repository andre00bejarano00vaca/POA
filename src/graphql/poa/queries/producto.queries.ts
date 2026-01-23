// src/graphql/poa/queries/producto.queries.ts

export const LIST_PRODUCTOS = `
  query ListProductos($limit: Int!, $offset: Int!) {
    listProductos(limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        accionCortoPlazo {
          id
          description
          programa {
            id
            description
            poa {
              id
              anio
              fechaRegistro
              unidadEjecutora {
                id
                description
                techoPres
                direccionAdministrativa {
                  id
                  description
                  entidad {
                    id
                    codigo
                    sigla
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTO = `
  query GetProducto($id: Int!) {
    getProducto(id: $id) {
      success
      message
      data {
        id
        description
        accionCortoPlazo {
          id
          description
          programa {
            id
            description
            poa {
              id
              anio
              fechaRegistro
              unidadEjecutora {
                id
                description
                techoPres
                direccionAdministrativa {
                  id
                  description
                  entidad {
                    id
                    codigo
                    sigla
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTOS = `
  query SearchProductos($search: String!, $limit: Int!, $offset: Int!) {
    searchProductos(search: $search, limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        accionCortoPlazo {
          id
          description
          programa {
            id
            description
            poa {
              id
              anio
              fechaRegistro
              unidadEjecutora {
                id
                description
                techoPres
                direccionAdministrativa {
                  id
                  description
                  entidad {
                    id
                    codigo
                    sigla
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTOS_ORDENADOS = `
  query GetProductosOrdenados($limit: Int!, $offset: Int!, $orderBy: String!) {
    getProductosOrdenados(limit: $limit, offset: $offset, orderBy: $orderBy) {
      count
      results {
        id
        description
        accionCortoPlazo {
          id
          description
          programa {
            id
            description
            poa {
              id
              anio
              fechaRegistro
              unidadEjecutora {
                id
                description
                techoPres
                direccionAdministrativa {
                  id
                  description
                  entidad {
                    id
                    codigo
                    sigla
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const COUNT_PRODUCTOS = `
  query CountProductos {
    countProductos
  }
`;

export const EXISTS_PRODUCTO = `
  query ExistsProducto($id: Int!) {
    existsProducto(id: $id)
  }
`;

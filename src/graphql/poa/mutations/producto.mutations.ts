// src/graphql/poa/mutations/producto.mutations.ts

export const CREATE_PRODUCTO = `
  mutation CreateProducto(
    $description: String!
    $accionCortoPlazoId: Int!
  ) {
    createProducto(
      description: $description
      accionCortoPlazoId: $accionCortoPlazoId
    ) {
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

export const UPDATE_PRODUCTO = `
  mutation UpdateProducto(
    $id: Int!
    $description: String
    $accionCortoPlazoId: Int
  ) {
    updateProducto(
      id: $id
      description: $description
      accionCortoPlazoId: $accionCortoPlazoId
    ) {
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

export const DELETE_PRODUCTO = `
  mutation DeleteProducto($id: Int!) {
    deleteProducto(id: $id) {
      success
      message
      data
    }
  }
`;

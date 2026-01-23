// src/graphql/poa/mutations/programa.mutations.ts

export const CREATE_PROGRAMA = `
  mutation CreatePrograma(
    $description: String!
    $poaId: Int!
  ) {
    createPrograma(
      description: $description
      poaId: $poaId
    ) {
      success
      message
      data {
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
`;

export const UPDATE_PROGRAMA = `
  mutation UpdatePrograma(
    $id: Int!
    $description: String
    $poaId: Int
  ) {
    updatePrograma(
      id: $id
      description: $description
      poaId: $poaId
    ) {
      success
      message
      data {
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
`;

export const DELETE_PROGRAMA = `
  mutation DeletePrograma($id: Int!) {
    deletePrograma(id: $id) {
      success
      message
      data
    }
  }
`;

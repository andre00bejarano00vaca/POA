// src/graphql/presupuesto/mutations/objetoGasto.mutations.ts

export const CREATE_OBJETO_GASTO = `
  mutation CreateObjetoGasto(
    $description: String!
    $importeDouble: Float!
    $entidadTransferenciaIdEtId: Int!
    $organismoIdOrgId: Int!
  ) {
    createObjetoGasto(
      description: $description
      importeDouble: $importeDouble
      entidadTransferenciaIdEtId: $entidadTransferenciaIdEtId
      organismoIdOrgId: $organismoIdOrgId
    ) {
      success
      message
      data {
        id
        description
        importeDouble
        entidadTransferenciaIdEt {
          id
          codigo
          description
          rubro {
            id
            description
            importeDouble
          }
        }
        organismoIdOrg {
          id
          codigo
          description
          fuentes {
            id
            codigo
            description
          }
        }
      }
    }
  }
`;

export const UPDATE_OBJETO_GASTO = `
  mutation UpdateObjetoGasto(
    $id: Int!
    $description: String
    $importeDouble: Float
    $entidadTransferenciaIdEtId: Int
    $organismoIdOrgId: Int
  ) {
    updateObjetoGasto(
      id: $id
      description: $description
      importeDouble: $importeDouble
      entidadTransferenciaIdEtId: $entidadTransferenciaIdEtId
      organismoIdOrgId: $organismoIdOrgId
    ) {
      success
      message
      data {
        id
        description
        importeDouble
        entidadTransferenciaIdEt {
          id
          codigo
          description
          rubro {
            id
            description
            importeDouble
          }
        }
        organismoIdOrg {
          id
          codigo
          description
          fuentes {
            id
            codigo
            description
          }
        }
      }
    }
  }
`;

export const DELETE_OBJETO_GASTO = `
  mutation DeleteObjetoGasto($id: Int!) {
    deleteObjetoGasto(id: $id) {
      success
      message
      data
    }
  }
`;

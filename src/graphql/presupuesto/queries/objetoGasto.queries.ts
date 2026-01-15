// src/graphql/presupuesto/queries/objetoGasto.queries.ts

export const LIST_OBJETOS_GASTO = `
  query ListObjetosGasto($limit: Int!, $offset: Int!) {
    listObjetosGasto(limit: $limit, offset: $offset) {
      count
      results {
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

export const SEARCH_OBJETOS_GASTO = `
  query SearchObjetosGasto($search: String!, $limit: Int!, $offset: Int!) {
    searchObjetosGasto(search: $search, limit: $limit, offset: $offset) {
      count
      results {
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

export const GET_OBJETO_GASTO = `
  query GetObjetoGasto($id: Int!) {
    getObjetoGasto(id: $id) {
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

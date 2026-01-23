// src/graphql/poa/queries/programa.queries.ts

export const LIST_PROGRAMAS = `
  query ListProgramas($limit: Int!, $offset: Int!) {
    listProgramas(limit: $limit, offset: $offset) {
      count
      results {
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

export const GET_PROGRAMA = `
  query GetPrograma($id: Int!) {
    getPrograma(id: $id) {
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

export const SEARCH_PROGRAMAS = `
  query SearchProgramas($search: String!, $limit: Int!, $offset: Int!) {
    searchProgramas(search: $search, limit: $limit, offset: $offset) {
      count
      results {
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

export const FILTER_PROGRAMAS_POR_POA = `
  query FilterProgramasPorPoa($poaId: Int!, $limit: Int!, $offset: Int!) {
    filterProgramasPorPoa(poaId: $poaId, limit: $limit, offset: $offset) {
      count
      results {
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

export const GET_PROGRAMAS_ORDENADOS = `
  query GetProgramasOrdenados($limit: Int!, $offset: Int!, $orderBy: String!) {
    getProgramasOrdenados(limit: $limit, offset: $offset, orderBy: $orderBy) {
      count
      results {
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

export const COUNT_PROGRAMAS = `
  query CountProgramas {
    countProgramas
  }
`;

export const EXISTS_PROGRAMA = `
  query ExistsPrograma($id: Int!) {
    existsPrograma(id: $id)
  }
`;

// src/graphql/planificacion/queries/unidadEjecutora.queries.ts

export const LIST_UNIDADES_EJECUTORAS = `
  query ListUnidadesEjecutoras($limit: Int!, $offset: Int!) {
    listUnidadesEjecutoras(limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const GET_UNIDAD_EJECUTORA = `
  query GetUnidadEjecutora($id: Int!) {
    getUnidadEjecutora(id: $id) {
      success
      message
      data {
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
`;

export const SEARCH_UNIDADES_EJECUTORAS = `
  query SearchUnidadesEjecutoras($search: String!, $limit: Int!, $offset: Int!) {
    searchUnidadesEjecutoras(search: $search, limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const FILTER_UNIDADES_EJECUTORAS = `
  query FilterUnidadesEjecutoras($direccionAdministrativaId: Int!, $limit: Int!, $offset: Int!) {
    filterUnidadesEjecutoras(direccionAdministrativaId: $direccionAdministrativaId, limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const GET_UNIDADES_EJECUTORAS_ORDENADAS = `
  query GetUnidadesEjecutorasOrdenadas($limit: Int!, $offset: Int!) {
    getUnidadesEjecutorasOrdenadas(limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const COUNT_UNIDADES_EJECUTORAS = `
  query CountUnidadesEjecutoras {
    countUnidadesEjecutoras
  }
`;

export const EXISTS_UNIDAD_EJECUTORA = `
  query ExistsUnidadEjecutora($id: Int!) {
    existsUnidadEjecutora(id: $id)
  }
`;

// src/graphql/planificacion/queries/direccionAdministrativa.queries.ts

export const LIST_DIRECCIONES_ADMINISTRATIVAS = `
  query ListDireccionesAdministrativas($limit: Int!, $offset: Int!) {
    listDireccionesAdministrativas(limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const GET_DIRECCION_ADMINISTRATIVA = `
  query GetDireccionAdministrativa($id: Int!) {
    getDireccionAdministrativa(id: $id) {
      success
      message
      data {
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
`;

export const SEARCH_DIRECCIONES_ADMINISTRATIVAS = `
  query SearchDireccionesAdministrativas($search: String!, $limit: Int!, $offset: Int!) {
    searchDireccionesAdministrativas(search: $search, limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const FILTER_DIRECCIONES_ADMINISTRATIVAS = `
  query FilterDireccionesAdministrativas($entidadId: Int!, $limit: Int!, $offset: Int!) {
    filterDireccionesAdministrativas(entidadId: $entidadId, limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const GET_DIRECCIONES_ADMINISTRATIVAS_ORDENADAS = `
  query GetDireccionesAdministrativasOrdenadas($limit: Int!, $offset: Int!, $orderBy: String!) {
    getDireccionesAdministrativasOrdenadas(limit: $limit, offset: $offset, orderBy: $orderBy) {
      count
      results {
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
`;

export const COUNT_DIRECCIONES_ADMINISTRATIVAS = `
  query CountDireccionesAdministrativas {
    countDireccionesAdministrativas
  }
`;

export const EXISTS_DIRECCION_ADMINISTRATIVA = `
  query ExistsDireccionAdministrativa($id: Int!) {
    existsDireccionAdministrativa(id: $id)
  }
`;

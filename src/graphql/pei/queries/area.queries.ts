// src/graphql/pei/queries/area.queries.ts

export const LIST_AREAS = `
  query ListAreasEstrategicas($limit: Int!, $offset: Int!) {
    listAreasEstrategicas(limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        pei {
          id
          anioIni
          anioFin
          observacion
          metaTotal
          ejecucion
        }
      }
    }
  }
`;

export const FILTER_AREAS_POR_PEI = `
  query FilterAreasPorPei($peiId: Int!, $limit: Int!, $offset: Int!) {
    filterAreasPorPei(peiId: $peiId, limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        pei {
          id
          anioIni
          anioFin
          observacion
          metaTotal
          ejecucion
        }
      }
    }
  }
`;

export const SEARCH_AREAS = `
  query SearchAreasEstrategicas($search: String!, $limit: Int!, $offset: Int!) {
    searchAreasEstrategicas(search: $search, limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        pei {
          id
          anioIni
          anioFin
          observacion
          metaTotal
          ejecucion
        }
      }
    }
  }
`;

export const GET_AREA = `
  query GetAreaEstrategica($id: Int!) {
    getAreaEstrategica(id: $id) {
      success
      message
      data {
        id
        description
        pei {
          id
          anioIni
          anioFin
          observacion
          metaTotal
          ejecucion
        }
      }
    }
  }
`;

export const COUNT_AREAS = `
  query CountAreasEstrategicas {
    countAreasEstrategicas
  }
`;

export const EXISTS_AREA = `
  query ExistsAreaEstrategica($id: Int!) {
    existsAreaEstrategica(id: $id)
  }
`;

export const GET_AREAS_ORDENADAS = `
  query GetAreasEstrategicasOrdenadas($orderBy: String!, $limit: Int!, $offset: Int!) {
    getAreasEstrategicasOrdenadas(orderBy: $orderBy, limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        pei {
          id
          anioIni
          anioFin
          observacion
          metaTotal
          ejecucion
        }
      }
    }
  }
`;

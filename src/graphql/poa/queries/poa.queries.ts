// src/graphql/planificacion/queries/poa.queries.ts

export const LIST_POAS = `
  query ListPoas($limit: Int!, $offset: Int!) {
    listPoas(limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const GET_POA = `
  query GetPoa($id: Int!) {
    getPoa(id: $id) {
      success
      message
      data {
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
`;

export const FILTER_POAS_POR_ANIO = `
  query FilterPoasPorAnio($anio: Int!, $limit: Int!, $offset: Int!) {
    filterPoasPorAnio(anio: $anio, limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const FILTER_POAS_POR_UNIDAD_EJECUTORA = `
  query FilterPoasPorUnidadEjecutora($unidadEjecutoraId: Int!, $limit: Int!, $offset: Int!) {
    filterPoasPorUnidadEjecutora(unidadEjecutoraId: $unidadEjecutoraId, limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const FILTER_POAS_POR_ANIO_Y_UNIDAD = `
  query FilterPoasPorAnioYUnidad($anio: Int!, $unidadEjecutoraId: Int!, $limit: Int!, $offset: Int!) {
    filterPoasPorAnioYUnidad(anio: $anio, unidadEjecutoraId: $unidadEjecutoraId, limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const FILTER_POAS_POR_RANGO_ANIO = `
  query FilterPoasPorRangoAnio($anioInicio: Int!, $anioFin: Int!, $limit: Int!, $offset: Int!) {
    filterPoasPorRangoAnio(anioInicio: $anioInicio, anioFin: $anioFin, limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const GET_POAS_ORDENADOS = `
  query GetPoasOrdenados($limit: Int!, $offset: Int!, $orderBy: String!) {
    getPoasOrdenados(limit: $limit, offset: $offset, orderBy: $orderBy) {
      count
      results {
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
`;

export const COUNT_POAS = `
  query CountPoas {
    countPoas
  }
`;

export const EXISTS_POA = `
  query ExistsPoa($id: Int!) {
    existsPoa(id: $id)
  }
`;

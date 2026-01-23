// src/graphql/poa/queries/indicadorPoa.queries.ts

export const LIST_INDICADORES_POA = `
  query ListIndicadoresPoa($limit: Int!, $offset: Int!) {
    listIndicadoresPoa(limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        formula
        lineaBase
        meta
        unidadMedida
        actividad {
          id
          description
          tipo
          clase
          categProgramatica
          fechaIni
          fechaFinal
          docVerif
          causasDesv
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
  }
`;

export const GET_INDICADOR_POA = `
  query GetIndicadorPoa($id: Int!) {
    getIndicadorPoa(id: $id) {
      success
      message
      data {
        id
        description
        formula
        lineaBase
        meta
        unidadMedida
        actividad {
          id
          description
          tipo
          clase
          categProgramatica
          fechaIni
          fechaFinal
          docVerif
          causasDesv
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
              }
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_INDICADORES_POA = `
  query SearchIndicadoresPoa($search: String!, $limit: Int!, $offset: Int!) {
    searchIndicadoresPoa(search: $search, limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        formula
        lineaBase
        meta
        unidadMedida
        actividad {
          id
          description
          tipo
          clase
          categProgramatica
          fechaIni
          fechaFinal
          docVerif
          causasDesv
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
  }
`;

export const FILTER_INDICADORES_POA_POR_ACTIVIDAD = `
  query FilterIndicadoresPoaPorActividad($actividadId: Int!, $limit: Int!, $offset: Int!) {
    filterIndicadoresPoaPorActividad(actividadId: $actividadId, limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        formula
        lineaBase
        meta
        unidadMedida
        actividad {
          id
          description
          tipo
          clase
          categProgramatica
          fechaIni
          fechaFinal
          docVerif
          causasDesv
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
  }
`;

export const FILTER_INDICADORES_POA_POR_UNIDAD_MEDIDA = `
  query FilterIndicadoresPoaPorUnidadMedida($unidadMedida: String!, $limit: Int!, $offset: Int!) {
    filterIndicadoresPoaPorUnidadMedida(unidadMedida: $unidadMedida, limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        formula
        lineaBase
        meta
        unidadMedida
        actividad {
          id
          description
          tipo
          clase
          categProgramatica
          fechaIni
          fechaFinal
          docVerif
          causasDesv
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
  }
`;

export const FILTER_INDICADORES_POA_POR_RANGO_META = `
  query FilterIndicadoresPoaPorRangoMeta($metaMin: Int!, $metaMax: Int!, $limit: Int!, $offset: Int!) {
    filterIndicadoresPoaPorRangoMeta(metaMin: $metaMin, metaMax: $metaMax, limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        formula
        lineaBase
        meta
        unidadMedida
        actividad {
          id
          description
          tipo
          clase
          categProgramatica
          fechaIni
          fechaFinal
          docVerif
          causasDesv
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
  }
`;

export const GET_INDICADORES_POA_ORDENADOS = `
  query GetIndicadoresPoaOrdenados($limit: Int!, $offset: Int!, $orderBy: String!) {
    getIndicadoresPoaOrdenados(limit: $limit, offset: $offset, orderBy: $orderBy) {
      count
      results {
        id
        description
        formula
        lineaBase
        meta
        unidadMedida
        actividad {
          id
          description
          tipo
          clase
          categProgramatica
          fechaIni
          fechaFinal
          docVerif
          causasDesv
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
  }
`;

export const COUNT_INDICADORES_POA = `
  query CountIndicadoresPoa {
    countIndicadoresPoa
  }
`;

export const EXISTS_INDICADOR_POA = `
  query ExistsIndicadorPoa($id: Int!) {
    existsIndicadorPoa(id: $id)
  }
`;

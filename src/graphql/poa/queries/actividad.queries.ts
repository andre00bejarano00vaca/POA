// src/graphql/poa/queries/actividad.queries.ts

export const LIST_ACTIVIDADES = `
  query ListActividades($limit: Int!, $offset: Int!) {
    listActividades(limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const GET_ACTIVIDAD = `
  query GetActividad($id: Int!) {
    getActividad(id: $id) {
      success
      message
      data {
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
`;

export const SEARCH_ACTIVIDADES = `
  query SearchActividades($search: String!, $limit: Int!, $offset: Int!) {
    searchActividades(search: $search, limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const FILTER_ACTIVIDADES_POR_ACCION = `
  query FilterActividadesPorAccion($accionCortoPlazoId: Int!, $limit: Int!, $offset: Int!) {
    filterActividadesPorAccion(accionCortoPlazoId: $accionCortoPlazoId, limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const FILTER_ACTIVIDADES_POR_TIPO = `
  query FilterActividadesPorTipo($tipo: String!, $limit: Int!, $offset: Int!) {
    filterActividadesPorTipo(tipo: $tipo, limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const COUNT_ACTIVIDADES = `
  query CountActividades {
    countActividades
  }
`;

export const EXISTS_ACTIVIDAD = `
  query ExistsActividad($id: Int!) {
    existsActividad(id: $id)
  }
`;

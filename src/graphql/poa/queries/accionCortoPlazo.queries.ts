// src/graphql/poa/queries/accionCortoPlazo.queries.ts

export const LIST_ACCIONES_CORTO_PLAZO = `
  query ListAccionesCortoPlazo($limit: Int!, $offset: Int!) {
    listAccionesCortoPlazo(limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const GET_ACCION_CORTO_PLAZO = `
  query GetAccionCortoPlazo($id: Int!) {
    getAccionCortoPlazo(id: $id) {
      success
      message
      data {
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
`;

export const SEARCH_ACCIONES_CORTO_PLAZO = `
  query SearchAccionesCortoPlazo($search: String!, $limit: Int!, $offset: Int!) {
    searchAccionesCortoPlazo(search: $search, limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const FILTER_ACCIONES_POR_PROGRAMA = `
  query FilterAccionesPorPrograma($programaId: Int!, $limit: Int!, $offset: Int!) {
    filterAccionesPorPrograma(programaId: $programaId, limit: $limit, offset: $offset) {
      count
      results {
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
`;

export const GET_ACCIONES_CORTO_PLAZO_ORDENADAS = `
  query GetAccionesCortoPlazoOrdenadas($limit: Int!, $offset: Int!, $orderBy: String!) {
    getAccionesCortoPlazoOrdenadas(limit: $limit, offset: $offset, orderBy: $orderBy) {
      count
      results {
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
`;

export const COUNT_ACCIONES_CORTO_PLAZO = `
  query CountAccionesCortoPlazo {
    countAccionesCortoPlazo
  }
`;

export const EXISTS_ACCION_CORTO_PLAZO = `
  query ExistsAccionCortoPlazo($id: Int!) {
    existsAccionCortoPlazo(id: $id)
  }
`;

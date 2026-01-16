// src/graphql/pei/queries/accionEstrategica.queries.ts

export const LIST_ACCIONES_ESTRATEGICAS = `
  query ListAccionesEstrategicasInstitucionales($limit: Int!, $offset: Int!) {
    listAccionesEstrategicasInstitucionales(limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        objetivoEstrategico {
          id
          idOe
          description
          politicaDesarrollo {
            id
            idPd
            description
            areaEstrategica {
              id
              description
              pei {
                id
                anioIni
                anioFin
                ejecucion
                metaTotal
                observacion
              }
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_ACCIONES_ESTRATEGICAS = `
  query SearchAccionesEstrategicasInstitucionales($search: String!, $limit: Int!, $offset: Int!) {
    searchAccionesEstrategicasInstitucionales(search: $search, limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        objetivoEstrategico {
          id
          idOe
          description
          politicaDesarrollo {
            id
            idPd
            description
            areaEstrategica {
              id
              description
              pei {
                id
                anioIni
                anioFin
                ejecucion
                metaTotal
                observacion
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ACCION_ESTRATEGICA = `
  query GetAccionEstrategicaInstitucional($id: Int!) {
    getAccionEstrategicaInstitucional(id: $id) {
      success
      message
      data {
        id
        description
        objetivoEstrategico {
          id
          idOe
          description
          politicaDesarrollo {
            id
            idPd
            description
            areaEstrategica {
              id
              description
              pei {
                id
                anioIni
                anioFin
                ejecucion
                metaTotal
                observacion
              }
            }
          }
        }
      }
    }
  }
`;

export const FILTER_ACCIONES_POR_OBJETIVO = `
  query FilterAccionesPorObjetivo($objetivoEstrategicoId: Int!, $limit: Int!, $offset: Int!) {
    filterAccionesPorObjetivo(objetivoEstrategicoId: $objetivoEstrategicoId, limit: $limit, offset: $offset) {
      count
      results {
        id
        description
        objetivoEstrategico {
          id
          idOe
          description
          politicaDesarrollo {
            id
            idPd
            description
            areaEstrategica {
              id
              description
              pei {
                id
                anioIni
                anioFin
                ejecucion
                metaTotal
                observacion
              }
            }
          }
        }
      }
    }
  }
`;

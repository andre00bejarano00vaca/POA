// src/graphql/poa/queries/seguimientoPoa.queries.ts

export const LIST_SEGUIMIENTOS_POA = `
  query ListSeguimientosPoa($limit: Int, $offset: Int) {
    listSeguimientosPoa(limit: $limit, offset: $offset) {
      count
      results {
        valoracionGlobal
        trimestre
        porcMedia
        promedioGeneral
        porcBaja
        porcAlta
        observaciones
        id
        fechaRegistro
        poa {
          anio
          fechaRegistro
          id
          unidadEjecutora {
            description
            techoPres
            id
            direccionAdministrativa {
              description
              id
              entidad {
                activo
                id
                sigla
                codigo
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_SEGUIMIENTO_POA = `
  query GetSeguimientoPoa($id: Int!) {
    getSeguimientoPoa(id: $id) {
      data {
        fechaRegistro
        id
        valoracionGlobal
        trimestre
        porcMedia
        promedioGeneral
        porcBaja
        porcAlta
        observaciones
        poa {
          anio
          fechaRegistro
          id
          unidadEjecutora {
            description
            id
            techoPres
            direccionAdministrativa {
              description
              id
              entidad {
                activo
                codigo
                id
                sigla
              }
            }
          }
        }
      }
      success
      message
    }
  }
`;

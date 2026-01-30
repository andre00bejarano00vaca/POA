// src/graphql/poa/mutations/seguimientoPoa.mutations.ts

export const CREATE_SEGUIMIENTO_POA = `
  mutation CreateSeguimientoPoa(
    $fechaRegistro: String!
    $poaId: Int!
    $trimestre: Int!
    $observaciones: String
  ) {
    createSeguimientoPoa(
      fechaRegistro: $fechaRegistro
      poaId: $poaId
      trimestre: $trimestre
      observaciones: $observaciones
    ) {
      message
      success
      data {
        id
        fechaRegistro
        observaciones
        valoracionGlobal
        trimestre
        promedioGeneral
        porcMedia
        porcBaja
        porcAlta
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
    }
  }
`;

export const UPDATE_SEGUIMIENTO_POA = `
  mutation UpdateSeguimientoPoa(
    $id: Int!
    $fechaRegistro: String
    $observaciones: String
  ) {
    updateSeguimientoPoa(
      id: $id
      fechaRegistro: $fechaRegistro
      observaciones: $observaciones
    ) {
      message
      success
      data {
        fechaRegistro
        id
        observaciones
        valoracionGlobal
        trimestre
        promedioGeneral
        porcMedia
        porcBaja
        porcAlta
        poa {
          anio
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
                codigo
                sigla
                id
              }
            }
          }
          fechaRegistro
        }
      }
    }
  }
`;

export const DELETE_SEGUIMIENTO_POA = `
  mutation DeleteSeguimientoPoa($id: Int!) {
    deleteSeguimientoPoa(id: $id) {
      message
      data
      success
    }
  }
`;

export const SYNC_ESTRUCTURA_SEGUIMIENTO_POA = `
  mutation SyncEstructuraSeguimientoPoa($seguimientoId: Int!) {
    syncEstructuraSeguimientoPoa(seguimientoId: $seguimientoId) {
      success
      data {
        fechaRegistro
        valoracionGlobal
        trimestre
        promedioGeneral
        porcMedia
        porcBaja
        porcAlta
        observaciones
        id
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
      message
    }
  }
`;

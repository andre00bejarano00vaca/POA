// src/graphql/pei/mutations/seguimientoPei.mutations.ts

export const CREATE_SEGUIMIENTO_PEI = `
  mutation CreateSeguimientoPei(
    $anio: Int!
    $peiId: Int!
    $porcAlta: Float!
    $porcBaja: Float!
    $porcMedia: Float!
    $promediaGeneral: Float!
    $valoracionGlobal: String!
    $fechaRegistro: String!
    $observaciones: String
  ) {
    createSeguimientoPei(
      anio: $anio
      peiId: $peiId
      porcAlta: $porcAlta
      porcBaja: $porcBaja
      porcMedia: $porcMedia
      promediaGeneral: $promediaGeneral
      valoracionGlobal: $valoracionGlobal
      fechaRegistro: $fechaRegistro
      observaciones: $observaciones
    ) {
      success
      message
      data {
        id
        anio
        promediaGeneral
        valoracionGlobal
        observaciones
        porcAlta
        porcMedia
        porcBaja
        fechaRegistro
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
`;

export const UPDATE_SEGUIMIENTO_PEI = `
  mutation UpdateSeguimientoPei(
    $id: Int!
    $anio: Int
    $peiId: Int
    $porcAlta: Float
    $porcBaja: Float
    $porcMedia: Float
    $promediaGeneral: Float
    $valoracionGlobal: String
    $fechaRegistro: String
    $observaciones: String
  ) {
    updateSeguimientoPei(
      id: $id
      anio: $anio
      peiId: $peiId
      porcAlta: $porcAlta
      porcBaja: $porcBaja
      porcMedia: $porcMedia
      promediaGeneral: $promediaGeneral
      valoracionGlobal: $valoracionGlobal
      fechaRegistro: $fechaRegistro
      observaciones: $observaciones
    ) {
      success
      message
      data {
        id
        anio
        promediaGeneral
        valoracionGlobal
        observaciones
        porcAlta
        porcMedia
        porcBaja
        fechaRegistro
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
`;

export const DELETE_SEGUIMIENTO_PEI = `
  mutation DeleteSeguimientoPei($id: Int!) {
    deleteSeguimientoPei(id: $id) {
      success
      message
      data
    }
  }
`;

// ✅ NUEVA MUTACIÓN: Sincronizar/Recalcular seguimiento
export const SYNC_SEGUIMIENTO_PEI = `
  mutation SyncSeguimientoPei($seguimientoPeiId: Int!) {
    syncSeguimientoPei(seguimientoPeiId: $seguimientoPeiId) {
      success
      message
      data {
        id
        anio
        promediaGeneral
        valoracionGlobal
        observaciones
        porcAlta
        porcMedia
        porcBaja
        fechaRegistro
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
`;

// src/graphql/seguimiento/mutations/seguimientoPei.mutations.ts

export const CREATE_SEGUIMIENTO_PEI = `
  mutation CreateSeguimientoPei(
    $anio: Int!,
    $peiId: Int!,
    $porcAlta: Float!,
    $porcBaja: Float!,
    $porcMedia: Float!,
    $promediaGeneral: Float!,
    $valoracionGlobal: String!,
    $fechaRegistro: Date!,
    $observaciones: String
  ) {
    createSeguimientoPei(
      anio: $anio,
      peiId: $peiId,
      porcAlta: $porcAlta,
      porcBaja: $porcBaja,
      porcMedia: $porcMedia,
      promediaGeneral: $promediaGeneral,
      valoracionGlobal: $valoracionGlobal,
      fechaRegistro: $fechaRegistro,
      observaciones: $observaciones
    ) {
      success
      message
      data {
        id
        anio
        fechaRegistro
        observaciones
        porcAlta
        porcBaja
        porcMedia
        promediaGeneral
        valoracionGlobal
        pei {
          id
          anioFin
          anioIni
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
    $id: Int!,
    $anio: Int,
    $peiId: Int,
    $porcAlta: Float,
    $porcBaja: Float,
    $porcMedia: Float,
    $promediaGeneral: Float,
    $valoracionGlobal: String,
    $fechaRegistro: Date,
    $observaciones: String
  ) {
    updateSeguimientoPei(
      id: $id,
      anio: $anio,
      peiId: $peiId,
      porcAlta: $porcAlta,
      porcBaja: $porcBaja,
      porcMedia: $porcMedia,
      promediaGeneral: $promediaGeneral,
      valoracionGlobal: $valoracionGlobal,
      fechaRegistro: $fechaRegistro,
      observaciones: $observaciones
    ) {
      success
      message
      data {
        id
        anio
        fechaRegistro
        observaciones
        porcAlta
        porcBaja
        porcMedia
        promediaGeneral
        valoracionGlobal
        pei {
          id
          anioFin
          anioIni
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

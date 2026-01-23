// src/graphql/seguimiento/queries/seguimientoPei.queries.ts

export const LIST_SEGUIMIENTOS_PEI = `
  query ListSeguimientosPei($limit: Int, $offset: Int) {
    listSeguimientosPei(limit: $limit, offset: $offset) {
      count
      results {
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

export const GET_SEGUIMIENTO_PEI = `
  query GetSeguimientoPei($id: Int!) {
    getSeguimientoPei(id: $id) {
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

export const GET_SEGUIMIENTOS_PEI_ORDENADOS = `
  query GetSeguimientosPeiOrdenados($limit: Int, $offset: Int, $orderBy: String!) {
    getSeguimientosPeiOrdenados(limit: $limit, offset: $offset, orderBy: $orderBy) {
      count
      results {
        id
        anio
        fechaRegistro
        porcAlta
        porcMedia
        promediaGeneral
        porcBaja
        observaciones
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

export const COUNT_SEGUIMIENTOS_PEI = `
  query CountSeguimientosPei {
    countSeguimientosPei
  }
`;

export const EXISTS_SEGUIMIENTO_PEI = `
  query ExistsSeguimientoPei($id: Int!) {
    existsSeguimientoPei(id: $id)
  }
`;

export const FILTER_SEGUIMIENTOS_POR_ANIO = `
  query FilterSeguimientosPorAnio($anio: Int!, $limit: Int, $offset: Int) {
    filterSeguimientosPorAnio(anio: $anio, limit: $limit, offset: $offset) {
      count
      results {
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

export const FILTER_SEGUIMIENTOS_POR_PEI = `
  query FilterSeguimientosPorPei($peiId: Int!, $limit: Int, $offset: Int) {
    filterSeguimientosPorPei(peiId: $peiId, limit: $limit, offset: $offset) {
      count
      results {
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

import { fetchGraphQL } from "@/shared/lib/graphql-client";

export const SeguimientoPeiService = {
  // --- MUTATIONS ---

  /** Crea un nuevo registro de Seguimiento PEI con sus valoraciones y porcentajes */
  create: async (variables: {
    anio: number;
    promediaGeneral: number;
    valoracionGlobal: string;
    porcAlta: number;
    porcMedia: number;
    porcBaja: number;
    fechaRegistro: string;
    peiId: number;
    observaciones: string;
  }) => {
    const mutation = `
      mutation CreateSeguimientoPei($anio: Int!, $promediaGeneral: Float!, $valoracionGlobal: String!, $porcAlta: Float!, $porcMedia: Float!, $porcBaja: Float!, $fechaRegistro: String!, $peiId: Int!, $observaciones: String!) {
        createSeguimientoPei(
          anio: $anio
          promediaGeneral: $promediaGeneral
          valoracionGlobal: $valoracionGlobal
          porcAlta: $porcAlta
          porcMedia: $porcMedia
          porcBaja: $porcBaja
          fechaRegistro: $fechaRegistro
          peiId: $peiId
          observaciones: $observaciones
        ) {
          success
          message
          data {
            id anio promediaGeneral valoracionGlobal porcAlta porcMedia porcBaja
            pei { id anioIni anioFin }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, variables);
  },

  /** Actualiza datos específicos de un seguimiento existente */
  update: async (
    id: number,
    promediaGeneral: number,
    observaciones: string
  ) => {
    const mutation = `
      mutation UpdateSeguimientoPei($id: ID!, $promediaGeneral: Float!, $observaciones: String!) {
        updateSeguimientoPei(id: $id, promediaGeneral: $promediaGeneral, observaciones: $observaciones) {
          success
          message
          data { id anio promediaGeneral observaciones }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, promediaGeneral, observaciones });
  },

  /** Elimina un registro de seguimiento por su ID */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteSeguimientoPei($id: ID!) {
        deleteSeguimientoPei(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene el detalle completo de un seguimiento */
  getById: async (id: number) => {
    const query = `
      query GetSeguimientoPei($id: ID!) {
        getSeguimientoPei(id: $id) {
          success
          message
          data {
            id anio promediaGeneral valoracionGlobal porcAlta porcMedia porcBaja fechaRegistro
            pei { id anioIni anioFin metaTotal }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todos los seguimientos con paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListSeguimientosPei($limit: Int, $offset: Int) {
        listSeguimientosPei(limit: $limit, offset: $offset) {
          count
          results { id anio promediaGeneral valoracionGlobal fechaRegistro }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Filtra los seguimientos por un PEI específico */
  filterByPei: async (peiId: number, limit = 100) => {
    const query = `
      query FilterByPei($peiId: Int!, $limit: Int) {
        filterSeguimientosPorPei(peiId: $peiId, limit: $limit) {
          count
          results { id anio promediaGeneral pei { id anioIni } }
        }
      }`;
    return fetchGraphQL<any>(query, { peiId, limit });
  },

  /** Filtra los seguimientos por un año específico */
  filterByAnio: async (anio: number, limit = 100) => {
    const query = `
      query FilterByAnio($anio: Int!, $limit: Int) {
        filterSeguimientosPorAnio(anio: $anio, limit: $limit) {
          count
          results { id promediaGeneral valoracionGlobal }
        }
      }`;
    return fetchGraphQL<any>(query, { anio, limit });
  },

  /** Obtiene seguimientos ordenados (ej: "-anio") */
  getOrdered: async (orderBy: string, limit = 100) => {
    const query = `
      query GetOrdered($orderBy: String, $limit: Int) {
        getSeguimientosPeiOrdenados(orderBy: $orderBy, limit: $limit) {
          count
          results { id anio promediaGeneral }
        }
      }`;
    return fetchGraphQL<any>(query, { orderBy, limit });
  },

  /** Retorna el conteo total de registros de seguimiento */
  count: () => fetchGraphQL<any>(`query { countSeguimientosPei }`),
};

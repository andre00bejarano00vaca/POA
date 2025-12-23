import { fetchGraphQL } from '@/lib/graphql-client';

export const IndicadorPeiService = {
  // --- MUTATIONS ---

  /** Crea un nuevo indicador PEI vinculado a un objetivo estratégico */
  create: async (
    description: string, 
    unidadMedida: string, 
    formula: string, 
    lineaBase: number, 
    meta: number, 
    objetivoEstrategicoId: number
  ) => {
    const mutation = `
      mutation CreateIndicador($description: String!, $uMedida: String!, $formula: String!, $lBase: Float!, $meta: Float!, $objId: Int!) {
        createIndicadorPei(
          description: $description
          unidadMedida: $uMedida
          formula: $formula
          lineaBase: $lBase
          meta: $meta
          objetivoEstrategicoId: $objId
        ) {
          success
          message
          data {
            id
            description
            unidadMedida
            formula
            lineaBase
            meta
            objetivoEstrategico { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { 
      description, 
      uMedida: unidadMedida, 
      formula, 
      lBase: lineaBase, 
      meta, 
      objId: objetivoEstrategicoId 
    });
  },

  /** Actualiza la descripción o la meta de un indicador existente */
  update: async (id: number, description: string, meta: number) => {
    const mutation = `
      mutation UpdateIndicador($id: ID!, $description: String!, $meta: Float!) {
        updateIndicadorPei(id: $id, description: $description, meta: $meta) {
          success
          message
          data {
            id
            description
            unidadMedida
            formula
            lineaBase
            meta
            objetivoEstrategico { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, description, meta });
  },

  /** Elimina un indicador PEI por su ID */
  delete: async (id: number) => {
    const mutation = `
      mutation DeleteIndicador($id: ID!) {
        deleteIndicadorPei(id: $id) {
          success
          message
          data
        }
      }`;
    return fetchGraphQL<any>(mutation, { id });
  },

  // --- QUERIES ---

  /** Obtiene un indicador por su ID con el detalle de su objetivo estratégico */
  getById: async (id: number) => {
    const query = `
      query GetIndicador($id: ID!) {
        getIndicadorPei(id: $id) {
          success
          message
          data {
            id
            description
            unidadMedida
            formula
            lineaBase
            meta
            objetivoEstrategico { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista indicadores con soporte para paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListIndicadores($limit: Int, $offset: Int) {
        listIndicadoresPei(limit: $limit, offset: $offset) {
          count
          results {
            id
            description
            unidadMedida
            formula
            lineaBase
            meta
            objetivoEstrategico { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Filtra indicadores por un objetivo estratégico específico */
  filterByObjetivo: async (objetivoEstrategicoId: number, limit = 100) => {
    const query = `
      query FilterByObj($objId: Int!, $limit: Int) {
        filterIndicadoresPorObjetivo(objetivoEstrategicoId: $objId, limit: $limit) {
          count
          results {
            id
            description
            unidadMedida
            lineaBase
            meta
            objetivoEstrategico { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { objId: objetivoEstrategicoId, limit });
  },

  /** Filtra indicadores por un rango de meta (mínimo y máximo) */
  filterByRange: async (metaMin: number, metaMax: number, limit = 100) => {
    const query = `
      query FilterByRange($min: Float!, $max: Float!, $limit: Int) {
        filterIndicadoresPorRangoMeta(metaMin: $min, metaMax: $max, limit: $limit) {
          count
          results {
            id
            description
            meta
            lineaBase
            objetivoEstrategico { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { min: metaMin, max: metaMax, limit });
  },

  /** Obtiene la lista ordenada (ej: "-meta", "description") */
  getOrdered: async (orderBy: string, limit = 100) => {
    const query = `
      query GetOrdered($orderBy: String, $limit: Int) {
        getIndicadoresPeiOrdenados(orderBy: $orderBy, limit: $limit) {
          count
          results {
            id
            description
            meta
            objetivoEstrategico { id description }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { orderBy, limit });
  },

  /** Utilidades para conteo y existencia */
  utils: {
    count: () => fetchGraphQL<any>(`query { countIndicadoresPei }`),
    exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsIndicadorPei(id: $id) }`, { id })
  }
};
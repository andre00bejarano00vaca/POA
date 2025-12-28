import { fetchGraphQL } from '@/lib/graphql-client';

export const IndicadorPeiService = {
  // --- MUTATIONS ---

  /** Crea un nuevo indicador asociado a un objetivo estratégico */
  create: async (variables: {
    description: string;
    unidadMedida: string;
    formula: string;
    lineaBase: number;
    meta: number;
    objetivoEstrategicoId: number;
  }) => {
    const mutation = `
      mutation CreateIndicador($desc: String!, $um: String!, $form: String!, $lb: Float!, $meta: Float!, $objId: Int!) {
        createIndicadorPei(
          description: $desc
          unidadMedida: $um
          formula: $form
          lineaBase: $lb
          meta: $meta
          objetivoEstrategicoId: $objId
        ) {
          success
          message
          data {
            id
            description
            unidadMedida
            meta
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, {
      desc: variables.description,
      um: variables.unidadMedida,
      form: variables.formula,
      lb: variables.lineaBase,
      meta: variables.meta,
      objId: variables.objetivoEstrategicoId
    });
  },

  /** Actualiza los datos de un indicador existente */
  update: async (id: number, description: string, meta: number) => {
    const mutation = `
      mutation UpdateIndicador($id: ID!, $desc: String!, $meta: Float!) {
        updateIndicadorPei(id: $id, description: $desc, meta: $meta) {
          success
          message
          data {
            id
            description
            meta
          }
        }
      }`;
    return fetchGraphQL<any>(mutation, { id, desc: description, meta });
  },

  /** Elimina un indicador por su ID */
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

  /** Obtiene el detalle de un indicador específico */
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
            objetivoEstrategico {
              id
              description
            }
          }
        }
      }`;
    return fetchGraphQL<any>(query, { id });
  },

  /** Lista todos los indicadores con soporte para paginación */
  list: async (limit = 100, offset = 0) => {
    const query = `
      query ListIndicadores($limit: Int, $offset: Int) {
        listIndicadoresPei(limit: $limit, offset: $offset) {
          count
          results {
            id
            description
            unidadMedida
            meta
          }
        }
      }`;
    return fetchGraphQL<any>(query, { limit, offset });
  },

  /** Busca indicadores por descripción (ej: "Tasa de egreso") */
  search: async (text: string, limit = 50) => {
    const query = `
      query SearchIndicadores($search: String!, $limit: Int) {
        searchIndicadoresPei(search: $search, limit: $limit) {
          count
          results {
            id
            description
            meta
          }
        }
      }`;
    return fetchGraphQL<any>(query, { search: text, limit });
  },

  /** Filtra indicadores por un Objetivo Estratégico específico */
  filterByObjetivo: async (objetivoId: number, limit = 100) => {
    const query = `
      query FilterByObj($objId: Int!, $limit: Int) {
        filterIndicadoresPorObjetivo(objetivoEstrategicoId: $objId, limit: $limit) {
          count
          results {
            id
            description
            unidadMedida
            meta
          }
        }
      }`;
    return fetchGraphQL<any>(query, { objId: objetivoId, limit });
  }
};
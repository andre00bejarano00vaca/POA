// import { fetchGraphQL } from "@/shared/lib/graphql-client";

// export const IndicadorPeiService = {
//   // --- MUTATIONS ---

//   /** Crea un nuevo indicador asociado a un objetivo estratégico */
//   create: async (variables: {
//     description: string;
//     unidadMedida: string;
//     formula: string;
//     lineaBase: number;
//     meta: number;
//     objetivoEstrategicoId: number;
//   }) => {
//     const mutation = `
//       mutation CreateIndicador($desc: String!, $um: String!, $form: String!, $lb: Float!, $meta: Float!, $objId: Int!) {
//         createIndicadorPei(
//           description: $desc
//           unidadMedida: $um
//           formula: $form
//           lineaBase: $lb
//           meta: $meta
//           objetivoEstrategicoId: $objId
//         ) {
//           success
//           message
//           data {
//             id
//             description
//             unidadMedida
//             meta
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, {
//       desc: variables.description,
//       um: variables.unidadMedida,
//       form: variables.formula,
//       lb: variables.lineaBase,
//       meta: variables.meta,
//       objId: variables.objetivoEstrategicoId,
//     });
//   },

//   /** Actualiza los datos de un indicador existente */
//   update: async (id: number, description: string, meta: number) => {
//     const mutation = `
//       mutation UpdateIndicador($id: ID!, $desc: String!, $meta: Float!) {
//         updateIndicadorPei(id: $id, description: $desc, meta: $meta) {
//           success
//           message
//           data {
//             id
//             description
//             meta
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, desc: description, meta });
//   },

//   /** Elimina un indicador por su ID */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteIndicador($id: ID!) {
//         deleteIndicadorPei(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene el detalle de un indicador específico */
//   getById: async (id: number) => {
//     const query = `
//       query GetIndicador($id: ID!) {
//         getIndicadorPei(id: $id) {
//           success
//           message
//           data {
//             id
//             description
//             unidadMedida
//             formula
//             lineaBase
//             meta
//             objetivoEstrategico {
//               id
//               description
//             }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista todos los indicadores con soporte para paginación */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListIndicadores($limit: Int, $offset: Int) {
//         listIndicadoresPei(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             description
//             unidadMedida
//             meta
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Busca indicadores por descripción (ej: "Tasa de egreso") */
//   search: async (text: string, limit = 50) => {
//     const query = `
//       query SearchIndicadores($search: String!, $limit: Int) {
//         searchIndicadoresPei(search: $search, limit: $limit) {
//           count
//           results {
//             id
//             description
//             meta
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { search: text, limit });
//   },

//   /** Filtra indicadores por un Objetivo Estratégico específico */
//   filterByObjetivo: async (objetivoId: number, limit = 100) => {
//     const query = `
//       query FilterByObj($objId: Int!, $limit: Int) {
//         filterIndicadoresPorObjetivo(objetivoEstrategicoId: $objId, limit: $limit) {
//           count
//           results {
//             id
//             description
//             unidadMedida
//             meta
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { objId: objetivoId, limit });
//   },
// };

// src/modules/pei/services/indicadorPei.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import {
  normalizeEntity,
  normalizeRelation,
  passthrough,
} from "@/shared/lib/normalizers";
import type {
  IndicadorPei,
  CreateIndicadorPeiInput,
  UpdateIndicadorPeiInput,
} from "../types/indicadorPei.types";

import {
  LIST_INDICADORES_PEI,
  SEARCH_INDICADORES_PEI,
  GET_INDICADOR_PEI,
  FILTER_INDICADORES_POR_OBJETIVO,
} from "@/graphql/pei/queries/indicadorPei.queries";

import {
  CREATE_INDICADOR_PEI,
  UPDATE_INDICADOR_PEI,
  DELETE_INDICADOR_PEI,
} from "@/graphql/pei/mutations/indicadorPei.mutations";

interface MutationResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

interface ListResponse<T> {
  count: number;
  results: T[];
}

interface PaginationParams {
  limit?: number;
  offset?: number;
}

const handleError = createServiceErrorHandler("IndicadorPeiService");

const normalizarIndicadorPei = (indicador: any): IndicadorPei =>
  normalizeEntity<any, IndicadorPei>(indicador, {
    id: passthrough,
    description: passthrough,
    formula: passthrough,
    lineaBase: passthrough,
    meta: passthrough,
    unidadMedida: passthrough,
    objetivoEstrategico: normalizeRelation,
  });

export const IndicadorPeiService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<{ results: IndicadorPei[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return IndicadorPeiService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }

      const response = await fetchGraphQL<{
        listIndicadoresPei: ListResponse<any>;
      }>(LIST_INDICADORES_PEI, { limit, offset });

      const results = response.listIndicadoresPei.results.map(
        normalizarIndicadorPei
      );

      return {
        results,
        count: response.listIndicadoresPei.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: IndicadorPei[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchIndicadoresPei: ListResponse<any>;
      }>(SEARCH_INDICADORES_PEI, {
        search: searchTerm,
        limit,
        offset,
      });

      const results = response.searchIndicadoresPei.results.map(
        normalizarIndicadorPei
      );

      return {
        results,
        count: response.searchIndicadoresPei.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  filterByObjetivo: async (
    objetivoEstrategicoId: number,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: IndicadorPei[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterIndicadoresPorObjetivo: ListResponse<any>;
      }>(FILTER_INDICADORES_POR_OBJETIVO, {
        objetivoEstrategicoId,
        limit,
        offset,
      });

      const results = response.filterIndicadoresPorObjetivo.results.map(
        normalizarIndicadorPei
      );

      return {
        results,
        count: response.filterIndicadoresPorObjetivo.count,
      };
    } catch (error) {
      return handleError("filterByObjetivo", error);
    }
  },

  getById: async (id: number): Promise<IndicadorPei> => {
    try {
      const response = await fetchGraphQL<{
        getIndicadorPei: MutationResponse<any>;
      }>(GET_INDICADOR_PEI, { id });

      if (!response.getIndicadorPei.success || !response.getIndicadorPei.data) {
        throw new Error(
          response.getIndicadorPei.message || "No se encontró el Indicador PEI"
        );
      }

      return normalizarIndicadorPei(response.getIndicadorPei.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (data: CreateIndicadorPeiInput): Promise<IndicadorPei> => {
    try {
      const variables = {
        description: data.description,
        formula: data.formula,
        lineaBase: data.lineaBase,
        meta: data.meta,
        unidadMedida: data.unidadMedida,
        objetivoEstrategicoId: data.objetivoEstrategicoId,
      };

      const response = await fetchGraphQL<{
        createIndicadorPei: MutationResponse<any>;
      }>(CREATE_INDICADOR_PEI, variables);

      if (
        !response.createIndicadorPei.success ||
        !response.createIndicadorPei.data
      ) {
        throw new Error(
          response.createIndicadorPei.message ||
            "No se pudo crear el Indicador PEI"
        );
      }

      return normalizarIndicadorPei(response.createIndicadorPei.data);
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateIndicadorPeiInput
  ): Promise<IndicadorPei> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.description !== undefined)
        variables.description = data.description;
      if (data.formula !== undefined) variables.formula = data.formula;
      if (data.lineaBase !== undefined) variables.lineaBase = data.lineaBase;
      if (data.meta !== undefined) variables.meta = data.meta;
      if (data.unidadMedida !== undefined)
        variables.unidadMedida = data.unidadMedida;
      if (data.objetivoEstrategicoId !== undefined)
        variables.objetivoEstrategicoId = data.objetivoEstrategicoId;

      const response = await fetchGraphQL<{
        updateIndicadorPei: MutationResponse<any>;
      }>(UPDATE_INDICADOR_PEI, variables);

      if (
        !response.updateIndicadorPei.success ||
        !response.updateIndicadorPei.data
      ) {
        throw new Error(
          response.updateIndicadorPei.message ||
            "No se pudo actualizar el Indicador PEI"
        );
      }

      return normalizarIndicadorPei(response.updateIndicadorPei.data);
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteIndicadorPei: MutationResponse<boolean>;
      }>(DELETE_INDICADOR_PEI, { id });

      if (!response.deleteIndicadorPei.success) {
        throw new Error(
          response.deleteIndicadorPei.message ||
            "No se pudo eliminar el Indicador PEI"
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};

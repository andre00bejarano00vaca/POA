// import { fetchGraphQL } from "@/shared/lib/graphql-client";

// export const MatrizPeiService = {
//   // --- MUTATIONS ---

//   /** Crea un nuevo registro en la Matriz PEI */
//   create: async (variables: {
//     peiId: number;
//     objetivoEstrategicoId: number;
//     accionEstrategicaId: number;
//     indicadorPeiId: number;
//     unidadEjecutoraId: number;
//     productoInstitucionalId: number;
//     anioBase: number;
//     metaMedianoPlazo: number;
//   }) => {
//     const mutation = `
//       mutation CreateMatrizPei($peiId: Int!, $objetivoEstrategicoId: Int!, $accionEstrategicaId: Int!, $indicadorPeiId: Int!, $unidadEjecutoraId: Int!, $productoInstitucionalId: Int!, $anioBase: Int!, $metaMedianoPlazo: Float!) {
//         createMatrizPei(
//           peiId: $peiId
//           objetivoEstrategicoId: $objetivoEstrategicoId
//           accionEstrategicaId: $accionEstrategicaId
//           indicadorPeiId: $indicadorPeiId
//           unidadEjecutoraId: $unidadEjecutoraId
//           productoInstitucionalId: $productoInstitucionalId
//           anioBase: $anioBase
//           metaMedianoPlazo: $metaMedianoPlazo
//         ) {
//           success
//           message
//           data {
//             id anioBase metaMedianoPlazo
//             pei { id anioIni anioFin }
//             objetivoEstrategico { id description }
//             accionEstrategica { id description }
//             indicadorPei { id description }
//             unidadEjecutora { id description }
//             productoInstitucional { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, variables);
//   },

//   /** Actualiza la meta de mediano plazo de un registro */
//   update: async (id: number, metaMedianoPlazo: number) => {
//     const mutation = `
//       mutation UpdateMatrizPei($id: ID!, $metaMedianoPlazo: Float!) {
//         updateMatrizPei(id: $id, metaMedianoPlazo: $metaMedianoPlazo) {
//           success
//           message
//           data { id anioBase metaMedianoPlazo }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, metaMedianoPlazo });
//   },

//   /** Elimina un registro de la Matriz PEI */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteMatrizPei($id: ID!) {
//         deleteMatrizPei(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene el detalle completo de un registro por ID */
//   getById: async (id: number) => {
//     const query = `
//       query GetMatrizPei($id: ID!) {
//         getMatrizPei(id: $id) {
//           success
//           message
//           data {
//             id anioBase metaMedianoPlazo
//             pei { id anioIni anioFin metaTotal }
//             objetivoEstrategico { id idOe description }
//             accionEstrategica { id description }
//             indicadorPei { id description formula unidadMedida }
//             unidadEjecutora { id description }
//             productoInstitucional { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista todos los registros con paginación */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListMatricesPei($limit: Int, $offset: Int) {
//         listMatricesPei(limit: $limit, offset: $offset) {
//           count
//           results { id anioBase metaMedianoPlazo }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Filtros especializados */
//   filterByPei: async (peiId: number, limit = 100) => {
//     const query = `
//       query FilterByPei($peiId: Int!, $limit: Int) {
//         filterMatricesPorPei(peiId: $peiId, limit: $limit) {
//           count
//           results { id anioBase metaMedianoPlazo pei { id anioIni } }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { peiId, limit });
//   },

//   filterByUnidadEjecutora: async (unidadEjecutoraId: number, limit = 100) => {
//     const query = `
//       query FilterByUnidad($unidadEjecutoraId: Int!, $limit: Int) {
//         filterMatricesPorUnidadEjecutora(unidadEjecutoraId: $unidadEjecutoraId, limit: $limit) {
//           count
//           results { id anioBase metaMedianoPlazo unidadEjecutora { id description } }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { unidadEjecutoraId, limit });
//   },

//   /** Obtiene registros ordenados por un campo específico (ej: "-meta_mediano_plazo") */
//   getOrdered: async (orderBy: string, limit = 100) => {
//     const query = `
//       query GetOrdered($orderBy: String, $limit: Int) {
//         getMatricesPeiOrdenadas(orderBy: $orderBy, limit: $limit) {
//           count
//           results { id anioBase metaMedianoPlazo }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { orderBy, limit });
//   },
// };

// src/modules/pei/services/matrizPei.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  MatrizPei,
  CreateMatrizPeiInput,
  UpdateMatrizPeiInput,
} from "@/modules/pei/types/matrizPei.types";

import {
  LIST_MATRICES_PEI,
  GET_MATRIZ_PEI,
  FILTER_MATRICES_POR_PEI,
  FILTER_MATRICES_POR_OBJETIVO,
  FILTER_MATRICES_POR_INDICADOR,
  FILTER_MATRICES_POR_UNIDAD_EJECUTORA,
  GET_MATRICES_PEI_ORDENADAS,
  COUNT_MATRICES_PEI,
  EXISTS_MATRIZ_PEI,
} from "@/graphql/pei/queries/matrizPei.queries";

import {
  CREATE_MATRIZ_PEI,
  UPDATE_MATRIZ_PEI,
  DELETE_MATRIZ_PEI,
} from "@/graphql/pei/mutations/matrizPei.mutations";

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

const handleError = createServiceErrorHandler("MatrizPeiService");

const normalizarMatrizPei = (matriz: any): MatrizPei => ({
  id: matriz.id,
  anioBase: matriz.anioBase,
  metaMedianoPlazo: matriz.metaMedianoPlazo,
  pei: matriz.pei || null,
  objetivoEstrategico: matriz.objetivoEstrategico || null,
  productoInstitucional: matriz.productoInstitucional || null,
  accionEstrategica: matriz.accionEstrategica || null,
  indicadorPei: matriz.indicadorPei || null,
  unidadEjecutora: matriz.unidadEjecutora || null,
});

export const MatrizPeiService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string,
  ): Promise<{ results: MatrizPei[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        listMatricesPei: ListResponse<any>;
      }>(LIST_MATRICES_PEI, { limit, offset });

      const results = response.listMatricesPei.results.map(normalizarMatrizPei);

      return {
        results,
        count: response.listMatricesPei.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  filterByPei: async (
    peiId: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: MatrizPei[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterMatricesPorPei: ListResponse<any>;
      }>(FILTER_MATRICES_POR_PEI, { peiId, limit, offset });

      const results =
        response.filterMatricesPorPei.results.map(normalizarMatrizPei);

      return {
        results,
        count: response.filterMatricesPorPei.count,
      };
    } catch (error) {
      return handleError("filterByPei", error);
    }
  },

  filterByObjetivo: async (
    objetivoEstrategicoId: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: MatrizPei[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterMatricesPorObjetivo: ListResponse<any>;
      }>(FILTER_MATRICES_POR_OBJETIVO, {
        objetivoEstrategicoId,
        limit,
        offset,
      });

      const results =
        response.filterMatricesPorObjetivo.results.map(normalizarMatrizPei);

      return {
        results,
        count: response.filterMatricesPorObjetivo.count,
      };
    } catch (error) {
      return handleError("filterByObjetivo", error);
    }
  },

  filterByIndicador: async (
    indicadorPeiId: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: MatrizPei[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterMatricesPorIndicador: ListResponse<any>;
      }>(FILTER_MATRICES_POR_INDICADOR, { indicadorPeiId, limit, offset });

      const results =
        response.filterMatricesPorIndicador.results.map(normalizarMatrizPei);

      return {
        results,
        count: response.filterMatricesPorIndicador.count,
      };
    } catch (error) {
      return handleError("filterByIndicador", error);
    }
  },

  filterByUnidadEjecutora: async (
    unidadEjecutoraId: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: MatrizPei[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterMatricesPorUnidadEjecutora: ListResponse<any>;
      }>(FILTER_MATRICES_POR_UNIDAD_EJECUTORA, {
        unidadEjecutoraId,
        limit,
        offset,
      });

      const results =
        response.filterMatricesPorUnidadEjecutora.results.map(
          normalizarMatrizPei,
        );

      return {
        results,
        count: response.filterMatricesPorUnidadEjecutora.count,
      };
    } catch (error) {
      return handleError("filterByUnidadEjecutora", error);
    }
  },

  getOrdenadas: async (
    orderBy: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: MatrizPei[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        getMatricesPeiOrdenadas: ListResponse<any>;
      }>(GET_MATRICES_PEI_ORDENADAS, { orderBy, limit, offset });

      const results =
        response.getMatricesPeiOrdenadas.results.map(normalizarMatrizPei);

      return {
        results,
        count: response.getMatricesPeiOrdenadas.count,
      };
    } catch (error) {
      return handleError("getOrdenadas", error);
    }
  },

  count: async (): Promise<number> => {
    try {
      const response = await fetchGraphQL<{
        countMatricesPei: number;
      }>(COUNT_MATRICES_PEI, {});

      return response.countMatricesPei;
    } catch (error) {
      return handleError("count", error);
    }
  },

  exists: async (id: number): Promise<boolean> => {
    try {
      const response = await fetchGraphQL<{
        existsMatrizPei: boolean;
      }>(EXISTS_MATRIZ_PEI, { id });

      return response.existsMatrizPei;
    } catch (error) {
      return handleError("exists", error);
    }
  },

  getById: async (id: number): Promise<MatrizPei> => {
    try {
      const response = await fetchGraphQL<{
        getMatrizPei: MutationResponse<any>;
      }>(GET_MATRIZ_PEI, { id });

      if (!response.getMatrizPei.success || !response.getMatrizPei.data) {
        throw new Error(
          response.getMatrizPei.message || "No se encontró la Matriz PEI",
        );
      }

      return normalizarMatrizPei(response.getMatrizPei.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (data: CreateMatrizPeiInput): Promise<MatrizPei> => {
    try {
      const variables = {
        anioBase: Number(data.anioBase),
        metaMedianoPlazo: Number(data.metaMedianoPlazo),
        peiId: Number(data.peiId),
        objetivoEstrategicoId: Number(data.objetivoEstrategicoId),
        productoInstitucionalId: Number(data.productoInstitucionalId),
        accionEstrategicaId: Number(data.accionEstrategicaId),
        indicadorPeiId: Number(data.indicadorPeiId),
        unidadEjecutoraId: Number(data.unidadEjecutoraId),
      };

      const response = await fetchGraphQL<{
        createMatrizPei: MutationResponse<any>;
      }>(CREATE_MATRIZ_PEI, variables);

      if (!response.createMatrizPei.success || !response.createMatrizPei.data) {
        throw new Error(
          response.createMatrizPei.message || "No se pudo crear la Matriz PEI",
        );
      }

      return normalizarMatrizPei(response.createMatrizPei.data);
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateMatrizPeiInput,
  ): Promise<MatrizPei> => {
    try {
      const variables: Record<string, unknown> = { id: Number(id) };

      if (data.anioBase !== undefined)
        variables.anioBase = Number(data.anioBase);
      if (data.metaMedianoPlazo !== undefined)
        variables.metaMedianoPlazo = Number(data.metaMedianoPlazo);
      if (data.peiId !== undefined) variables.peiId = Number(data.peiId);
      if (data.objetivoEstrategicoId !== undefined)
        variables.objetivoEstrategicoId = Number(data.objetivoEstrategicoId);
      if (data.productoInstitucionalId !== undefined)
        variables.productoInstitucionalId = Number(
          data.productoInstitucionalId,
        );
      if (data.accionEstrategicaId !== undefined)
        variables.accionEstrategicaId = Number(data.accionEstrategicaId);
      if (data.indicadorPeiId !== undefined)
        variables.indicadorPeiId = Number(data.indicadorPeiId);
      if (data.unidadEjecutoraId !== undefined)
        variables.unidadEjecutoraId = Number(data.unidadEjecutoraId);

      const response = await fetchGraphQL<{
        updateMatrizPei: MutationResponse<any>;
      }>(UPDATE_MATRIZ_PEI, variables);

      if (!response.updateMatrizPei.success || !response.updateMatrizPei.data) {
        throw new Error(
          response.updateMatrizPei.message ||
            "No se pudo actualizar la Matriz PEI",
        );
      }

      return normalizarMatrizPei(response.updateMatrizPei.data);
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteMatrizPei: MutationResponse<boolean>;
      }>(DELETE_MATRIZ_PEI, { id });

      if (!response.deleteMatrizPei.success) {
        throw new Error(
          response.deleteMatrizPei.message ||
            "No se pudo eliminar la Matriz PEI",
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};

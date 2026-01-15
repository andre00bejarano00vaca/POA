// // src/modules/pei/services/pei.service.ts

// import { fetchGraphQL } from "@/shared/lib/graphql-client";
// import type {
//   PEI,
//   CreatePEIInput,
//   UpdatePEIInput,
// } from "@/modules/pei/types/pei.types";

// // ============================================
// // CONSTANTS
// // ============================================
// const POSTGRES_MAX_INT = 2147483647;
// const BUDGET_TOLERANCE_MIN = 0.8; // 20% menos
// const BUDGET_TOLERANCE_MAX = 1.2; // 20% más
// const EXACT_MATCH_THRESHOLD = 1000; // Bs

// // ============================================
// // TYPES
// // ============================================
// interface MutationResponse<T> {
//   success: boolean;
//   message: string;
//   data: T | null;
// }

// interface ListResponse<T> {
//   count: number;
//   results: T[];
// }

// interface PaginationParams {
//   limit?: number;
//   offset?: number;
// }

// // ============================================
// // HELPER FUNCTIONS
// // ============================================
// const handleServiceError = (operation: string, error: unknown): never => {
//   const message = error instanceof Error ? error.message : "Error desconocido";

//   console.error(`Error en PeiService.${operation}:`, message);
//   throw new Error(message);
// };

// // ============================================
// // SERVICE
// // ============================================
// export const PeiService = {
//   /**
//    * Lista todos los PEIs sin filtros
//    */
//   listAll: async ({ limit = 10, offset = 0 }: PaginationParams = {}): Promise<{
//     results: PEI[];
//     count: number;
//   }> => {
//     const query = `
//       query ListPeis($limit: Int!, $offset: Int!) {
//         listPeis(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             anioIni
//             anioFin
//             observacion
//             metaTotal
//             ejecucion
//           }
//         }
//       }
//     `;

//     try {
//       const response = await fetchGraphQL<{ listPeis: ListResponse<PEI> }>(
//         query,
//         { limit, offset }
//       );

//       return {
//         results: response.listPeis.results,
//         count: response.listPeis.count,
//       };
//     } catch (error) {
//       return handleServiceError("listAll", error);
//     }
//   },

//   /**
//    * Busca PEIs por año de inicio
//    */
//   searchByYear: async (
//     year: number,
//     { limit = 10, offset = 0 }: PaginationParams = {}
//   ): Promise<{ results: PEI[]; count: number }> => {
//     const query = `
//       query FilterPeisPorAnio($anioIni: Int!, $limit: Int!, $offset: Int!) {
//         filterPeisPorAnio(anioIni: $anioIni, limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             anioIni
//             anioFin
//             observacion
//             metaTotal
//             ejecucion
//           }
//         }
//       }
//     `;

//     try {
//       const response = await fetchGraphQL<{
//         filterPeisPorAnio: ListResponse<PEI>;
//       }>(query, { anioIni: year, limit, offset });

//       return {
//         results: response.filterPeisPorAnio.results,
//         count: response.filterPeisPorAnio.count,
//       };
//     } catch (error) {
//       return handleServiceError("searchByYear", error);
//     }
//   },

//   /**
//    * Busca PEIs por rango de presupuesto
//    */
//   searchByBudget: async (
//     amount: number,
//     { limit = 10, offset = 0 }: PaginationParams = {}
//   ): Promise<{ results: PEI[]; count: number }> => {
//     let metaTotalMin: number;
//     let metaTotalMax: number;

//     // Para montos pequeños, búsqueda exacta
//     if (amount < EXACT_MATCH_THRESHOLD) {
//       metaTotalMin = amount;
//       metaTotalMax = amount;
//     } else {
//       // Para montos grandes, búsqueda con tolerancia ±20%
//       metaTotalMin = Math.floor(amount * BUDGET_TOLERANCE_MIN);
//       metaTotalMax = Math.ceil(amount * BUDGET_TOLERANCE_MAX);

//       if (metaTotalMax > POSTGRES_MAX_INT) {
//         metaTotalMax = POSTGRES_MAX_INT;
//       }
//     }

//     const query = `
//       query FilterPeisPorMeta($metaTotalMin: Int!, $metaTotalMax: Int!, $limit: Int!, $offset: Int!) {
//         filterPeisPorMeta(
//           metaTotalMin: $metaTotalMin,
//           metaTotalMax: $metaTotalMax,
//           limit: $limit,
//           offset: $offset
//         ) {
//           count
//           results {
//             id
//             anioIni
//             anioFin
//             observacion
//             metaTotal
//             ejecucion
//           }
//         }
//       }
//     `;

//     try {
//       const response = await fetchGraphQL<{
//         filterPeisPorMeta: ListResponse<PEI>;
//       }>(query, { metaTotalMin, metaTotalMax, limit, offset });

//       return {
//         results: response.filterPeisPorMeta.results,
//         count: response.filterPeisPorMeta.count,
//       };
//     } catch (error) {
//       return handleServiceError("searchByBudget", error);
//     }
//   },

//   /**
//    * Busca PEIs por texto en observaciones
//    */
//   searchByText: async (
//     searchTerm: string,
//     { limit = 10, offset = 0 }: PaginationParams = {}
//   ): Promise<{ results: PEI[]; count: number }> => {
//     const query = `
//       query SearchPeis($search: String!, $limit: Int!, $offset: Int!) {
//         searchPeis(search: $search, limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             anioIni
//             anioFin
//             observacion
//             metaTotal
//             ejecucion
//           }
//         }
//       }
//     `;

//     try {
//       const response = await fetchGraphQL<{ searchPeis: ListResponse<PEI> }>(
//         query,
//         { search: searchTerm, limit, offset }
//       );

//       return {
//         results: response.searchPeis.results,
//         count: response.searchPeis.count,
//       };
//     } catch (error) {
//       return handleServiceError("searchByText", error);
//     }
//   },

//   /**
//    * Obtiene un PEI por ID
//    */
//   getById: async (id: number): Promise<PEI> => {
//     const query = `
//       query GetPei($id: Int!) {
//         getPei(id: $id) {
//           success
//           message
//           data {
//             id
//             anioIni
//             anioFin
//             observacion
//             metaTotal
//             ejecucion
//           }
//         }
//       }
//     `;

//     try {
//       const response = await fetchGraphQL<{ getPei: MutationResponse<PEI> }>(
//         query,
//         { id }
//       );

//       if (!response.getPei.success || !response.getPei.data) {
//         throw new Error(response.getPei.message || "No se encontró el PEI");
//       }

//       return response.getPei.data;
//     } catch (error) {
//       return handleServiceError("getById", error);
//     }
//   },

//   /**
//    * Crea un nuevo PEI
//    */
//   create: async (data: CreatePEIInput): Promise<PEI> => {
//     const mutation = `
//       mutation CreatePei(
//         $anioIni: Date!,
//         $anioFin: Date!,
//         $metaTotal: Int!,
//         $ejecucion: Int!,
//         $observacion: String
//       ) {
//         createPei(
//           anioIni: $anioIni,
//           anioFin: $anioFin,
//           metaTotal: $metaTotal,
//           ejecucion: $ejecucion,
//           observacion: $observacion
//         ) {
//           success
//           message
//           data {
//             id
//             anioIni
//             anioFin
//             observacion
//             metaTotal
//             ejecucion
//           }
//         }
//       }
//     `;

//     try {
//       const variables = {
//         anioIni: data.anioIni,
//         anioFin: data.anioFin,
//         metaTotal: Math.round(data.metaTotal),
//         ejecucion: Math.round(data.ejecucion),
//         observacion: data.observacion || null,
//       };

//       const response = await fetchGraphQL<{ createPei: MutationResponse<PEI> }>(
//         mutation,
//         variables
//       );

//       if (!response.createPei.success || !response.createPei.data) {
//         throw new Error(
//           response.createPei.message || "No se pudo crear el PEI"
//         );
//       }

//       return response.createPei.data;
//     } catch (error) {
//       return handleServiceError("create", error);
//     }
//   },

//   /**
//    * Actualiza un PEI existente
//    */
//   update: async (id: number, data: UpdatePEIInput): Promise<PEI> => {
//     const mutation = `
//       mutation UpdatePei(
//         $id: Int!,
//         $anioIni: Date,
//         $anioFin: Date,
//         $metaTotal: Int,
//         $ejecucion: Int,
//         $observacion: String
//       ) {
//         updatePei(
//           id: $id,
//           anioIni: $anioIni,
//           anioFin: $anioFin,
//           metaTotal: $metaTotal,
//           ejecucion: $ejecucion,
//           observacion: $observacion
//         ) {
//           success
//           message
//           data {
//             id
//             anioIni
//             anioFin
//             observacion
//             metaTotal
//             ejecucion
//           }
//         }
//       }
//     `;

//     try {
//       const variables: Record<string, unknown> = { id };

//       if (data.anioIni !== undefined) variables.anioIni = data.anioIni;
//       if (data.anioFin !== undefined) variables.anioFin = data.anioFin;
//       if (data.metaTotal !== undefined)
//         variables.metaTotal = Math.round(data.metaTotal);
//       if (data.ejecucion !== undefined)
//         variables.ejecucion = Math.round(data.ejecucion);
//       if (data.observacion !== undefined)
//         variables.observacion = data.observacion || null;

//       const response = await fetchGraphQL<{ updatePei: MutationResponse<PEI> }>(
//         mutation,
//         variables
//       );

//       if (!response.updatePei.success || !response.updatePei.data) {
//         throw new Error(
//           response.updatePei.message || "No se pudo actualizar el PEI"
//         );
//       }

//       return response.updatePei.data;
//     } catch (error) {
//       return handleServiceError("update", error);
//     }
//   },

//   /**
//    * Elimina un PEI
//    */
//   delete: async (id: number): Promise<void> => {
//     const mutation = `
//       mutation DeletePei($id: Int!) {
//         deletePei(id: $id) {
//           success
//           message
//           data
//         }
//       }
//     `;

//     try {
//       const response = await fetchGraphQL<{
//         deletePei: MutationResponse<boolean>;
//       }>(mutation, { id });

//       if (!response.deletePei.success) {
//         throw new Error(response.deletePei.message);
//       }
//     } catch (error) {
//       return handleServiceError("delete", error);
//     }
//   },
// };
// src/modules/pei/services/pei.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import type {
  PEI,
  CreatePEIInput,
  UpdatePEIInput,
} from "@/modules/pei/types/pei.types";

import {
  LIST_PEIS,
  FILTER_PEIS_POR_ANIO,
  FILTER_PEIS_POR_META,
  SEARCH_PEIS,
  GET_PEI,
} from "@/graphql/pei/queries/pei.queries";

import {
  CREATE_PEI,
  UPDATE_PEI,
  DELETE_PEI,
} from "@/graphql/pei/mutations/pei.mutations";

import { createServiceErrorHandler } from "@/shared/lib/service-errors";

// CONSTANTS
const POSTGRES_MAX_INT = 2147483647;
const BUDGET_TOLERANCE_MIN = 0.8; // 20% menos
const BUDGET_TOLERANCE_MAX = 1.2; // 20% más
const EXACT_MATCH_THRESHOLD = 1000; // Bs

// TYPES
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

// ERROR HANDLER (shared helper)
const handleError = createServiceErrorHandler("PeiService");

// SERVICE
export const PeiService = {
  /**
   * Lista todos los PEIs sin filtros
   */
  listAll: async ({ limit = 10, offset = 0 }: PaginationParams = {}): Promise<{
    results: PEI[];
    count: number;
  }> => {
    try {
      const response = await fetchGraphQL<{ listPeis: ListResponse<PEI> }>(
        LIST_PEIS,
        { limit, offset }
      );

      return {
        results: response.listPeis.results,
        count: response.listPeis.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  /**
   * Busca PEIs por año de inicio
   */
  searchByYear: async (
    year: number,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: PEI[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterPeisPorAnio: ListResponse<PEI>;
      }>(FILTER_PEIS_POR_ANIO, { anioIni: year, limit, offset });

      return {
        results: response.filterPeisPorAnio.results,
        count: response.filterPeisPorAnio.count,
      };
    } catch (error) {
      return handleError("searchByYear", error);
    }
  },

  /**
   * Busca PEIs por rango de presupuesto (metaTotal)
   */
  searchByBudget: async (
    amount: number,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: PEI[]; count: number }> => {
    let metaTotalMin: number;
    let metaTotalMax: number;

    if (amount < EXACT_MATCH_THRESHOLD) {
      metaTotalMin = amount;
      metaTotalMax = amount;
    } else {
      metaTotalMin = Math.floor(amount * BUDGET_TOLERANCE_MIN);
      metaTotalMax = Math.ceil(amount * BUDGET_TOLERANCE_MAX);

      if (metaTotalMax > POSTGRES_MAX_INT) metaTotalMax = POSTGRES_MAX_INT;
    }

    try {
      const response = await fetchGraphQL<{
        filterPeisPorMeta: ListResponse<PEI>;
      }>(FILTER_PEIS_POR_META, { metaTotalMin, metaTotalMax, limit, offset });

      return {
        results: response.filterPeisPorMeta.results,
        count: response.filterPeisPorMeta.count,
      };
    } catch (error) {
      return handleError("searchByBudget", error);
    }
  },

  /**
   * Busca PEIs por texto en observaciones
   */
  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: PEI[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{ searchPeis: ListResponse<PEI> }>(
        SEARCH_PEIS,
        { search: searchTerm, limit, offset }
      );

      return {
        results: response.searchPeis.results,
        count: response.searchPeis.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  /**
   * Obtiene un PEI por ID
   */
  getById: async (id: number): Promise<PEI> => {
    try {
      const response = await fetchGraphQL<{ getPei: MutationResponse<PEI> }>(
        GET_PEI,
        { id }
      );

      if (!response.getPei.success || !response.getPei.data) {
        throw new Error(response.getPei.message || "No se encontró el PEI");
      }

      return response.getPei.data;
    } catch (error) {
      return handleError("getById", error);
    }
  },

  /**
   * Crea un nuevo PEI
   */
  create: async (data: CreatePEIInput): Promise<PEI> => {
    try {
      const variables = {
        anioIni: data.anioIni,
        anioFin: data.anioFin,
        metaTotal: Math.round(data.metaTotal),
        ejecucion: Math.round(data.ejecucion),
        observacion: data.observacion || null,
      };

      const response = await fetchGraphQL<{ createPei: MutationResponse<PEI> }>(
        CREATE_PEI,
        variables
      );

      if (!response.createPei.success || !response.createPei.data) {
        throw new Error(
          response.createPei.message || "No se pudo crear el PEI"
        );
      }

      return response.createPei.data;
    } catch (error) {
      return handleError("create", error);
    }
  },

  /**
   * Actualiza un PEI existente
   */
  update: async (id: number, data: UpdatePEIInput): Promise<PEI> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.anioIni !== undefined) variables.anioIni = data.anioIni;
      if (data.anioFin !== undefined) variables.anioFin = data.anioFin;

      if (data.metaTotal !== undefined)
        variables.metaTotal = Math.round(data.metaTotal);
      if (data.ejecucion !== undefined)
        variables.ejecucion = Math.round(data.ejecucion);

      if (data.observacion !== undefined)
        variables.observacion = data.observacion || null;

      const response = await fetchGraphQL<{ updatePei: MutationResponse<PEI> }>(
        UPDATE_PEI,
        variables
      );

      if (!response.updatePei.success || !response.updatePei.data) {
        throw new Error(
          response.updatePei.message || "No se pudo actualizar el PEI"
        );
      }

      return response.updatePei.data;
    } catch (error) {
      return handleError("update", error);
    }
  },

  /**
   * Elimina un PEI
   */
  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deletePei: MutationResponse<boolean>;
      }>(DELETE_PEI, { id });

      if (!response.deletePei.success) {
        throw new Error(
          response.deletePei.message || "No se pudo eliminar el PEI"
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};

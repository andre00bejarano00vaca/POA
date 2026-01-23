// // src/modules/poa/services/programacionTrimestralMeta.service.ts

// import { fetchGraphQL } from "@/shared/lib/graphql-client";
// import { createServiceErrorHandler } from "@/shared/lib/service-errors";
// import type {
//   ProgramacionTrimestralMeta,
//   CreateProgramacionTrimestralMetaInput,
//   UpdateProgramacionTrimestralMetaInput,
// } from "@/modules/poa/types/programacionTrimestralMeta.types";

// import {
//   LIST_PROGRAMACIONES_TRIMESTRALES_META_POA,
//   GET_PROGRAMACION_TRIMESTRAL_META_POA,
//   FILTER_PROGRAMACIONES_POR_TRIMESTRE,
//   GET_PROGRAMACIONES_TRIMESTRALES_META_POA_ORDENADAS,
//   COUNT_PROGRAMACIONES_TRIMESTRALES_META_POA,
//   EXISTS_PROGRAMACION_TRIMESTRAL_META_POA,
// } from "@/graphql/poa/queries/programacionTrimestralMeta.queries";

// import {
//   CREATE_PROGRAMACION_TRIMESTRAL_META_POA,
//   UPDATE_PROGRAMACION_TRIMESTRAL_META_POA,
//   DELETE_PROGRAMACION_TRIMESTRAL_META_POA,
// } from "@/graphql/poa/mutations/programacionTrimestralMeta.mutations";

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

// const handleError = createServiceErrorHandler(
//   "ProgramacionTrimestralMetaService",
// );

// const normalizarProgramacionTrimestralMeta = (
//   programacion: any,
// ): ProgramacionTrimestralMeta => ({
//   id: programacion.id,
//   trimestre: programacion.trimestre,
//   programado: programacion.programado,
//   ejecutado: programacion.ejecutado,
//   indicadorPoa: programacion.indicadorPoa || null,
// });

// export const ProgramacionTrimestralMetaService = {
//   listAll: async (
//     limit: number = 10,
//     offset: number = 0,
//     search?: string,
//   ): Promise<{ results: ProgramacionTrimestralMeta[]; count: number }> => {
//     try {
//       // Si hay búsqueda por trimestre
//       if (search && search.trim()) {
//         const trimestre = parseInt(search.trim(), 10);
//         if (!isNaN(trimestre) && trimestre >= 1 && trimestre <= 4) {
//           return ProgramacionTrimestralMetaService.filterByTrimestre(
//             trimestre,
//             { limit, offset },
//           );
//         }
//       }

//       const response = await fetchGraphQL<{
//         listProgramacionesTrimestralesMetaPoa: ListResponse<any>;
//       }>(LIST_PROGRAMACIONES_TRIMESTRALES_META_POA, { limit, offset });

//       const results =
//         response.listProgramacionesTrimestralesMetaPoa.results.map(
//           normalizarProgramacionTrimestralMeta,
//         );

//       return {
//         results,
//         count: response.listProgramacionesTrimestralesMetaPoa.count,
//       };
//     } catch (error) {
//       return handleError("listAll", error);
//     }
//   },

//   filterByTrimestre: async (
//     trimestre: number,
//     { limit = 10, offset = 0 }: PaginationParams = {},
//   ): Promise<{ results: ProgramacionTrimestralMeta[]; count: number }> => {
//     try {
//       const response = await fetchGraphQL<{
//         filterProgramacionesPorTrimestre: ListResponse<any>;
//       }>(FILTER_PROGRAMACIONES_POR_TRIMESTRE, { trimestre, limit, offset });

//       const results = response.filterProgramacionesPorTrimestre.results.map(
//         normalizarProgramacionTrimestralMeta,
//       );

//       return {
//         results,
//         count: response.filterProgramacionesPorTrimestre.count,
//       };
//     } catch (error) {
//       return handleError("filterByTrimestre", error);
//     }
//   },

//   getOrdenadas: async (
//     orderBy: string,
//     { limit = 10, offset = 0 }: PaginationParams = {},
//   ): Promise<{ results: ProgramacionTrimestralMeta[]; count: number }> => {
//     try {
//       const response = await fetchGraphQL<{
//         getProgramacionesTrimestralesMetaPoaOrdenadas: ListResponse<any>;
//       }>(GET_PROGRAMACIONES_TRIMESTRALES_META_POA_ORDENADAS, {
//         orderBy,
//         limit,
//         offset,
//       });

//       const results =
//         response.getProgramacionesTrimestralesMetaPoaOrdenadas.results.map(
//           normalizarProgramacionTrimestralMeta,
//         );

//       return {
//         results,
//         count: response.getProgramacionesTrimestralesMetaPoaOrdenadas.count,
//       };
//     } catch (error) {
//       return handleError("getOrdenadas", error);
//     }
//   },

//   count: async (): Promise<number> => {
//     try {
//       const response = await fetchGraphQL<{
//         countProgramacionesTrimestralesMetaPoa: number;
//       }>(COUNT_PROGRAMACIONES_TRIMESTRALES_META_POA, {});

//       return response.countProgramacionesTrimestralesMetaPoa;
//     } catch (error) {
//       return handleError("count", error);
//     }
//   },

//   exists: async (id: number): Promise<boolean> => {
//     try {
//       const response = await fetchGraphQL<{
//         existsProgramacionTrimestralMetaPoa: boolean;
//       }>(EXISTS_PROGRAMACION_TRIMESTRAL_META_POA, { id });

//       return response.existsProgramacionTrimestralMetaPoa;
//     } catch (error) {
//       return handleError("exists", error);
//     }
//   },

//   getById: async (id: number): Promise<ProgramacionTrimestralMeta> => {
//     try {
//       const response = await fetchGraphQL<{
//         getProgramacionTrimestralMetaPoa: MutationResponse<any>;
//       }>(GET_PROGRAMACION_TRIMESTRAL_META_POA, { id });

//       if (
//         !response.getProgramacionTrimestralMetaPoa.success ||
//         !response.getProgramacionTrimestralMetaPoa.data
//       ) {
//         throw new Error(
//           response.getProgramacionTrimestralMetaPoa.message ||
//             "No se encontró la Programación Trimestral",
//         );
//       }

//       return normalizarProgramacionTrimestralMeta(
//         response.getProgramacionTrimestralMetaPoa.data,
//       );
//     } catch (error) {
//       return handleError("getById", error);
//     }
//   },

//   create: async (
//     data: CreateProgramacionTrimestralMetaInput,
//   ): Promise<ProgramacionTrimestralMeta> => {
//     try {
//       const variables = {
//         trimestre: data.trimestre,
//         programado: data.programado,
//         ejecutado: data.ejecutado,
//         indicadorPoaId: data.indicadorPoaId,
//       };

//       const response = await fetchGraphQL<{
//         createProgramacionTrimestralMetaPoa: MutationResponse<any>;
//       }>(CREATE_PROGRAMACION_TRIMESTRAL_META_POA, variables);

//       if (
//         !response.createProgramacionTrimestralMetaPoa.success ||
//         !response.createProgramacionTrimestralMetaPoa.data
//       ) {
//         throw new Error(
//           response.createProgramacionTrimestralMetaPoa.message ||
//             "No se pudo crear la Programación Trimestral",
//         );
//       }

//       return normalizarProgramacionTrimestralMeta(
//         response.createProgramacionTrimestralMetaPoa.data,
//       );
//     } catch (error) {
//       return handleError("create", error);
//     }
//   },

//   update: async (
//     id: number,
//     data: UpdateProgramacionTrimestralMetaInput,
//   ): Promise<ProgramacionTrimestralMeta> => {
//     try {
//       const variables: Record<string, unknown> = { id };

//       if (data.trimestre !== undefined) variables.trimestre = data.trimestre;
//       if (data.programado !== undefined) variables.programado = data.programado;
//       if (data.ejecutado !== undefined) variables.ejecutado = data.ejecutado;
//       if (data.indicadorPoaId !== undefined)
//         variables.indicadorPoaId = data.indicadorPoaId;

//       const response = await fetchGraphQL<{
//         updateProgramacionTrimestralMetaPoa: MutationResponse<any>;
//       }>(UPDATE_PROGRAMACION_TRIMESTRAL_META_POA, variables);

//       if (
//         !response.updateProgramacionTrimestralMetaPoa.success ||
//         !response.updateProgramacionTrimestralMetaPoa.data
//       ) {
//         throw new Error(
//           response.updateProgramacionTrimestralMetaPoa.message ||
//             "No se pudo actualizar la Programación Trimestral",
//         );
//       }

//       return normalizarProgramacionTrimestralMeta(
//         response.updateProgramacionTrimestralMetaPoa.data,
//       );
//     } catch (error) {
//       return handleError("update", error);
//     }
//   },

//   delete: async (id: number): Promise<void> => {
//     try {
//       const response = await fetchGraphQL<{
//         deleteProgramacionTrimestralMetaPoa: MutationResponse<boolean>;
//       }>(DELETE_PROGRAMACION_TRIMESTRAL_META_POA, { id });

//       if (!response.deleteProgramacionTrimestralMetaPoa.success) {
//         throw new Error(
//           response.deleteProgramacionTrimestralMetaPoa.message ||
//             "No se pudo eliminar la Programación Trimestral",
//         );
//       }
//     } catch (error) {
//       return handleError("delete", error);
//     }
//   },
// };

// src/modules/poa/services/programacionTrimestralMeta.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  ProgramacionTrimestralMeta,
  CreateProgramacionTrimestralMetaInput,
  UpdateProgramacionTrimestralMetaInput,
} from "@/modules/poa/types/programacionTrimestralMeta.types";

import {
  LIST_PROGRAMACIONES_TRIMESTRALES_META_POA,
  GET_PROGRAMACION_TRIMESTRAL_META_POA,
  FILTER_PROGRAMACIONES_POR_TRIMESTRE,
  GET_PROGRAMACIONES_TRIMESTRALES_META_POA_ORDENADAS,
  COUNT_PROGRAMACIONES_TRIMESTRALES_META_POA,
  EXISTS_PROGRAMACION_TRIMESTRAL_META_POA,
} from "@/graphql/poa/queries/programacionTrimestralMeta.queries";

import {
  CREATE_PROGRAMACION_TRIMESTRAL_META_POA,
  UPDATE_PROGRAMACION_TRIMESTRAL_META_POA,
  DELETE_PROGRAMACION_TRIMESTRAL_META_POA,
} from "@/graphql/poa/mutations/programacionTrimestralMeta.mutations";

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

const handleError = createServiceErrorHandler(
  "ProgramacionTrimestralMetaService",
);

const normalizarProgramacionTrimestralMeta = (
  programacion: any,
): ProgramacionTrimestralMeta => ({
  id: programacion.id,
  trimestre: programacion.trimestre,
  programado: programacion.programado,
  ejecutado: programacion.ejecutado,
  indicadorPoa: programacion.indicadorPoa || null,
});

export const ProgramacionTrimestralMetaService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string,
  ): Promise<{ results: ProgramacionTrimestralMeta[]; count: number }> => {
    try {
      // Si hay búsqueda por trimestre
      if (search && search.trim()) {
        const trimestre = parseInt(search.trim(), 10);
        if (!isNaN(trimestre) && trimestre >= 1 && trimestre <= 4) {
          return ProgramacionTrimestralMetaService.filterByTrimestre(
            trimestre,
            { limit, offset },
          );
        }
      }

      const response = await fetchGraphQL<{
        listProgramacionesTrimestralesMetaPoa: ListResponse<any>;
      }>(LIST_PROGRAMACIONES_TRIMESTRALES_META_POA, { limit, offset });

      const results =
        response.listProgramacionesTrimestralesMetaPoa.results.map(
          normalizarProgramacionTrimestralMeta,
        );

      return {
        results,
        count: response.listProgramacionesTrimestralesMetaPoa.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  filterByTrimestre: async (
    trimestre: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: ProgramacionTrimestralMeta[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterProgramacionesPorTrimestre: ListResponse<any>;
      }>(FILTER_PROGRAMACIONES_POR_TRIMESTRE, { trimestre, limit, offset });

      const results = response.filterProgramacionesPorTrimestre.results.map(
        normalizarProgramacionTrimestralMeta,
      );

      return {
        results,
        count: response.filterProgramacionesPorTrimestre.count,
      };
    } catch (error) {
      return handleError("filterByTrimestre", error);
    }
  },

  getOrdenadas: async (
    orderBy: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: ProgramacionTrimestralMeta[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        getProgramacionesTrimestralesMetaPoaOrdenadas: ListResponse<any>;
      }>(GET_PROGRAMACIONES_TRIMESTRALES_META_POA_ORDENADAS, {
        orderBy,
        limit,
        offset,
      });

      const results =
        response.getProgramacionesTrimestralesMetaPoaOrdenadas.results.map(
          normalizarProgramacionTrimestralMeta,
        );

      return {
        results,
        count: response.getProgramacionesTrimestralesMetaPoaOrdenadas.count,
      };
    } catch (error) {
      return handleError("getOrdenadas", error);
    }
  },

  count: async (): Promise<number> => {
    try {
      const response = await fetchGraphQL<{
        countProgramacionesTrimestralesMetaPoa: number;
      }>(COUNT_PROGRAMACIONES_TRIMESTRALES_META_POA, {});

      return response.countProgramacionesTrimestralesMetaPoa;
    } catch (error) {
      return handleError("count", error);
    }
  },

  exists: async (id: number): Promise<boolean> => {
    try {
      const response = await fetchGraphQL<{
        existsProgramacionTrimestralMetaPoa: boolean;
      }>(EXISTS_PROGRAMACION_TRIMESTRAL_META_POA, { id });

      return response.existsProgramacionTrimestralMetaPoa;
    } catch (error) {
      return handleError("exists", error);
    }
  },

  getById: async (id: number): Promise<ProgramacionTrimestralMeta> => {
    try {
      const response = await fetchGraphQL<{
        getProgramacionTrimestralMetaPoa: MutationResponse<any>;
      }>(GET_PROGRAMACION_TRIMESTRAL_META_POA, { id });

      if (
        !response.getProgramacionTrimestralMetaPoa.success ||
        !response.getProgramacionTrimestralMetaPoa.data
      ) {
        throw new Error(
          response.getProgramacionTrimestralMetaPoa.message ||
            "No se encontró la Programación Trimestral",
        );
      }

      return normalizarProgramacionTrimestralMeta(
        response.getProgramacionTrimestralMetaPoa.data,
      );
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (
    data: CreateProgramacionTrimestralMetaInput,
  ): Promise<ProgramacionTrimestralMeta> => {
    try {
      // ✅ Convertir explícitamente a números
      const variables = {
        trimestre: Number(data.trimestre),
        programado: Number(data.programado),
        ejecutado: Number(data.ejecutado),
        indicadorPoaId: Number(data.indicadorPoaId),
      };

      console.log("Variables enviadas:", variables); // Debug

      const response = await fetchGraphQL<{
        createProgramacionTrimestralMetaPoa: MutationResponse<any>;
      }>(CREATE_PROGRAMACION_TRIMESTRAL_META_POA, variables);

      if (
        !response.createProgramacionTrimestralMetaPoa.success ||
        !response.createProgramacionTrimestralMetaPoa.data
      ) {
        throw new Error(
          response.createProgramacionTrimestralMetaPoa.message ||
            "No se pudo crear la Programación Trimestral",
        );
      }

      return normalizarProgramacionTrimestralMeta(
        response.createProgramacionTrimestralMetaPoa.data,
      );
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateProgramacionTrimestralMetaInput,
  ): Promise<ProgramacionTrimestralMeta> => {
    try {
      // ✅ Convertir id y todos los valores a números
      const variables: Record<string, unknown> = { id: Number(id) };

      if (data.trimestre !== undefined)
        variables.trimestre = Number(data.trimestre);
      if (data.programado !== undefined)
        variables.programado = Number(data.programado);
      if (data.ejecutado !== undefined)
        variables.ejecutado = Number(data.ejecutado);
      if (data.indicadorPoaId !== undefined)
        variables.indicadorPoaId = Number(data.indicadorPoaId);

      console.log("Variables de actualización:", variables); // Debug

      const response = await fetchGraphQL<{
        updateProgramacionTrimestralMetaPoa: MutationResponse<any>;
      }>(UPDATE_PROGRAMACION_TRIMESTRAL_META_POA, variables);

      if (
        !response.updateProgramacionTrimestralMetaPoa.success ||
        !response.updateProgramacionTrimestralMetaPoa.data
      ) {
        throw new Error(
          response.updateProgramacionTrimestralMetaPoa.message ||
            "No se pudo actualizar la Programación Trimestral",
        );
      }

      return normalizarProgramacionTrimestralMeta(
        response.updateProgramacionTrimestralMetaPoa.data,
      );
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteProgramacionTrimestralMetaPoa: MutationResponse<boolean>;
      }>(DELETE_PROGRAMACION_TRIMESTRAL_META_POA, { id });

      if (!response.deleteProgramacionTrimestralMetaPoa.success) {
        throw new Error(
          response.deleteProgramacionTrimestralMetaPoa.message ||
            "No se pudo eliminar la Programación Trimestral",
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};

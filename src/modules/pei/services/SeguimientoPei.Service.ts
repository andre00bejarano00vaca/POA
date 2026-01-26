// // src/modules/seguimiento/services/seguimientoPei.service.ts

// import { fetchGraphQL } from "@/shared/lib/graphql-client";
// import { createServiceErrorHandler } from "@/shared/lib/service-errors";
// import type {
//   SeguimientoPei,
//   CreateSeguimientoPeiInput,
//   UpdateSeguimientoPeiInput,
// } from "../types/seguimientoPei.types";

// // Importar queries y mutations
// import {
//   LIST_SEGUIMIENTOS_PEI,
//   GET_SEGUIMIENTO_PEI,
//   GET_SEGUIMIENTOS_PEI_ORDENADOS,
//   COUNT_SEGUIMIENTOS_PEI,
//   EXISTS_SEGUIMIENTO_PEI,
//   FILTER_SEGUIMIENTOS_POR_ANIO,
//   FILTER_SEGUIMIENTOS_POR_PEI,
// } from "@/graphql/pei/queries/seguimientoPei.queries";

// import {
//   CREATE_SEGUIMIENTO_PEI,
//   UPDATE_SEGUIMIENTO_PEI,
//   DELETE_SEGUIMIENTO_PEI,
// } from "@/graphql/pei/mutations/seguimientoPei.mutations";

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

// const handleError = createServiceErrorHandler("SeguimientoPeiService");

// // ===== NORMALIZADOR =====
// const normalizarSeguimientoPei = (seguimiento: any): SeguimientoPei => ({
//   id: seguimiento.id,
//   ano: seguimiento.anio,
//   promedio_general: seguimiento.promediaGeneral,
//   valoracion_global: seguimiento.valoracionGlobal,
//   observaciones: seguimiento.observaciones || "",
//   porc_alta: seguimiento.porcAlta,
//   porc_media: seguimiento.porcMedia,
//   porc_baja: seguimiento.porcBaja,
//   fecha_registro: new Date(seguimiento.fechaRegistro),
//   pei_id_pei: seguimiento.pei?.id || 0,
//   pei: seguimiento.pei || null,
// });

// // ===== SERVICE =====
// export const SeguimientoPeiService = {
//   listAll: async ({ limit = 10, offset = 0 }: PaginationParams = {}): Promise<{
//     results: SeguimientoPei[];
//     count: number;
//   }> => {
//     try {
//       const response = await fetchGraphQL<{
//         listSeguimientosPei: ListResponse<any>;
//       }>(LIST_SEGUIMIENTOS_PEI, { limit, offset });

//       const results = response.listSeguimientosPei.results.map(
//         normalizarSeguimientoPei,
//       );

//       return {
//         results,
//         count: response.listSeguimientosPei.count,
//       };
//     } catch (error) {
//       return handleError("listAll", error);
//     }
//   },

//   getById: async (id: number): Promise<SeguimientoPei> => {
//     try {
//       const response = await fetchGraphQL<{
//         getSeguimientoPei: MutationResponse<any>;
//       }>(GET_SEGUIMIENTO_PEI, { id });

//       if (
//         !response.getSeguimientoPei.success ||
//         !response.getSeguimientoPei.data
//       ) {
//         throw new Error(
//           response.getSeguimientoPei.message ||
//             "No se encontró el Seguimiento PEI",
//         );
//       }

//       return normalizarSeguimientoPei(response.getSeguimientoPei.data);
//     } catch (error) {
//       return handleError("getById", error);
//     }
//   },

//   create: async (data: CreateSeguimientoPeiInput): Promise<SeguimientoPei> => {
//     try {
//       const variables = {
//         anio: data.ano,
//         peiId: data.pei_id_pei,
//         porcAlta: data.porc_alta,
//         porcBaja: data.porc_baja,
//         porcMedia: data.porc_media,
//         promediaGeneral: data.promedio_general,
//         valoracionGlobal: data.valoracion_global,
//         fechaRegistro: data.fecha_registro
//           ? new Date(data.fecha_registro)
//           : new Date(),
//         observaciones: data.observaciones,
//       };

//       const response = await fetchGraphQL<{
//         createSeguimientoPei: MutationResponse<any>;
//       }>(CREATE_SEGUIMIENTO_PEI, variables);

//       if (
//         !response.createSeguimientoPei.success ||
//         !response.createSeguimientoPei.data
//       ) {
//         throw new Error(
//           response.createSeguimientoPei.message ||
//             "No se pudo crear el Seguimiento PEI",
//         );
//       }

//       return normalizarSeguimientoPei(response.createSeguimientoPei.data);
//     } catch (error) {
//       return handleError("create", error);
//     }
//   },

//   update: async (
//     id: number,
//     data: UpdateSeguimientoPeiInput,
//   ): Promise<SeguimientoPei> => {
//     try {
//       const variables: Record<string, unknown> = { id };

//       if (data.ano !== undefined) variables.anio = data.ano;
//       if (data.pei_id_pei !== undefined) variables.peiId = data.pei_id_pei;
//       if (data.porc_alta !== undefined) variables.porcAlta = data.porc_alta;
//       if (data.porc_baja !== undefined) variables.porcBaja = data.porc_baja;
//       if (data.porc_media !== undefined) variables.porcMedia = data.porc_media;
//       if (data.promedio_general !== undefined)
//         variables.promediaGeneral = data.promedio_general;
//       if (data.valoracion_global !== undefined)
//         variables.valoracionGlobal = data.valoracion_global;
//       if (data.fecha_registro !== undefined)
//         variables.fechaRegistro = new Date(data.fecha_registro);
//       if (data.observaciones !== undefined)
//         variables.observaciones = data.observaciones;

//       const response = await fetchGraphQL<{
//         updateSeguimientoPei: MutationResponse<any>;
//       }>(UPDATE_SEGUIMIENTO_PEI, variables);

//       if (
//         !response.updateSeguimientoPei.success ||
//         !response.updateSeguimientoPei.data
//       ) {
//         throw new Error(
//           response.updateSeguimientoPei.message ||
//             "No se pudo actualizar el Seguimiento PEI",
//         );
//       }

//       return normalizarSeguimientoPei(response.updateSeguimientoPei.data);
//     } catch (error) {
//       return handleError("update", error);
//     }
//   },

//   delete: async (id: number): Promise<void> => {
//     try {
//       const response = await fetchGraphQL<{
//         deleteSeguimientoPei: MutationResponse<boolean>;
//       }>(DELETE_SEGUIMIENTO_PEI, { id });

//       if (!response.deleteSeguimientoPei.success) {
//         throw new Error(
//           response.deleteSeguimientoPei.message ||
//             "No se pudo eliminar el Seguimiento PEI",
//         );
//       }
//     } catch (error) {
//       return handleError("delete", error);
//     }
//   },

//   // ===== MÉTODOS ADICIONALES =====
//   count: async (): Promise<number> => {
//     try {
//       const response = await fetchGraphQL<{
//         countSeguimientosPei: number;
//       }>(COUNT_SEGUIMIENTOS_PEI, {});

//       return response.countSeguimientosPei;
//     } catch (error) {
//       return handleError("count", error);
//     }
//   },

//   exists: async (id: number): Promise<boolean> => {
//     try {
//       const response = await fetchGraphQL<{
//         existsSeguimientoPei: boolean;
//       }>(EXISTS_SEGUIMIENTO_PEI, { id });

//       return response.existsSeguimientoPei;
//     } catch (error) {
//       return handleError("exists", error);
//     }
//   },

//   getOrdenados: async (
//     orderBy: string,
//     { limit = 10, offset = 0 }: PaginationParams = {},
//   ): Promise<{ results: SeguimientoPei[]; count: number }> => {
//     try {
//       const response = await fetchGraphQL<{
//         getSeguimientosPeiOrdenados: ListResponse<any>;
//       }>(GET_SEGUIMIENTOS_PEI_ORDENADOS, { orderBy, limit, offset });

//       const results = response.getSeguimientosPeiOrdenados.results.map(
//         normalizarSeguimientoPei,
//       );

//       return {
//         results,
//         count: response.getSeguimientosPeiOrdenados.count,
//       };
//     } catch (error) {
//       return handleError("getOrdenados", error);
//     }
//   },

//   filterByAnio: async (
//     anio: number,
//     { limit = 10, offset = 0 }: PaginationParams = {},
//   ): Promise<{ results: SeguimientoPei[]; count: number }> => {
//     try {
//       const response = await fetchGraphQL<{
//         filterSeguimientosPorAnio: ListResponse<any>;
//       }>(FILTER_SEGUIMIENTOS_POR_ANIO, { anio, limit, offset });

//       const results = response.filterSeguimientosPorAnio.results.map(
//         normalizarSeguimientoPei,
//       );

//       return {
//         results,
//         count: response.filterSeguimientosPorAnio.count,
//       };
//     } catch (error) {
//       return handleError("filterByAnio", error);
//     }
//   },

//   filterByPei: async (
//     peiId: number,
//     { limit = 10, offset = 0 }: PaginationParams = {},
//   ): Promise<{ results: SeguimientoPei[]; count: number }> => {
//     try {
//       const response = await fetchGraphQL<{
//         filterSeguimientosPorPei: ListResponse<any>;
//       }>(FILTER_SEGUIMIENTOS_POR_PEI, { peiId, limit, offset });

//       const results = response.filterSeguimientosPorPei.results.map(
//         normalizarSeguimientoPei,
//       );

//       return {
//         results,
//         count: response.filterSeguimientosPorPei.count,
//       };
//     } catch (error) {
//       return handleError("filterByPei", error);
//     }
//   },
// };

// src/modules/seguimiento/services/seguimientoPei.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  SeguimientoPei,
  CreateSeguimientoPeiInput,
  UpdateSeguimientoPeiInput,
} from "../types/seguimientoPei.types";

import {
  LIST_SEGUIMIENTOS_PEI,
  GET_SEGUIMIENTO_PEI,
  GET_SEGUIMIENTOS_PEI_ORDENADOS,
  COUNT_SEGUIMIENTOS_PEI,
  EXISTS_SEGUIMIENTO_PEI,
  FILTER_SEGUIMIENTOS_POR_ANIO,
  FILTER_SEGUIMIENTOS_POR_PEI,
} from "@/graphql/pei/queries/seguimientoPei.queries";

import {
  CREATE_SEGUIMIENTO_PEI,
  UPDATE_SEGUIMIENTO_PEI,
  DELETE_SEGUIMIENTO_PEI,
  SYNC_SEGUIMIENTO_PEI,
} from "@/graphql/pei/mutations/seguimientoPei.mutations";

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

const handleError = createServiceErrorHandler("SeguimientoPeiService");

/**
 * Convierte cualquier formato de fecha a YYYY-MM-DD para GraphQL
 */
const formatearFechaParaGraphQL = (fecha?: string | Date): string => {
  if (!fecha) {
    return new Date().toISOString().split("T")[0];
  }
  if (fecha instanceof Date) {
    return fecha.toISOString().split("T")[0];
  }
  return fecha.split("T")[0];
};

const normalizarSeguimientoPei = (seguimiento: any): SeguimientoPei => ({
  id: seguimiento.id,
  ano: seguimiento.anio,
  promedio_general: seguimiento.promediaGeneral,
  valoracion_global: seguimiento.valoracionGlobal,
  observaciones: seguimiento.observaciones || "",
  porc_alta: seguimiento.porcAlta,
  porc_media: seguimiento.porcMedia,
  porc_baja: seguimiento.porcBaja,
  fecha_registro: new Date(seguimiento.fechaRegistro),
  pei_id_pei: seguimiento.pei?.id || 0,
  pei: seguimiento.pei || null,
});

export const SeguimientoPeiService = {
  listAll: async ({ limit = 10, offset = 0 }: PaginationParams = {}): Promise<{
    results: SeguimientoPei[];
    count: number;
  }> => {
    try {
      const response = await fetchGraphQL<{
        listSeguimientosPei: ListResponse<any>;
      }>(LIST_SEGUIMIENTOS_PEI, { limit, offset });

      const results = response.listSeguimientosPei.results.map(
        normalizarSeguimientoPei,
      );

      return {
        results,
        count: response.listSeguimientosPei.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  getById: async (id: number): Promise<SeguimientoPei> => {
    try {
      const response = await fetchGraphQL<{
        getSeguimientoPei: MutationResponse<any>;
      }>(GET_SEGUIMIENTO_PEI, { id });

      if (
        !response.getSeguimientoPei.success ||
        !response.getSeguimientoPei.data
      ) {
        throw new Error(
          response.getSeguimientoPei.message ||
            "No se encontró el Seguimiento PEI",
        );
      }

      return normalizarSeguimientoPei(response.getSeguimientoPei.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (data: CreateSeguimientoPeiInput): Promise<SeguimientoPei> => {
    try {
      const variables = {
        anio: data.ano,
        peiId: data.pei_id_pei,
        porcAlta: data.porc_alta,
        porcBaja: data.porc_baja,
        porcMedia: data.porc_media,
        promediaGeneral: data.promedio_general,
        valoracionGlobal: data.valoracion_global,
        fechaRegistro: formatearFechaParaGraphQL(data.fecha_registro),
        observaciones: data.observaciones,
      };

      const response = await fetchGraphQL<{
        createSeguimientoPei: MutationResponse<any>;
      }>(CREATE_SEGUIMIENTO_PEI, variables);

      if (
        !response.createSeguimientoPei.success ||
        !response.createSeguimientoPei.data
      ) {
        throw new Error(
          response.createSeguimientoPei.message ||
            "No se pudo crear el Seguimiento PEI",
        );
      }

      return normalizarSeguimientoPei(response.createSeguimientoPei.data);
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateSeguimientoPeiInput,
  ): Promise<SeguimientoPei> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.ano !== undefined) variables.anio = data.ano;
      if (data.pei_id_pei !== undefined) variables.peiId = data.pei_id_pei;
      if (data.porc_alta !== undefined) variables.porcAlta = data.porc_alta;
      if (data.porc_baja !== undefined) variables.porcBaja = data.porc_baja;
      if (data.porc_media !== undefined) variables.porcMedia = data.porc_media;
      if (data.promedio_general !== undefined)
        variables.promediaGeneral = data.promedio_general;
      if (data.valoracion_global !== undefined)
        variables.valoracionGlobal = data.valoracion_global;
      if (data.fecha_registro !== undefined)
        variables.fechaRegistro = formatearFechaParaGraphQL(
          data.fecha_registro,
        );
      if (data.observaciones !== undefined)
        variables.observaciones = data.observaciones;

      const response = await fetchGraphQL<{
        updateSeguimientoPei: MutationResponse<any>;
      }>(UPDATE_SEGUIMIENTO_PEI, variables);

      if (
        !response.updateSeguimientoPei.success ||
        !response.updateSeguimientoPei.data
      ) {
        throw new Error(
          response.updateSeguimientoPei.message ||
            "No se pudo actualizar el Seguimiento PEI",
        );
      }

      return normalizarSeguimientoPei(response.updateSeguimientoPei.data);
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteSeguimientoPei: MutationResponse<boolean>;
      }>(DELETE_SEGUIMIENTO_PEI, { id });

      if (!response.deleteSeguimientoPei.success) {
        throw new Error(
          response.deleteSeguimientoPei.message ||
            "No se pudo eliminar el Seguimiento PEI",
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },

  // ✅ NUEVO: Sincronizar/Recalcular seguimiento
  sync: async (seguimientoPeiId: number): Promise<SeguimientoPei> => {
    try {
      const response = await fetchGraphQL<{
        syncSeguimientoPei: MutationResponse<any>;
      }>(SYNC_SEGUIMIENTO_PEI, { seguimientoPeiId });

      if (
        !response.syncSeguimientoPei.success ||
        !response.syncSeguimientoPei.data
      ) {
        throw new Error(
          response.syncSeguimientoPei.message ||
            "No se pudo sincronizar el Seguimiento PEI",
        );
      }

      return normalizarSeguimientoPei(response.syncSeguimientoPei.data);
    } catch (error) {
      return handleError("sync", error);
    }
  },

  count: async (): Promise<number> => {
    try {
      const response = await fetchGraphQL<{
        countSeguimientosPei: number;
      }>(COUNT_SEGUIMIENTOS_PEI, {});

      return response.countSeguimientosPei;
    } catch (error) {
      return handleError("count", error);
    }
  },

  exists: async (id: number): Promise<boolean> => {
    try {
      const response = await fetchGraphQL<{
        existsSeguimientoPei: boolean;
      }>(EXISTS_SEGUIMIENTO_PEI, { id });

      return response.existsSeguimientoPei;
    } catch (error) {
      return handleError("exists", error);
    }
  },

  getOrdenados: async (
    orderBy: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: SeguimientoPei[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        getSeguimientosPeiOrdenados: ListResponse<any>;
      }>(GET_SEGUIMIENTOS_PEI_ORDENADOS, { orderBy, limit, offset });

      const results = response.getSeguimientosPeiOrdenados.results.map(
        normalizarSeguimientoPei,
      );

      return {
        results,
        count: response.getSeguimientosPeiOrdenados.count,
      };
    } catch (error) {
      return handleError("getOrdenados", error);
    }
  },

  filterByAnio: async (
    anio: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: SeguimientoPei[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterSeguimientosPorAnio: ListResponse<any>;
      }>(FILTER_SEGUIMIENTOS_POR_ANIO, { anio, limit, offset });

      const results = response.filterSeguimientosPorAnio.results.map(
        normalizarSeguimientoPei,
      );

      return {
        results,
        count: response.filterSeguimientosPorAnio.count,
      };
    } catch (error) {
      return handleError("filterByAnio", error);
    }
  },

  filterByPei: async (
    peiId: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: SeguimientoPei[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterSeguimientosPorPei: ListResponse<any>;
      }>(FILTER_SEGUIMIENTOS_POR_PEI, { peiId, limit, offset });

      const results = response.filterSeguimientosPorPei.results.map(
        normalizarSeguimientoPei,
      );

      return {
        results,
        count: response.filterSeguimientosPorPei.count,
      };
    } catch (error) {
      return handleError("filterByPei", error);
    }
  },
};

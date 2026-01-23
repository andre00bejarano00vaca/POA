// import { fetchGraphQL } from "@/shared/lib/graphql-client";

// export const SeguimientoPeiObjetivoService = {
//   // --- MUTATIONS ---

//   /** Crea un nuevo registro de seguimiento para un objetivo estratégico */
//   create: async (variables: {
//     promedioCumplimiento: number;
//     escalaValoracion: string;
//     valoracionCualitativa: string;
//     seguimientoPeiId: number;
//     objetivoEstrategicoId: number;
//   }) => {
//     const mutation = `
//       mutation CreateSeguimientoObj($promedio: Float!, $escala: String!, $qual: String!, $segId: Int!, $objId: Int!) {
//         createSeguimientoPeiObjetivo(
//           promedioCumplimiento: $promedio
//           escalaValoracion: $escala
//           valoracionCualitativa: $qual
//           seguimientoPeiId: $segId
//           objetivoEstrategicoId: $objId
//         ) {
//           success
//           message
//           data {
//             id
//             promedioCumplimiento
//             escalaValoracion
//             objetivoEstrategico { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, {
//       promedio: variables.promedioCumplimiento,
//       escala: variables.escalaValoracion,
//       qual: variables.valoracionCualitativa,
//       segId: variables.seguimientoPeiId,
//       objId: variables.objetivoEstrategicoId,
//     });
//   },

//   /** Actualiza el cumplimiento y la valoración cualitativa */
//   update: async (
//     id: number,
//     promedio: number,
//     valoracionCualitativa: string
//   ) => {
//     const mutation = `
//       mutation UpdateSeguimientoObj($id: ID!, $promedio: Float!, $qual: String!) {
//         updateSeguimientoPeiObjetivo(
//           id: $id
//           promedioCumplimiento: $promedio
//           valoracionCualitativa: $qual
//         ) {
//           success
//           message
//           data {
//             id
//             promedioCumplimiento
//             valoracionCualitativa
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, {
//       id,
//       promedio,
//       qual: valoracionCualitativa,
//     });
//   },

//   /** Elimina un registro de seguimiento */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteSeguimientoObj($id: ID!) {
//         deleteSeguimientoPeiObjetivo(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene el detalle de un seguimiento específico con sus relaciones */
//   getById: async (id: number) => {
//     const query = `
//       query GetSeguimientoObj($id: ID!) {
//         getSeguimientoPeiObjetivo(id: $id) {
//           success
//           message
//           data {
//             id
//             promedioCumplimiento
//             escalaValoracion
//             valoracionCualitativa
//             seguimientoPei { id anio }
//             objetivoEstrategico { id description idOe }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista todos los seguimientos de objetivos con paginación */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListSeguimientosObj($limit: Int, $offset: Int) {
//         listSeguimientosPeiObjetivos(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             promedioCumplimiento
//             escalaValoracion
//             valoracionCualitativa
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Filtra los resultados por un Seguimiento PEI (Cabecera) */
//   filterBySeguimientoPei: async (seguimientoPeiId: number, limit = 100) => {
//     const query = `
//       query FilterBySegPei($segId: Int!, $limit: Int) {
//         filterSeguimientosPorSeguimientoPei(seguimientoPeiId: $segId, limit: $limit) {
//           count
//           results {
//             id
//             promedioCumplimiento
//             escalaValoracion
//             seguimientoPei { anio }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { segId: seguimientoPeiId, limit });
//   },

//   /** Filtra los resultados por un Objetivo Estratégico específico */
//   filterByObjetivo: async (objetivoId: number, limit = 100) => {
//     const query = `
//       query FilterByObj($objId: Int!, $limit: Int) {
//         filterSeguimientosPorObjetivo(objetivoEstrategicoId: $objId, limit: $limit) {
//           count
//           results {
//             id
//             promedioCumplimiento
//             objetivoEstrategico { description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { objId: objetivoId, limit });
//   },

//   /** Filtra por escala de valoración (ej: "Excelente", "Satisfactorio") */
//   filterByEscala: async (escala: string, limit = 100) => {
//     const query = `
//       query FilterByEscala($escala: String!, $limit: Int) {
//         filterSeguimientosPorEscala(escalaValoracion: $escala, limit: $limit) {
//           count
//           results {
//             id
//             promedioCumplimiento
//             escalaValoracion
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { escala, limit });
//   },
// };

// src/modules/seguimiento/services/seguimientoPeiObjetivo.service.ts

// import { fetchGraphQL } from "@/shared/lib/graphql-client";
// import { createServiceErrorHandler } from "@/shared/lib/service-errors";
// import type {
//   SeguimientoPeiObjetivo,
//   CreateSeguimientoPeiObjetivoInput,
//   UpdateSeguimientoPeiObjetivoInput,
// } from "../types/seguimientoPei.types";

// // Importar queries y mutations
// import {
//   LIST_SEGUIMIENTOS_PEI_OBJETIVOS,
//   GET_SEGUIMIENTO_PEI_OBJETIVO,
//   GET_SEGUIMIENTOS_PEI_OBJETIVOS_ORDENADOS,
//   COUNT_SEGUIMIENTOS_PEI_OBJETIVOS,
//   EXISTS_SEGUIMIENTO_PEI_OBJETIVO,
//   FILTER_OBJETIVOS_POR_SEGUIMIENTO,
// } from "@/graphql/pei/queries/seguimientoPeiObjetivo.queries";

// import {
//   CREATE_SEGUIMIENTO_PEI_OBJETIVO,
//   UPDATE_SEGUIMIENTO_PEI_OBJETIVO,
//   DELETE_SEGUIMIENTO_PEI_OBJETIVO,
// } from "@/graphql/pei/mutations/seguimientoPeiObjetivo.mutations";

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

// const handleError = createServiceErrorHandler("SeguimientoPeiObjetivoService");

// // ===== NORMALIZADOR =====
// const normalizarSeguimientoPeiObjetivo = (
//   objetivo: any,
// ): SeguimientoPeiObjetivo => ({
//   id: objetivo.id,
//   promedio_cumplimiento: objetivo.promedioCumplimiento,
//   escala_valoracion: objetivo.escalaValoracion,
//   valoracion_cualitativa: objetivo.valoracionCualitativa || "",
//   seguimiento_pei_id_spo: objetivo.seguimientoPei?.id || 0,
//   objetivo_estrategico_id_oe: objetivo.objetivoEstrategico?.id || 0,
//   objetivo_estrategico: objetivo.objetivoEstrategico
//     ? {
//         id: objetivo.objetivoEstrategico.id,
//         nombre: objetivo.objetivoEstrategico.description,
//         description: objetivo.objetivoEstrategico.description,
//       }
//     : undefined,
//   seguimiento_pei: objetivo.seguimientoPei,
// });

// // ===== SERVICE =====
// export const SeguimientoPeiObjetivoService = {
//   listAll: async ({ limit = 10, offset = 0 }: PaginationParams = {}): Promise<{
//     results: SeguimientoPeiObjetivo[];
//     count: number;
//   }> => {
//     try {
//       const response = await fetchGraphQL<{
//         listSeguimientosPeiObjetivos: ListResponse<any>;
//       }>(LIST_SEGUIMIENTOS_PEI_OBJETIVOS, { limit, offset });

//       const results = response.listSeguimientosPeiObjetivos.results.map(
//         normalizarSeguimientoPeiObjetivo,
//       );

//       return {
//         results,
//         count: response.listSeguimientosPeiObjetivos.count,
//       };
//     } catch (error) {
//       return handleError("listAll", error);
//     }
//   },

//   getBySeguimientoId: async (
//     seguimientoPeiId: number,
//   ): Promise<SeguimientoPeiObjetivo[]> => {
//     try {
//       // Para una implementación más eficiente, podrías crear una query específica
//       // Por ahora filtraremos de la lista completa
//       const response = await fetchGraphQL<{
//         filterObjetivosPorSeguimiento: ListResponse<any>;
//       }>(FILTER_OBJETIVOS_POR_SEGUIMIENTO, {
//         seguimientoPeiId,
//         limit: 100,
//         offset: 0,
//       });

//       return response.filterObjetivosPorSeguimiento.results.map(
//         normalizarSeguimientoPeiObjetivo,
//       );
//     } catch (error) {
//       // Fallback: usar lista completa y filtrar
//       try {
//         const allResponse = await fetchGraphQL<{
//           listSeguimientosPeiObjetivos: ListResponse<any>;
//         }>(LIST_SEGUIMIENTOS_PEI_OBJETIVOS, { limit: 100, offset: 0 });

//         const allObjetivos =
//           allResponse.listSeguimientosPeiObjetivos.results.map(
//             normalizarSeguimientoPeiObjetivo,
//           );

//         return allObjetivos.filter(
//           (obj) => obj.seguimiento_pei_id_spo === seguimientoPeiId,
//         );
//       } catch (fallbackError) {
//         return handleError("getBySeguimientoId", fallbackError);
//       }
//     }
//   },

//   getById: async (id: number): Promise<SeguimientoPeiObjetivo> => {
//     try {
//       const response = await fetchGraphQL<{
//         getSeguimientoPeiObjetivo: MutationResponse<any>;
//       }>(GET_SEGUIMIENTO_PEI_OBJETIVO, { id });

//       if (
//         !response.getSeguimientoPeiObjetivo.success ||
//         !response.getSeguimientoPeiObjetivo.data
//       ) {
//         throw new Error(
//           response.getSeguimientoPeiObjetivo.message ||
//             "No se encontró el objetivo",
//         );
//       }

//       return normalizarSeguimientoPeiObjetivo(
//         response.getSeguimientoPeiObjetivo.data,
//       );
//     } catch (error) {
//       return handleError("getById", error);
//     }
//   },

//   create: async (
//     data: CreateSeguimientoPeiObjetivoInput,
//   ): Promise<SeguimientoPeiObjetivo> => {
//     try {
//       const variables = {
//         escalaValoracion: data.escala_valoracion,
//         objetivoEstrategicoId: data.objetivo_estrategico_id_oe,
//         promedioCumplimiento: data.promedio_cumplimiento,
//         seguimientoPeiId: data.seguimiento_pei_id_spo,
//         valoracionCualitativa: data.valoracion_cualitativa,
//       };

//       const response = await fetchGraphQL<{
//         createSeguimientoPeiObjetivo: MutationResponse<any>;
//       }>(CREATE_SEGUIMIENTO_PEI_OBJETIVO, variables);

//       if (
//         !response.createSeguimientoPeiObjetivo.success ||
//         !response.createSeguimientoPeiObjetivo.data
//       ) {
//         throw new Error(
//           response.createSeguimientoPeiObjetivo.message ||
//             "No se pudo crear el objetivo",
//         );
//       }

//       return normalizarSeguimientoPeiObjetivo(
//         response.createSeguimientoPeiObjetivo.data,
//       );
//     } catch (error) {
//       return handleError("create", error);
//     }
//   },

//   update: async (
//     id: number,
//     data: UpdateSeguimientoPeiObjetivoInput,
//   ): Promise<SeguimientoPeiObjetivo> => {
//     try {
//       const variables: Record<string, unknown> = { id };

//       if (data.escala_valoracion !== undefined)
//         variables.escalaValoracion = data.escala_valoracion;
//       if (data.objetivo_estrategico_id_oe !== undefined)
//         variables.objetivoEstrategicoId = data.objetivo_estrategico_id_oe;
//       if (data.promedio_cumplimiento !== undefined)
//         variables.promedioCumplimiento = data.promedio_cumplimiento;
//       if (data.valoracion_cualitativa !== undefined)
//         variables.valoracionCualitativa = data.valoracion_cualitativa;

//       const response = await fetchGraphQL<{
//         updateSeguimientoPeiObjetivo: MutationResponse<any>;
//       }>(UPDATE_SEGUIMIENTO_PEI_OBJETIVO, variables);

//       if (
//         !response.updateSeguimientoPeiObjetivo.success ||
//         !response.updateSeguimientoPeiObjetivo.data
//       ) {
//         throw new Error(
//           response.updateSeguimientoPeiObjetivo.message ||
//             "No se pudo actualizar el objetivo",
//         );
//       }

//       return normalizarSeguimientoPeiObjetivo(
//         response.updateSeguimientoPeiObjetivo.data,
//       );
//     } catch (error) {
//       return handleError("update", error);
//     }
//   },

//   delete: async (id: number): Promise<void> => {
//     try {
//       const response = await fetchGraphQL<{
//         deleteSeguimientoPeiObjetivo: MutationResponse<boolean>;
//       }>(DELETE_SEGUIMIENTO_PEI_OBJETIVO, { id });

//       if (!response.deleteSeguimientoPeiObjetivo.success) {
//         throw new Error(
//           response.deleteSeguimientoPeiObjetivo.message ||
//             "No se pudo eliminar el objetivo",
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
//         countSeguimientosPeiObjetivos: number;
//       }>(COUNT_SEGUIMIENTOS_PEI_OBJETIVOS, {});

//       return response.countSeguimientosPeiObjetivos;
//     } catch (error) {
//       return handleError("count", error);
//     }
//   },

//   exists: async (id: number): Promise<boolean> => {
//     try {
//       const response = await fetchGraphQL<{
//         existsSeguimientoPeiObjetivo: boolean;
//       }>(EXISTS_SEGUIMIENTO_PEI_OBJETIVO, { id });

//       return response.existsSeguimientoPeiObjetivo;
//     } catch (error) {
//       return handleError("exists", error);
//     }
//   },

//   getOrdenados: async (
//     orderBy: string,
//     { limit = 10, offset = 0 }: PaginationParams = {},
//   ): Promise<{ results: SeguimientoPeiObjetivo[]; count: number }> => {
//     try {
//       const response = await fetchGraphQL<{
//         getSeguimientosPeiObjetivosOrdenados: ListResponse<any>;
//       }>(GET_SEGUIMIENTOS_PEI_OBJETIVOS_ORDENADOS, { orderBy, limit, offset });

//       const results = response.getSeguimientosPeiObjetivosOrdenados.results.map(
//         normalizarSeguimientoPeiObjetivo,
//       );

//       return {
//         results,
//         count: response.getSeguimientosPeiObjetivosOrdenados.count,
//       };
//     } catch (error) {
//       return handleError("getOrdenados", error);
//     }
//   },
// };

// src/modules/seguimiento/services/seguimientoPeiObjetivo.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";

import type {
  SeguimientoPeiObjetivo,
  CreateSeguimientoPeiObjetivoInput,
  UpdateSeguimientoPeiObjetivoInput,
} from "../types/seguimientoPei.types";

import type { ObjetivoEstrategico } from "@/modules/pei/types/objetivoEstrategico.types";

// Queries
import {
  LIST_SEGUIMIENTOS_PEI_OBJETIVOS,
  GET_SEGUIMIENTO_PEI_OBJETIVO,
  GET_SEGUIMIENTOS_PEI_OBJETIVOS_ORDENADOS,
  COUNT_SEGUIMIENTOS_PEI_OBJETIVOS,
  EXISTS_SEGUIMIENTO_PEI_OBJETIVO,
  FILTER_OBJETIVOS_POR_SEGUIMIENTO,
} from "@/graphql/pei/queries/seguimientoPeiObjetivo.queries";

// Mutations
import {
  CREATE_SEGUIMIENTO_PEI_OBJETIVO,
  UPDATE_SEGUIMIENTO_PEI_OBJETIVO,
  DELETE_SEGUIMIENTO_PEI_OBJETIVO,
} from "@/graphql/pei/mutations/seguimientoPeiObjetivo.mutations";

interface MutationResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

interface ListResponse<T> {
  count: number;
  results: T[];
}

const handleError = createServiceErrorHandler("SeguimientoPeiObjetivoService");

// =========================
// NORMALIZADORES
// =========================
const normalizarObjetivoEstrategico = (oe: any): ObjetivoEstrategico => ({
  id: oe.id,
  idOe: oe.idOe ?? oe.id_oe ?? 0,
  description: oe.description ?? "",
  politicaDesarrollo: oe.politicaDesarrollo ?? null,
});

const normalizarSeguimientoPeiObjetivo = (
  objetivo: any,
): SeguimientoPeiObjetivo => ({
  id: objetivo.id,
  promedio_cumplimiento: objetivo.promedioCumplimiento ?? 0,
  escala_valoracion: objetivo.escalaValoracion ?? "",
  valoracion_cualitativa: objetivo.valoracionCualitativa ?? "",
  seguimiento_pei_id_spo:
    objetivo.seguimientoPei?.id ?? objetivo.seguimientoPeiId ?? 0,
  objetivo_estrategico_id_oe:
    objetivo.objetivoEstrategico?.id ?? objetivo.objetivoEstrategicoId ?? 0,

  objetivo_estrategico: objetivo.objetivoEstrategico
    ? normalizarObjetivoEstrategico(objetivo.objetivoEstrategico)
    : undefined,

  seguimiento_pei: objetivo.seguimientoPei ?? undefined,
});

// =========================
// SERVICE
// =========================
export const SeguimientoPeiObjetivoService = {
  // ✅ Firma compatible con useCrud
  // (limit, offset, search?)
  listAll: async (
    limit: number,
    offset: number,
    _search?: string,
  ): Promise<{ results: SeguimientoPeiObjetivo[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        listSeguimientosPeiObjetivos: ListResponse<any>;
      }>(LIST_SEGUIMIENTOS_PEI_OBJETIVOS, { limit, offset });

      return {
        results: response.listSeguimientosPeiObjetivos.results.map(
          normalizarSeguimientoPeiObjetivo,
        ),
        count: response.listSeguimientosPeiObjetivos.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  getBySeguimientoId: async (
    seguimientoPeiId: number,
  ): Promise<SeguimientoPeiObjetivo[]> => {
    try {
      const response = await fetchGraphQL<{
        filterObjetivosPorSeguimiento: ListResponse<any>;
      }>(FILTER_OBJETIVOS_POR_SEGUIMIENTO, {
        seguimientoPeiId,
        limit: 100,
        offset: 0,
      });

      return response.filterObjetivosPorSeguimiento.results.map(
        normalizarSeguimientoPeiObjetivo,
      );
    } catch (error) {
      // Fallback: lista completa y filtra
      try {
        const allResponse = await fetchGraphQL<{
          listSeguimientosPeiObjetivos: ListResponse<any>;
        }>(LIST_SEGUIMIENTOS_PEI_OBJETIVOS, { limit: 100, offset: 0 });

        return allResponse.listSeguimientosPeiObjetivos.results
          .map(normalizarSeguimientoPeiObjetivo)
          .filter((obj) => obj.seguimiento_pei_id_spo === seguimientoPeiId);
      } catch (fallbackError) {
        return handleError("getBySeguimientoId", fallbackError);
      }
    }
  },

  getById: async (id: number): Promise<SeguimientoPeiObjetivo> => {
    try {
      const response = await fetchGraphQL<{
        getSeguimientoPeiObjetivo: MutationResponse<any>;
      }>(GET_SEGUIMIENTO_PEI_OBJETIVO, { id });

      const payload = response.getSeguimientoPeiObjetivo;

      if (!payload.success || !payload.data) {
        throw new Error(payload.message || "No se encontró el objetivo");
      }

      return normalizarSeguimientoPeiObjetivo(payload.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (
    data: CreateSeguimientoPeiObjetivoInput,
  ): Promise<SeguimientoPeiObjetivo> => {
    try {
      const variables = {
        escalaValoracion: data.escala_valoracion,
        objetivoEstrategicoId: data.objetivo_estrategico_id_oe,
        promedioCumplimiento: data.promedio_cumplimiento,
        seguimientoPeiId: data.seguimiento_pei_id_spo,
        valoracionCualitativa: data.valoracion_cualitativa,
      };

      const response = await fetchGraphQL<{
        createSeguimientoPeiObjetivo: MutationResponse<any>;
      }>(CREATE_SEGUIMIENTO_PEI_OBJETIVO, variables);

      const payload = response.createSeguimientoPeiObjetivo;

      if (!payload.success || !payload.data) {
        throw new Error(payload.message || "No se pudo crear el objetivo");
      }

      return normalizarSeguimientoPeiObjetivo(payload.data);
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateSeguimientoPeiObjetivoInput,
  ): Promise<SeguimientoPeiObjetivo> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.promedio_cumplimiento !== undefined)
        variables.promedioCumplimiento = data.promedio_cumplimiento;

      if (data.escala_valoracion !== undefined)
        variables.escalaValoracion = data.escala_valoracion;

      if (data.valoracion_cualitativa !== undefined)
        variables.valoracionCualitativa = data.valoracion_cualitativa;

      if (data.objetivo_estrategico_id_oe !== undefined)
        variables.objetivoEstrategicoId = data.objetivo_estrategico_id_oe;

      const response = await fetchGraphQL<{
        updateSeguimientoPeiObjetivo: MutationResponse<any>;
      }>(UPDATE_SEGUIMIENTO_PEI_OBJETIVO, variables);

      const payload = response.updateSeguimientoPeiObjetivo;

      if (!payload.success || !payload.data) {
        throw new Error(payload.message || "No se pudo actualizar el objetivo");
      }

      return normalizarSeguimientoPeiObjetivo(payload.data);
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteSeguimientoPeiObjetivo: MutationResponse<boolean>;
      }>(DELETE_SEGUIMIENTO_PEI_OBJETIVO, { id });

      if (!response.deleteSeguimientoPeiObjetivo.success) {
        throw new Error(
          response.deleteSeguimientoPeiObjetivo.message ||
            "No se pudo eliminar el objetivo",
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },

  // =========================
  // EXTRA
  // =========================
  count: async (): Promise<number> => {
    try {
      const response = await fetchGraphQL<{
        countSeguimientosPeiObjetivos: number;
      }>(COUNT_SEGUIMIENTOS_PEI_OBJETIVOS, {});
      return response.countSeguimientosPeiObjetivos;
    } catch (error) {
      return handleError("count", error);
    }
  },

  exists: async (id: number): Promise<boolean> => {
    try {
      const response = await fetchGraphQL<{
        existsSeguimientoPeiObjetivo: boolean;
      }>(EXISTS_SEGUIMIENTO_PEI_OBJETIVO, { id });
      return response.existsSeguimientoPeiObjetivo;
    } catch (error) {
      return handleError("exists", error);
    }
  },

  // ✅ También con firma “useCrud-like”
  getOrdenados: async (
    orderBy: string,
    limit: number,
    offset: number,
  ): Promise<{ results: SeguimientoPeiObjetivo[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        getSeguimientosPeiObjetivosOrdenados: ListResponse<any>;
      }>(GET_SEGUIMIENTOS_PEI_OBJETIVOS_ORDENADOS, { orderBy, limit, offset });

      return {
        results: response.getSeguimientosPeiObjetivosOrdenados.results.map(
          normalizarSeguimientoPeiObjetivo,
        ),
        count: response.getSeguimientosPeiObjetivosOrdenados.count,
      };
    } catch (error) {
      return handleError("getOrdenados", error);
    }
  },
};

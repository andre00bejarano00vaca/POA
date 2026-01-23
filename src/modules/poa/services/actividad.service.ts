// import { fetchGraphQL } from "@/shared/lib/graphql-client";

// export const ActividadService = {
//   // --- MUTATIONS ---

//   /** Crea una nueva actividad operativa */
//   create: async (variables: {
//     categProgramatica: string;
//     description: string;
//     tipo: string;
//     clase: string;
//     fechaIni: string;
//     fechaFinal: string;
//     docVerif: number;
//     accionCortoPlazoId: number;
//     causasDesv?: string;
//   }) => {
//     const mutation = `
//       mutation CreateActividad($categProgramatica: String!, $description: String!, $tipo: String!, $clase: String!, $fechaIni: String!, $fechaFinal: String!, $docVerif: Int!, $accionCortoPlazoId: Int!, $causasDesv: String) {
//         createActividad(
//           categProgramatica: $categProgramatica
//           description: $description
//           tipo: $tipo
//           clase: $clase
//           fechaIni: $fechaIni
//           fechaFinal: $fechaFinal
//           docVerif: $docVerif
//           accionCortoPlazoId: $accionCortoPlazoId
//           causasDesv: $causasDesv
//         ) {
//           success
//           message
//           data {
//             id
//             description
//             tipo
//             fechaIni
//             fechaFinal
//             accionCortoPlazo { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, variables);
//   },

//   /** Actualiza la descripción o documentos de verificación de una actividad */
//   update: async (id: number, description: string, docVerif: number) => {
//     const mutation = `
//       mutation UpdateActividad($id: ID!, $description: String!, $docVerif: Int!) {
//         updateActividad(id: $id, description: $description, docVerif: $docVerif) {
//           success
//           message
//           data { id description docVerif }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, description, docVerif });
//   },

//   /** Elimina una actividad por su ID */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteActividad($id: ID!) {
//         deleteActividad(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene el detalle completo de una actividad y su jerarquía */
//   getById: async (id: number) => {
//     const query = `
//       query GetActividad($id: ID!) {
//         getActividad(id: $id) {
//           success
//           message
//           data {
//             id
//             categProgramatica
//             description
//             tipo
//             clase
//             fechaIni
//             fechaFinal
//             docVerif
//             causasDesv
//             accionCortoPlazo {
//               id
//               description
//               programa { id description }
//             }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista actividades con soporte para paginación */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListActividades($limit: Int, $offset: Int) {
//         listActividades(limit: $limit, offset: $offset) {
//           count
//           results { id description tipo fechaIni fechaFinal }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Busca actividades por descripción (ej: "capacitación") */
//   search: async (text: string, limit = 50) => {
//     const query = `
//       query SearchActividades($search: String!, $limit: Int) {
//         searchActividades(search: $search, limit: $limit) {
//           count
//           results { id description tipo }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { search: text, limit });
//   },

//   /** Filtra actividades por una acción de corto plazo específica */
//   filterByAccion: async (accionId: number, limit = 100) => {
//     const query = `
//       query FilterByAccion($accionId: Int!, $limit: Int) {
//         filterActividadesPorAccion(accionCortoPlazoId: $accionId, limit: $limit) {
//           count
//           results { id description tipo fechaIni }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { accionId, limit });
//   },

//   /** Obtiene la lista ordenada (ej: "-fecha_ini") */
//   getOrdered: async (orderBy: string, limit = 100) => {
//     const query = `
//       query GetOrdered($orderBy: String, $limit: Int) {
//         getActividadesOrdenadas(orderBy: $orderBy, limit: $limit) {
//           count
//           results { id description fechaIni }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { orderBy, limit });
//   },

//   /** Utilidades de conteo y validación */
//   utils: {
//     count: () => fetchGraphQL<any>(`query { countActividades }`),
//     exists: (id: number) =>
//       fetchGraphQL<any>(`query Exists($id: ID!) { existsActividad(id: $id) }`, {
//         id,
//       }),
//   },
// };

// src/modules/poa/services/actividad.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import { toGraphQLDate } from "@/shared/utils/date.utils";
import type {
  Actividad,
  CreateActividadInput,
  UpdateActividadInput,
} from "@/modules/poa/types/actividad.types";

import {
  LIST_ACTIVIDADES,
  GET_ACTIVIDAD,
  SEARCH_ACTIVIDADES,
  FILTER_ACTIVIDADES_POR_ACCION,
  FILTER_ACTIVIDADES_POR_TIPO,
  COUNT_ACTIVIDADES,
  EXISTS_ACTIVIDAD,
} from "@/graphql/poa/queries/actividad.queries";

import {
  CREATE_ACTIVIDAD,
  UPDATE_ACTIVIDAD,
  DELETE_ACTIVIDAD,
} from "@/graphql/poa/mutations/actividad.mutations";

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

const handleError = createServiceErrorHandler("ActividadService");

const normalizarActividad = (actividad: any): Actividad => ({
  id: actividad.id,
  description: actividad.description,
  tipo: actividad.tipo,
  clase: actividad.clase,
  categProgramatica: actividad.categProgramatica,
  fechaIni: actividad.fechaIni,
  fechaFinal: actividad.fechaFinal,
  docVerif: actividad.docVerif,
  causasDesv: actividad.causasDesv,
  accionCortoPlazo: actividad.accionCortoPlazo || null,
});

export const ActividadService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string,
  ): Promise<{ results: Actividad[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return ActividadService.searchByText(search.trim(), { limit, offset });
      }

      const response = await fetchGraphQL<{
        listActividades: ListResponse<any>;
      }>(LIST_ACTIVIDADES, { limit, offset });

      const results = response.listActividades.results.map(normalizarActividad);

      return {
        results,
        count: response.listActividades.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: Actividad[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchActividades: ListResponse<any>;
      }>(SEARCH_ACTIVIDADES, {
        search: searchTerm,
        limit,
        offset,
      });

      const results =
        response.searchActividades.results.map(normalizarActividad);

      return {
        results,
        count: response.searchActividades.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  filterByAccion: async (
    accionCortoPlazoId: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: Actividad[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterActividadesPorAccion: ListResponse<any>;
      }>(FILTER_ACTIVIDADES_POR_ACCION, { accionCortoPlazoId, limit, offset });

      const results =
        response.filterActividadesPorAccion.results.map(normalizarActividad);

      return {
        results,
        count: response.filterActividadesPorAccion.count,
      };
    } catch (error) {
      return handleError("filterByAccion", error);
    }
  },

  filterByTipo: async (
    tipo: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: Actividad[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterActividadesPorTipo: ListResponse<any>;
      }>(FILTER_ACTIVIDADES_POR_TIPO, { tipo, limit, offset });

      const results =
        response.filterActividadesPorTipo.results.map(normalizarActividad);

      return {
        results,
        count: response.filterActividadesPorTipo.count,
      };
    } catch (error) {
      return handleError("filterByTipo", error);
    }
  },

  count: async (): Promise<number> => {
    try {
      const response = await fetchGraphQL<{
        countActividades: number;
      }>(COUNT_ACTIVIDADES, {});

      return response.countActividades;
    } catch (error) {
      return handleError("count", error);
    }
  },

  exists: async (id: number): Promise<boolean> => {
    try {
      const response = await fetchGraphQL<{
        existsActividad: boolean;
      }>(EXISTS_ACTIVIDAD, { id });

      return response.existsActividad;
    } catch (error) {
      return handleError("exists", error);
    }
  },

  getById: async (id: number): Promise<Actividad> => {
    try {
      const response = await fetchGraphQL<{
        getActividad: MutationResponse<any>;
      }>(GET_ACTIVIDAD, { id });

      if (!response.getActividad.success || !response.getActividad.data) {
        throw new Error(
          response.getActividad.message || "No se encontró la Actividad",
        );
      }

      return normalizarActividad(response.getActividad.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (data: CreateActividadInput): Promise<Actividad> => {
    try {
      const variables = {
        description: data.description,
        tipo: data.tipo,
        clase: data.clase,
        categProgramatica: data.categProgramatica,
        fechaIni: toGraphQLDate(data.fechaIni),
        fechaFinal: toGraphQLDate(data.fechaFinal),
        docVerif: data.docVerif,
        causasDesv: data.causasDesv,
        accionCortoPlazoId: data.accionCortoPlazoId,
      };

      const response = await fetchGraphQL<{
        createActividad: MutationResponse<any>;
      }>(CREATE_ACTIVIDAD, variables);

      if (!response.createActividad.success || !response.createActividad.data) {
        throw new Error(
          response.createActividad.message || "No se pudo crear la Actividad",
        );
      }

      return normalizarActividad(response.createActividad.data);
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateActividadInput,
  ): Promise<Actividad> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.description !== undefined)
        variables.description = data.description;
      if (data.tipo !== undefined) variables.tipo = data.tipo;
      if (data.clase !== undefined) variables.clase = data.clase;
      if (data.categProgramatica !== undefined)
        variables.categProgramatica = data.categProgramatica;
      if (data.fechaIni !== undefined)
        variables.fechaIni = toGraphQLDate(data.fechaIni);
      if (data.fechaFinal !== undefined)
        variables.fechaFinal = toGraphQLDate(data.fechaFinal);
      if (data.docVerif !== undefined) variables.docVerif = data.docVerif;
      if (data.causasDesv !== undefined) variables.causasDesv = data.causasDesv;
      if (data.accionCortoPlazoId !== undefined)
        variables.accionCortoPlazoId = data.accionCortoPlazoId;

      const response = await fetchGraphQL<{
        updateActividad: MutationResponse<any>;
      }>(UPDATE_ACTIVIDAD, variables);

      if (!response.updateActividad.success || !response.updateActividad.data) {
        throw new Error(
          response.updateActividad.message ||
            "No se pudo actualizar la Actividad",
        );
      }

      return normalizarActividad(response.updateActividad.data);
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteActividad: MutationResponse<boolean>;
      }>(DELETE_ACTIVIDAD, { id });

      if (!response.deleteActividad.success) {
        throw new Error(
          response.deleteActividad.message ||
            "No se pudo eliminar la Actividad",
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};

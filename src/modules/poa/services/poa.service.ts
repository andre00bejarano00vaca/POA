// import { fetchGraphQL } from "@/shared/lib/graphql-client";

// export const PoaService = {
//   // --- MUTATIONS ---

//   /** Crea un nuevo registro de POA */
//   create: async (
//     anio: number,
//     fechaRegistro: string,
//     unidadEjecutoraId: number
//   ) => {
//     const mutation = `
//       mutation CreatePoa($anio: Int!, $fecha: String!, $ueId: Int!) {
//         createPoa(anio: $anio, fechaRegistro: $fecha, unidadEjecutoraId: $ueId) {
//           success
//           message
//           data {
//             id
//             anio
//             fechaRegistro
//             unidadEjecutora { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, {
//       anio,
//       fecha: fechaRegistro,
//       ueId: unidadEjecutoraId,
//     });
//   },

//   /** Actualiza la fecha de registro de un POA */
//   update: async (id: number, fechaRegistro: string) => {
//     const mutation = `
//       mutation UpdatePoa($id: ID!, $fecha: String!) {
//         updatePoa(id: $id, fechaRegistro: $fecha) {
//           success
//           message
//           data {
//             id
//             anio
//             fechaRegistro
//             unidadEjecutora { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, fecha: fechaRegistro });
//   },

//   /** Elimina un POA por su ID */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeletePoa($id: ID!) {
//         deletePoa(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene un POA por su ID con el detalle de la Unidad Ejecutora */
//   getById: async (id: number) => {
//     const query = `
//       query GetPoa($id: ID!) {
//         getPoa(id: $id) {
//           success
//           message
//           data {
//             id
//             anio
//             fechaRegistro
//             unidadEjecutora { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista POAs con soporte para paginación */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListPoas($limit: Int, $offset: Int) {
//         listPoas(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             anio
//             fechaRegistro
//             unidadEjecutora { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Filtra POAs por un año específico */
//   filterByAnio: async (anio: number, limit = 100) => {
//     const query = `
//       query FilterByAnio($anio: Int!, $limit: Int) {
//         filterPoasPorAnio(anio: $anio, limit: $limit) {
//           count
//           results {
//             id
//             anio
//             fechaRegistro
//             unidadEjecutora { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { anio, limit });
//   },

//   /** Filtra por año y Unidad Ejecutora (Búsqueda combinada) */
//   filterByAnioAndUnit: async (anio: number, unitId: number, limit = 100) => {
//     const query = `
//       query FilterByAnioUnit($anio: Int!, $unitId: Int!, $limit: Int) {
//         filterPoasPorAnioYUnidad(anio: $anio, unidadEjecutoraId: $unitId, limit: $limit) {
//           count
//           results {
//             id
//             anio
//             unidadEjecutora { description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { anio, unitId, limit });
//   },

//   /** Obtiene la lista ordenada (ej: "-anio") */
//   getOrdered: async (orderBy: string, limit = 100) => {
//     const query = `
//       query GetOrdered($orderBy: String, $limit: Int) {
//         getPoasOrdenados(orderBy: $orderBy, limit: $limit) {
//           count
//           results {
//             id
//             anio
//             unidadEjecutora { description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { orderBy, limit });
//   },

//   /** Utilidades de conteo y validación */
//   utils: {
//     count: () => fetchGraphQL<any>(`query { countPoas }`),
//     exists: (id: number) =>
//       fetchGraphQL<any>(`query Exists($id: ID!) { existsPoa(id: $id) }`, {
//         id,
//       }),
//   },
// };

// // src/modules/poa/services/poa.service.ts

// import { fetchGraphQL } from "@/shared/lib/graphql-client";
// import { createServiceErrorHandler } from "@/shared/lib/service-errors";
// import { toGraphQLDate } from "@/shared/utils/date.utils";
// import type {
//   Poa,
//   CreatePoaInput,
//   UpdatePoaInput,
// } from "@/modules/poa/types/poa.types";

// import {
//   LIST_POAS,
//   GET_POA,
//   FILTER_POAS_POR_ANIO,
//   FILTER_POAS_POR_UNIDAD_EJECUTORA,
//   FILTER_POAS_POR_ANIO_Y_UNIDAD,
//   FILTER_POAS_POR_RANGO_ANIO,
//   GET_POAS_ORDENADOS,
//   COUNT_POAS,
//   EXISTS_POA,
// } from "@/graphql/poa/queries/poa.queries";

// import {
//   CREATE_POA,
//   UPDATE_POA,
//   DELETE_POA,
// } from "@/graphql/poa/mutations/poa.mutations";

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

// const handleError = createServiceErrorHandler("PoaService");

// // ✅ Normalizar POA
// const normalizarPoa = (poa: any): Poa => ({
//   id: poa.id,
//   anio: poa.anio,
//   // Si backend devuelve "YYYY-MM-DD" o "YYYY-MM-DDTHH:mm:ss...", lo guardamos tal cual.
//   // (Tu UI ya lo formatea con formatDateShort)
//   fechaRegistro: poa.fechaRegistro,
//   unidadEjecutora: poa.unidadEjecutora || null,
// });

// export const PoaService = {
//   listAll: async (
//     limit: number = 10,
//     offset: number = 0,
//     _search?: string,
//   ): Promise<{ results: Poa[]; count: number }> => {
//     try {
//       const response = await fetchGraphQL<{
//         listPoas: ListResponse<any>;
//       }>(LIST_POAS, { limit, offset });

//       const results = response.listPoas.results.map(normalizarPoa);

//       return {
//         results,
//         count: response.listPoas.count,
//       };
//     } catch (error) {
//       return handleError("listAll", error);
//     }
//   },

//   filterByAnio: async (
//     anio: number,
//     { limit = 10, offset = 0 }: PaginationParams = {},
//   ): Promise<{ results: Poa[]; count: number }> => {
//     try {
//       const response = await fetchGraphQL<{
//         filterPoasPorAnio: ListResponse<any>;
//       }>(FILTER_POAS_POR_ANIO, { anio, limit, offset });

//       const results = response.filterPoasPorAnio.results.map(normalizarPoa);

//       return {
//         results,
//         count: response.filterPoasPorAnio.count,
//       };
//     } catch (error) {
//       return handleError("filterByAnio", error);
//     }
//   },

//   filterByUnidadEjecutora: async (
//     unidadEjecutoraId: number,
//     { limit = 10, offset = 0 }: PaginationParams = {},
//   ): Promise<{ results: Poa[]; count: number }> => {
//     try {
//       const response = await fetchGraphQL<{
//         filterPoasPorUnidadEjecutora: ListResponse<any>;
//       }>(FILTER_POAS_POR_UNIDAD_EJECUTORA, {
//         unidadEjecutoraId,
//         limit,
//         offset,
//       });

//       const results =
//         response.filterPoasPorUnidadEjecutora.results.map(normalizarPoa);

//       return {
//         results,
//         count: response.filterPoasPorUnidadEjecutora.count,
//       };
//     } catch (error) {
//       return handleError("filterByUnidadEjecutora", error);
//     }
//   },

//   filterByAnioYUnidad: async (
//     anio: number,
//     unidadEjecutoraId: number,
//     { limit = 10, offset = 0 }: PaginationParams = {},
//   ): Promise<{ results: Poa[]; count: number }> => {
//     try {
//       const response = await fetchGraphQL<{
//         filterPoasPorAnioYUnidad: ListResponse<any>;
//       }>(FILTER_POAS_POR_ANIO_Y_UNIDAD, {
//         anio,
//         unidadEjecutoraId,
//         limit,
//         offset,
//       });

//       const results =
//         response.filterPoasPorAnioYUnidad.results.map(normalizarPoa);

//       return {
//         results,
//         count: response.filterPoasPorAnioYUnidad.count,
//       };
//     } catch (error) {
//       return handleError("filterByAnioYUnidad", error);
//     }
//   },

//   filterByRangoAnio: async (
//     anioInicio: number,
//     anioFin: number,
//     { limit = 10, offset = 0 }: PaginationParams = {},
//   ): Promise<{ results: Poa[]; count: number }> => {
//     try {
//       const response = await fetchGraphQL<{
//         filterPoasPorRangoAnio: ListResponse<any>;
//       }>(FILTER_POAS_POR_RANGO_ANIO, { anioInicio, anioFin, limit, offset });

//       const results =
//         response.filterPoasPorRangoAnio.results.map(normalizarPoa);

//       return {
//         results,
//         count: response.filterPoasPorRangoAnio.count,
//       };
//     } catch (error) {
//       return handleError("filterByRangoAnio", error);
//     }
//   },

//   getOrdenados: async (
//     orderBy: string,
//     { limit = 10, offset = 0 }: PaginationParams = {},
//   ): Promise<{ results: Poa[]; count: number }> => {
//     try {
//       const response = await fetchGraphQL<{
//         getPoasOrdenados: ListResponse<any>;
//       }>(GET_POAS_ORDENADOS, { orderBy, limit, offset });

//       const results = response.getPoasOrdenados.results.map(normalizarPoa);

//       return {
//         results,
//         count: response.getPoasOrdenados.count,
//       };
//     } catch (error) {
//       return handleError("getOrdenados", error);
//     }
//   },

//   count: async (): Promise<number> => {
//     try {
//       const response = await fetchGraphQL<{
//         countPoas: number;
//       }>(COUNT_POAS, {});

//       return response.countPoas;
//     } catch (error) {
//       return handleError("count", error);
//     }
//   },

//   exists: async (id: number): Promise<boolean> => {
//     try {
//       const response = await fetchGraphQL<{
//         existsPoa: boolean;
//       }>(EXISTS_POA, { id });

//       return response.existsPoa;
//     } catch (error) {
//       return handleError("exists", error);
//     }
//   },

//   getById: async (id: number): Promise<Poa> => {
//     try {
//       const response = await fetchGraphQL<{
//         getPoa: MutationResponse<any>;
//       }>(GET_POA, { id });

//       if (!response.getPoa.success || !response.getPoa.data) {
//         throw new Error(response.getPoa.message || "No se encontró el POA");
//       }

//       return normalizarPoa(response.getPoa.data);
//     } catch (error) {
//       return handleError("getById", error);
//     }
//   },

//   create: async (data: CreatePoaInput): Promise<Poa> => {
//     try {
//       // ✅ GraphQL Date -> "YYYY-MM-DD"
//       const variables = {
//         anio: data.anio,
//         fechaRegistro: toGraphQLDate(data.fechaRegistro),
//         unidadEjecutoraId: data.unidadEjecutoraId,
//       };

//       const response = await fetchGraphQL<{
//         createPoa: MutationResponse<any>;
//       }>(CREATE_POA, variables);

//       if (!response.createPoa.success || !response.createPoa.data) {
//         throw new Error(
//           response.createPoa.message || "No se pudo crear el POA",
//         );
//       }

//       return normalizarPoa(response.createPoa.data);
//     } catch (error) {
//       return handleError("create", error);
//     }
//   },

//   update: async (id: number, data: UpdatePoaInput): Promise<Poa> => {
//     try {
//       const variables: Record<string, unknown> = { id };

//       if (data.anio !== undefined) variables.anio = data.anio;

//       // ✅ GraphQL Date -> "YYYY-MM-DD"
//       if (data.fechaRegistro !== undefined) {
//         variables.fechaRegistro = toGraphQLDate(data.fechaRegistro);
//       }

//       if (data.unidadEjecutoraId !== undefined) {
//         variables.unidadEjecutoraId = data.unidadEjecutoraId;
//       }

//       const response = await fetchGraphQL<{
//         updatePoa: MutationResponse<any>;
//       }>(UPDATE_POA, variables);

//       if (!response.updatePoa.success || !response.updatePoa.data) {
//         throw new Error(
//           response.updatePoa.message || "No se pudo actualizar el POA",
//         );
//       }

//       return normalizarPoa(response.updatePoa.data);
//     } catch (error) {
//       return handleError("update", error);
//     }
//   },

//   delete: async (id: number): Promise<void> => {
//     try {
//       const response = await fetchGraphQL<{
//         deletePoa: MutationResponse<boolean>;
//       }>(DELETE_POA, { id });

//       if (!response.deletePoa.success) {
//         throw new Error(
//           response.deletePoa.message || "No se pudo eliminar el POA",
//         );
//       }
//     } catch (error) {
//       return handleError("delete", error);
//     }
//   },
// };

// src/modules/poa/services/poa.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import { toGraphQLDate } from "@/shared/utils/date.utils";
import type {
  Poa,
  CreatePoaInput,
  UpdatePoaInput,
} from "@/modules/poa/types/poa.types";

import {
  LIST_POAS,
  GET_POA,
  FILTER_POAS_POR_ANIO,
  FILTER_POAS_POR_UNIDAD_EJECUTORA,
  FILTER_POAS_POR_ANIO_Y_UNIDAD,
  FILTER_POAS_POR_RANGO_ANIO,
  GET_POAS_ORDENADOS,
  COUNT_POAS,
  EXISTS_POA,
} from "@/graphql/poa/queries/poa.queries";

import {
  CREATE_POA,
  UPDATE_POA,
  DELETE_POA,
} from "@/graphql/poa/mutations/poa.mutations";

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

const handleError = createServiceErrorHandler("PoaService");

const normalizarPoa = (poa: any): Poa => ({
  id: poa.id,
  anio: poa.anio,
  fechaRegistro: poa.fechaRegistro,
  unidadEjecutora: poa.unidadEjecutora || null,
});

export const PoaService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string,
  ): Promise<{ results: Poa[]; count: number }> => {
    try {
      // ✅ Implementar búsqueda usando queries existentes
      if (search && search.trim()) {
        const searchTerm = search.trim();
        const anio = parseInt(searchTerm, 10);

        // Si es un número válido de 4 dígitos, buscar por año
        if (!isNaN(anio) && searchTerm.length === 4) {
          return PoaService.filterByAnio(anio, { limit, offset });
        }

        // Si no es un año, hacer búsqueda cliente-side
        // (filtrar después de traer los datos)
        const response = await fetchGraphQL<{
          listPoas: ListResponse<any>;
        }>(LIST_POAS, { limit: 100, offset: 0 }); // Traer más datos para filtrar

        const allResults = response.listPoas.results.map(normalizarPoa);

        // Filtrar por término de búsqueda (año o descripción de unidad)
        const filtered = allResults.filter((poa) => {
          const searchLower = searchTerm.toLowerCase();

          // Buscar en año
          if (poa.anio.toString().includes(searchTerm)) return true;

          // Buscar en descripción de unidad ejecutora
          if (
            poa.unidadEjecutora?.description
              ?.toLowerCase()
              .includes(searchLower)
          )
            return true;

          // Buscar en dirección administrativa
          if (
            poa.unidadEjecutora?.direccionAdministrativa?.description
              ?.toLowerCase()
              .includes(searchLower)
          )
            return true;

          return false;
        });

        // Aplicar paginación manual
        const paginatedResults = filtered.slice(offset, offset + limit);

        return {
          results: paginatedResults,
          count: filtered.length,
        };
      }

      // Sin búsqueda, listar normal
      const response = await fetchGraphQL<{
        listPoas: ListResponse<any>;
      }>(LIST_POAS, { limit, offset });

      const results = response.listPoas.results.map(normalizarPoa);

      return {
        results,
        count: response.listPoas.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  filterByAnio: async (
    anio: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: Poa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterPoasPorAnio: ListResponse<any>;
      }>(FILTER_POAS_POR_ANIO, { anio, limit, offset });

      const results = response.filterPoasPorAnio.results.map(normalizarPoa);

      return {
        results,
        count: response.filterPoasPorAnio.count,
      };
    } catch (error) {
      return handleError("filterByAnio", error);
    }
  },

  filterByUnidadEjecutora: async (
    unidadEjecutoraId: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: Poa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterPoasPorUnidadEjecutora: ListResponse<any>;
      }>(FILTER_POAS_POR_UNIDAD_EJECUTORA, {
        unidadEjecutoraId,
        limit,
        offset,
      });

      const results =
        response.filterPoasPorUnidadEjecutora.results.map(normalizarPoa);

      return {
        results,
        count: response.filterPoasPorUnidadEjecutora.count,
      };
    } catch (error) {
      return handleError("filterByUnidadEjecutora", error);
    }
  },

  filterByAnioYUnidad: async (
    anio: number,
    unidadEjecutoraId: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: Poa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterPoasPorAnioYUnidad: ListResponse<any>;
      }>(FILTER_POAS_POR_ANIO_Y_UNIDAD, {
        anio,
        unidadEjecutoraId,
        limit,
        offset,
      });

      const results =
        response.filterPoasPorAnioYUnidad.results.map(normalizarPoa);

      return {
        results,
        count: response.filterPoasPorAnioYUnidad.count,
      };
    } catch (error) {
      return handleError("filterByAnioYUnidad", error);
    }
  },

  filterByRangoAnio: async (
    anioInicio: number,
    anioFin: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: Poa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterPoasPorRangoAnio: ListResponse<any>;
      }>(FILTER_POAS_POR_RANGO_ANIO, { anioInicio, anioFin, limit, offset });

      const results =
        response.filterPoasPorRangoAnio.results.map(normalizarPoa);

      return {
        results,
        count: response.filterPoasPorRangoAnio.count,
      };
    } catch (error) {
      return handleError("filterByRangoAnio", error);
    }
  },

  getOrdenados: async (
    orderBy: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: Poa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        getPoasOrdenados: ListResponse<any>;
      }>(GET_POAS_ORDENADOS, { orderBy, limit, offset });

      const results = response.getPoasOrdenados.results.map(normalizarPoa);

      return {
        results,
        count: response.getPoasOrdenados.count,
      };
    } catch (error) {
      return handleError("getOrdenados", error);
    }
  },

  count: async (): Promise<number> => {
    try {
      const response = await fetchGraphQL<{
        countPoas: number;
      }>(COUNT_POAS, {});

      return response.countPoas;
    } catch (error) {
      return handleError("count", error);
    }
  },

  exists: async (id: number): Promise<boolean> => {
    try {
      const response = await fetchGraphQL<{
        existsPoa: boolean;
      }>(EXISTS_POA, { id });

      return response.existsPoa;
    } catch (error) {
      return handleError("exists", error);
    }
  },

  getById: async (id: number): Promise<Poa> => {
    try {
      const response = await fetchGraphQL<{
        getPoa: MutationResponse<any>;
      }>(GET_POA, { id });

      if (!response.getPoa.success || !response.getPoa.data) {
        throw new Error(response.getPoa.message || "No se encontró el POA");
      }

      return normalizarPoa(response.getPoa.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (data: CreatePoaInput): Promise<Poa> => {
    try {
      const variables = {
        anio: data.anio,
        fechaRegistro: toGraphQLDate(data.fechaRegistro),
        unidadEjecutoraId: data.unidadEjecutoraId,
      };

      const response = await fetchGraphQL<{
        createPoa: MutationResponse<any>;
      }>(CREATE_POA, variables);

      if (!response.createPoa.success || !response.createPoa.data) {
        throw new Error(
          response.createPoa.message || "No se pudo crear el POA",
        );
      }

      return normalizarPoa(response.createPoa.data);
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (id: number, data: UpdatePoaInput): Promise<Poa> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.anio !== undefined) variables.anio = data.anio;

      if (data.fechaRegistro !== undefined) {
        variables.fechaRegistro = toGraphQLDate(data.fechaRegistro);
      }

      if (data.unidadEjecutoraId !== undefined) {
        variables.unidadEjecutoraId = data.unidadEjecutoraId;
      }

      const response = await fetchGraphQL<{
        updatePoa: MutationResponse<any>;
      }>(UPDATE_POA, variables);

      if (!response.updatePoa.success || !response.updatePoa.data) {
        throw new Error(
          response.updatePoa.message || "No se pudo actualizar el POA",
        );
      }

      return normalizarPoa(response.updatePoa.data);
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deletePoa: MutationResponse<boolean>;
      }>(DELETE_POA, { id });

      if (!response.deletePoa.success) {
        throw new Error(
          response.deletePoa.message || "No se pudo eliminar el POA",
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};

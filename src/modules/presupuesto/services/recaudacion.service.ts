// import { fetchGraphQL } from '@/lib/graphql-client';

// export const RecaudacionService = {
//   // --- MUTATIONS ---

//   /** Crea un nuevo registro de recaudación */
//   create: async (variables: {
//     description: string;
//     codOec: string;
//     nBienes: number;
//     costoUServicio: number;
//     totalDouble: number;
//     idRubro: number;
//   }) => {
//     const mutation = `
//       mutation CreateRecaudacion($desc: String!, $cod: String!, $n: Int!, $costo: Float!, $total: Float!, $rubroId: Int!) {
//         createRecaudacion(
//           description: $desc
//           codOec: $cod
//           nBienes: $n
//           costoUServicio: $costo
//           totalDouble: $total
//           idRubro: $rubroId
//         ) {
//           success
//           message
//           data {
//             id
//             description
//             codOec
//             totalDouble
//             idRubro { id description }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, {
//       desc: variables.description,
//       cod: variables.codOec,
//       n: variables.nBienes,
//       costo: variables.costoUServicio,
//       total: variables.totalDouble,
//       rubroId: variables.idRubro
//     });
//   },

//   /** Actualiza cantidad de bienes e importe total */
//   update: async (id: number, nBienes: number, totalDouble: number) => {
//     const mutation = `
//       mutation UpdateRecaudacion($id: ID!, $n: Int!, $total: Float!) {
//         updateRecaudacion(id: $id, nBienes: $n, totalDouble: $total) {
//           success
//           message
//           data {
//             id
//             description
//             nBienes
//             totalDouble
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, n: nBienes, total: totalDouble });
//   },

//   /** Elimina un registro de recaudación */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteRecaudacion($id: ID!) {
//         deleteRecaudacion(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene el detalle de una recaudación y su rubro asociado */
//   getById: async (id: number) => {
//     const query = `
//       query GetRecaudacion($id: ID!) {
//         getRecaudacion(id: $id) {
//           success
//           message
//           data {
//             id
//             description
//             codOec
//             nBienes
//             costoUServicio
//             totalDouble
//             idRubro {
//               id
//               description
//             }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista todas las recaudaciones con paginación */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListRecaudaciones($limit: Int, $offset: Int) {
//         listRecaudaciones(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             description
//             codOec
//             totalDouble
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Busca recaudaciones por descripción o código OEC */
//   search: async (text: string, limit = 50) => {
//     const query = `
//       query SearchRecaudaciones($search: String!, $limit: Int) {
//         searchRecaudaciones(search: $search, limit: $limit) {
//           count
//           results {
//             id
//             description
//             codOec
//             totalDouble
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { search: text, limit });
//   },

//   /** Filtra recaudaciones por un Rubro específico */
//   filterByRubro: async (rubroId: number, limit = 100) => {
//     const query = `
//       query FilterByRubro($rubroId: Int!, $limit: Int) {
//         filterRecaudacionesPorRubro(idRubroId: $rubroId, limit: $limit) {
//           count
//           results {
//             id
//             description
//             totalDouble
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { rubroId, limit });
//   }
// };

// src/modules/presupuesto/services/recaudacion.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import { normalizeEntity, passthrough } from "@/shared/lib/normalizers";
import type {
  Recaudacion,
  CreateRecaudacionInput,
  UpdateRecaudacionInput,
} from "@/modules/presupuesto/types/recaudacion.types";

import {
  LIST_RECAUDACIONES,
  SEARCH_RECAUDACIONES,
  GET_RECAUDACION,
  FILTER_RECAUDACIONES_POR_RUBRO,
} from "@/graphql/presupuesto/queries/recaudacion.queries";

import {
  CREATE_RECAUDACION,
  UPDATE_RECAUDACION,
  DELETE_RECAUDACION,
} from "@/graphql/presupuesto/mutations/recaudacion.mutations";

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

const handleError = createServiceErrorHandler("RecaudacionService");

const normalizarRecaudacion = (rec: any): Recaudacion =>
  normalizeEntity<any, Recaudacion>(rec, {
    id: passthrough,
    description: passthrough,
    codOec: passthrough,
    nBienes: passthrough,
    costoUServicio: passthrough,
    totalDouble: passthrough,
    idRubro: (v) => v || { id: 0, description: "Sin rubro", importeDouble: 0 },
  });

export const RecaudacionService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<{ results: Recaudacion[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return RecaudacionService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }

      const response = await fetchGraphQL<{
        listRecaudaciones: ListResponse<any>;
      }>(LIST_RECAUDACIONES, { limit, offset });

      const results = response.listRecaudaciones.results.map(
        normalizarRecaudacion
      );

      return {
        results,
        count: response.listRecaudaciones.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: Recaudacion[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchRecaudaciones: ListResponse<any>;
      }>(SEARCH_RECAUDACIONES, {
        search: searchTerm,
        limit,
        offset,
      });

      const results = response.searchRecaudaciones.results.map(
        normalizarRecaudacion
      );

      return {
        results,
        count: response.searchRecaudaciones.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  filterByRubro: async (
    idRubro: number,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: Recaudacion[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterRecaudacionesPorRubro: ListResponse<any>;
      }>(FILTER_RECAUDACIONES_POR_RUBRO, { idRubro, limit, offset });

      const results = response.filterRecaudacionesPorRubro.results.map(
        normalizarRecaudacion
      );

      return {
        results,
        count: response.filterRecaudacionesPorRubro.count,
      };
    } catch (error) {
      return handleError("filterByRubro", error);
    }
  },

  getById: async (id: number): Promise<Recaudacion> => {
    try {
      const response = await fetchGraphQL<{
        getRecaudacion: MutationResponse<any>;
      }>(GET_RECAUDACION, { id });

      if (!response.getRecaudacion.success || !response.getRecaudacion.data) {
        throw new Error(
          response.getRecaudacion.message || "No se encontró la Recaudación"
        );
      }

      return normalizarRecaudacion(response.getRecaudacion.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (data: CreateRecaudacionInput): Promise<Recaudacion> => {
    try {
      const variables = {
        description: data.description,
        codOec: data.codOec,
        nBienes: data.nBienes,
        costoUServicio: data.costoUServicio,
        totalDouble: data.totalDouble,
        idRubro: data.idRubroId,
      };

      const response = await fetchGraphQL<{
        createRecaudacion: MutationResponse<any>;
      }>(CREATE_RECAUDACION, variables);

      if (
        !response.createRecaudacion.success ||
        !response.createRecaudacion.data
      ) {
        throw new Error(
          response.createRecaudacion.message ||
            "No se pudo crear la Recaudación"
        );
      }

      return normalizarRecaudacion(response.createRecaudacion.data);
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateRecaudacionInput
  ): Promise<Recaudacion> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.description !== undefined)
        variables.description = data.description;
      if (data.codOec !== undefined) variables.codOec = data.codOec;
      if (data.nBienes !== undefined) variables.nBienes = data.nBienes;
      if (data.costoUServicio !== undefined)
        variables.costoUServicio = data.costoUServicio;
      if (data.totalDouble !== undefined)
        variables.totalDouble = data.totalDouble;
      if (data.idRubroId !== undefined) variables.idRubro = data.idRubroId;

      const response = await fetchGraphQL<{
        updateRecaudacion: MutationResponse<any>;
      }>(UPDATE_RECAUDACION, variables);

      if (
        !response.updateRecaudacion.success ||
        !response.updateRecaudacion.data
      ) {
        throw new Error(
          response.updateRecaudacion.message ||
            "No se pudo actualizar la Recaudación"
        );
      }

      return normalizarRecaudacion(response.updateRecaudacion.data);
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteRecaudacion: MutationResponse<boolean>;
      }>(DELETE_RECAUDACION, { id });

      if (!response.deleteRecaudacion.success) {
        throw new Error(
          response.deleteRecaudacion.message ||
            "No se pudo eliminar la Recaudación"
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};

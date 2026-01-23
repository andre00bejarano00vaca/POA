// import { fetchGraphQL } from "@/shared/lib/graphql-client";

// export const EntidadService = {
//   // --- MUTATIONS ---

//   /** Crea una nueva entidad (ej: UAGRM, Facultad, etc.) */
//   create: async (
//     codigo: number,
//     sigla: string,
//     activo: number = 1,
//     estado: number = 1
//   ) => {
//     const mutation = `
//       mutation CreateEntidad($codigo: Int!, $sigla: String!, $activo: Int, $estado: Int) {
//         createEntidad(codigo: $codigo, sigla: $sigla, activo: $activo, estado: $estado) {
//           success
//           message
//           data {
//             id
//             codigo
//             sigla
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { codigo, sigla, activo, estado });
//   },

//   /** Actualiza los datos básicos de una entidad */
//   update: async (id: number, sigla: string, activo: number) => {
//     const mutation = `
//       mutation UpdateEntidad($id: ID!, $sigla: String!, $activo: Int!) {
//         updateEntidad(id: $id, sigla: $sigla, activo: $activo) {
//           success
//           message
//           data {
//             id
//             codigo
//             sigla
//             activo
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, sigla, activo });
//   },

//   /** Elimina una entidad (usualmente un borrado lógico/soft delete) */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteEntidad($id: ID!) {
//         deleteEntidad(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene una entidad específica por su ID */
//   getById: async (id: number) => {
//     const query = `
//       query GetEntidad($id: ID!) {
//         getEntidad(id: $id) {
//           success
//           message
//           data {
//             id
//             codigo
//             sigla
//             activo
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista todas las entidades con soporte para paginación */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListEntidades($limit: Int, $offset: Int) {
//         listEntidades(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             codigo
//             sigla
//             activo
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Busca entidades por sigla o código */
//   search: async (text: string, limit = 50) => {
//     const query = `
//       query SearchEntidades($search: String!, $limit: Int) {
//         searchEntidades(search: $search, limit: $limit) {
//           count
//           results {
//             id
//             codigo
//             sigla
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { search: text, limit });
//   },

//   /** Filtra entidades por su estado de actividad */
//   filterByStatus: async (activo: number, limit = 100) => {
//     const query = `
//       query FilterEntidades($activo: Int!, $limit: Int) {
//         filterEntidadesPorEstado(activo: $activo, limit: $limit) {
//           count
//           results {
//             id
//             codigo
//             sigla
//             activo
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { activo, limit });
//   },

//   /** Obtiene la lista ordenada (ej: "codigo" o "-sigla") */
//   getOrdered: async (orderBy: string, limit = 100) => {
//     const query = `
//       query GetOrdered($orderBy: String, $limit: Int) {
//         getEntidadesOrdenadas(orderBy: $orderBy, limit: $limit) {
//           count
//           results {
//             id
//             codigo
//             sigla
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { orderBy, limit });
//   },

//   /** Utilidades de conteo y validación */
//   utils: {
//     count: () => fetchGraphQL<any>(`query { countEntidades }`),
//     exists: (id: number) =>
//       fetchGraphQL<any>(`query Exists($id: ID!) { existsEntidad(id: $id) }`, {
//         id,
//       }),
//   },
// };

// src/modules/entidad/services/entidad.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  Entidad,
  CreateEntidadInput,
  UpdateEntidadInput,
} from "@/modules/organization/types/entidad.types";

import {
  LIST_ENTIDADES,
  GET_ENTIDAD,
  SEARCH_ENTIDADES,
  FILTER_ENTIDADES,
} from "@/graphql/organization/queries/entidad.queries";

import {
  CREATE_ENTIDAD,
  UPDATE_ENTIDAD,
  DELETE_ENTIDAD,
} from "@/graphql/organization/mutations/entidad.mutations";

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

const handleError = createServiceErrorHandler("EntidadService");

const normalizarEntidad = (entidad: any): Entidad => ({
  id: entidad.id,
  codigo: entidad.codigo,
  sigla: entidad.sigla,
  // estado: entidad.estado,
  // activo: entidad.activo,
});

export const EntidadService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<{ results: Entidad[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return EntidadService.searchByText(search.trim(), { limit, offset });
      }

      const response = await fetchGraphQL<{
        listEntidades: ListResponse<any>;
      }>(LIST_ENTIDADES, { limit, offset });

      const results = response.listEntidades.results.map(normalizarEntidad);

      return {
        results,
        count: response.listEntidades.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: Entidad[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchEntidades: ListResponse<any>;
      }>(SEARCH_ENTIDADES, {
        search: searchTerm,
        limit,
        offset,
      });

      const results = response.searchEntidades.results.map(normalizarEntidad);

      return {
        results,
        count: response.searchEntidades.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  filter: async (
    filters: { codigo?: number; sigla?: string },
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: Entidad[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterEntidades: ListResponse<any>;
      }>(FILTER_ENTIDADES, {
        codigo: filters.codigo,
        sigla: filters.sigla,
        limit,
        offset,
      });

      const results = response.filterEntidades.results.map(normalizarEntidad);

      return {
        results,
        count: response.filterEntidades.count,
      };
    } catch (error) {
      return handleError("filter", error);
    }
  },

  getById: async (id: number): Promise<Entidad> => {
    try {
      const response = await fetchGraphQL<{
        getEntidad: MutationResponse<any>;
      }>(GET_ENTIDAD, { id });

      if (!response.getEntidad.success || !response.getEntidad.data) {
        throw new Error(
          response.getEntidad.message || "No se encontró la Entidad"
        );
      }

      return normalizarEntidad(response.getEntidad.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (data: CreateEntidadInput): Promise<Entidad> => {
    try {
      const variables = {
        codigo: data.codigo,
        sigla: data.sigla,
        // activo: data.activo,
        // estado: data.estado,
      };

      const response = await fetchGraphQL<{
        createEntidad: MutationResponse<any>;
      }>(CREATE_ENTIDAD, variables);

      if (!response.createEntidad.success || !response.createEntidad.data) {
        throw new Error(
          response.createEntidad.message || "No se pudo crear la Entidad"
        );
      }

      return normalizarEntidad(response.createEntidad.data);
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (id: number, data: UpdateEntidadInput): Promise<Entidad> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.codigo !== undefined) variables.codigo = data.codigo;
      if (data.sigla !== undefined) variables.sigla = data.sigla;
      // if (data.activo !== undefined) variables.activo = data.activo;
      // if (data.estado !== undefined) variables.estado = data.estado;

      const response = await fetchGraphQL<{
        updateEntidad: MutationResponse<any>;
      }>(UPDATE_ENTIDAD, variables);

      if (!response.updateEntidad.success || !response.updateEntidad.data) {
        throw new Error(
          response.updateEntidad.message || "No se pudo actualizar la Entidad"
        );
      }

      return normalizarEntidad(response.updateEntidad.data);
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteEntidad: MutationResponse<boolean>;
      }>(DELETE_ENTIDAD, { id });

      if (!response.deleteEntidad.success) {
        throw new Error(
          response.deleteEntidad.message || "No se pudo eliminar la Entidad"
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};

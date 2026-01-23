// import { fetchGraphQL } from "@/shared/lib/graphql-client";

// export const ProgramaService = {
//   // --- MUTATIONS ---

//   /** Crea un nuevo programa asociado a un POA */
//   create: async (description: string, poaId: number) => {
//     const mutation = `
//       mutation CreatePrograma($description: String!, $poaId: Int!) {
//         createPrograma(description: $description, poaId: $poaId) {
//           success
//           message
//           data { id description poaId }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { description, poaId });
//   },

//   /** Actualiza la descripción de un programa existente */
//   update: async (id: number, description: string) => {
//     const mutation = `
//       mutation UpdatePrograma($id: ID!, $description: String!) {
//         updatePrograma(id: $id, description: $description) {
//           success
//           message
//           data { id description poaId }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, description });
//   },

//   /** Elimina un programa por su ID */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeletePrograma($id: ID!) {
//         deletePrograma(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene un programa específico por ID */
//   getById: async (id: number) => {
//     const query = `
//       query GetPrograma($id: ID!) {
//         getPrograma(id: $id) {
//           success
//           message
//           data { id description poaId }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista programas con soporte para paginación */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListProgramas($limit: Int, $offset: Int) {
//         listProgramas(limit: $limit, offset: $offset) {
//           count
//           results { id description poaId }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Busca programas por coincidencia de texto en la descripción */
//   search: async (text: string, limit = 50) => {
//     const query = `
//       query SearchProgramas($search: String!, $limit: Int) {
//         searchProgramas(search: $search, limit: $limit) {
//           count
//           results { id description poaId }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { search: text, limit });
//   },

//   /** Filtra programas que pertenecen a un POA específico */
//   filterByPoa: async (poaId: number, limit = 100) => {
//     const query = `
//       query FilterByPoa($poaId: Int!, $limit: Int) {
//         filterProgramasPorPoa(poaId: $poaId, limit: $limit) {
//           count
//           results { id description poaId }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { poaId, limit });
//   },

//   /** Obtiene la lista ordenada (ej: "description" o "-id") */
//   getOrdered: async (orderBy: string, limit = 100) => {
//     const query = `
//       query GetOrdered($orderBy: String, $limit: Int) {
//         getProgramasOrdenados(orderBy: $orderBy, limit: $limit) {
//           count
//           results { id description poaId }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { orderBy, limit });
//   },

//   /** Utilidades para contar y verificar existencia */
//   utils: {
//     count: () => fetchGraphQL<any>(`query { countProgramas }`),
//     exists: (id: number) =>
//       fetchGraphQL<any>(`query Exists($id: ID!) { existsPrograma(id: $id) }`, {
//         id,
//       }),
//   },
// };

// src/modules/poa/services/programa.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  Programa,
  CreateProgramaInput,
  UpdateProgramaInput,
} from "@/modules/poa/types/programa.types";

import {
  LIST_PROGRAMAS,
  GET_PROGRAMA,
  SEARCH_PROGRAMAS,
  FILTER_PROGRAMAS_POR_POA,
  GET_PROGRAMAS_ORDENADOS,
  COUNT_PROGRAMAS,
  EXISTS_PROGRAMA,
} from "@/graphql/poa/queries/programa.queries";

import {
  CREATE_PROGRAMA,
  UPDATE_PROGRAMA,
  DELETE_PROGRAMA,
} from "@/graphql/poa/mutations/programa.mutations";

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

const handleError = createServiceErrorHandler("ProgramaService");

const normalizarPrograma = (programa: any): Programa => ({
  id: programa.id,
  description: programa.description,
  poa: programa.poa || null,
});

export const ProgramaService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string,
  ): Promise<{ results: Programa[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return ProgramaService.searchByText(search.trim(), { limit, offset });
      }

      const response = await fetchGraphQL<{
        listProgramas: ListResponse<any>;
      }>(LIST_PROGRAMAS, { limit, offset });

      const results = response.listProgramas.results.map(normalizarPrograma);

      return {
        results,
        count: response.listProgramas.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: Programa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchProgramas: ListResponse<any>;
      }>(SEARCH_PROGRAMAS, {
        search: searchTerm,
        limit,
        offset,
      });

      const results = response.searchProgramas.results.map(normalizarPrograma);

      return {
        results,
        count: response.searchProgramas.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  filterByPoa: async (
    poaId: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: Programa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterProgramasPorPoa: ListResponse<any>;
      }>(FILTER_PROGRAMAS_POR_POA, { poaId, limit, offset });

      const results =
        response.filterProgramasPorPoa.results.map(normalizarPrograma);

      return {
        results,
        count: response.filterProgramasPorPoa.count,
      };
    } catch (error) {
      return handleError("filterByPoa", error);
    }
  },

  getOrdenados: async (
    orderBy: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: Programa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        getProgramasOrdenados: ListResponse<any>;
      }>(GET_PROGRAMAS_ORDENADOS, { orderBy, limit, offset });

      const results =
        response.getProgramasOrdenados.results.map(normalizarPrograma);

      return {
        results,
        count: response.getProgramasOrdenados.count,
      };
    } catch (error) {
      return handleError("getOrdenados", error);
    }
  },

  count: async (): Promise<number> => {
    try {
      const response = await fetchGraphQL<{
        countProgramas: number;
      }>(COUNT_PROGRAMAS, {});

      return response.countProgramas;
    } catch (error) {
      return handleError("count", error);
    }
  },

  exists: async (id: number): Promise<boolean> => {
    try {
      const response = await fetchGraphQL<{
        existsPrograma: boolean;
      }>(EXISTS_PROGRAMA, { id });

      return response.existsPrograma;
    } catch (error) {
      return handleError("exists", error);
    }
  },

  getById: async (id: number): Promise<Programa> => {
    try {
      const response = await fetchGraphQL<{
        getPrograma: MutationResponse<any>;
      }>(GET_PROGRAMA, { id });

      if (!response.getPrograma.success || !response.getPrograma.data) {
        throw new Error(
          response.getPrograma.message || "No se encontró el Programa",
        );
      }

      return normalizarPrograma(response.getPrograma.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (data: CreateProgramaInput): Promise<Programa> => {
    try {
      const variables = {
        description: data.description,
        poaId: data.poaId,
      };

      const response = await fetchGraphQL<{
        createPrograma: MutationResponse<any>;
      }>(CREATE_PROGRAMA, variables);

      if (!response.createPrograma.success || !response.createPrograma.data) {
        throw new Error(
          response.createPrograma.message || "No se pudo crear el Programa",
        );
      }

      return normalizarPrograma(response.createPrograma.data);
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (id: number, data: UpdateProgramaInput): Promise<Programa> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.description !== undefined)
        variables.description = data.description;
      if (data.poaId !== undefined) variables.poaId = data.poaId;

      const response = await fetchGraphQL<{
        updatePrograma: MutationResponse<any>;
      }>(UPDATE_PROGRAMA, variables);

      if (!response.updatePrograma.success || !response.updatePrograma.data) {
        throw new Error(
          response.updatePrograma.message ||
            "No se pudo actualizar el Programa",
        );
      }

      return normalizarPrograma(response.updatePrograma.data);
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deletePrograma: MutationResponse<boolean>;
      }>(DELETE_PROGRAMA, { id });

      if (!response.deletePrograma.success) {
        throw new Error(
          response.deletePrograma.message || "No se pudo eliminar el Programa",
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};

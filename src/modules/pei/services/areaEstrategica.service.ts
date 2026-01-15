// import { fetchGraphQL } from "@/shared/lib/graphql-client";

// export const AreaEstrategicaService = {
//   // --- MUTATIONS ---

//   /** Crea una nueva área estratégica asociada a un PEI */
//   create: async (description: string, peiId: number) => {
//     const mutation = `
//       mutation CreateArea($description: String!, $peiId: Int!) {
//         createAreaEstrategica(description: $description, peiId: $peiId) {
//           success
//           message
//           data {
//             id
//             description
//             pei { id observacion }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { description, peiId });
//   },

//   /** Actualiza la descripción de un área estratégica existente */
//   update: async (id: number, description: string) => {
//     const mutation = `
//       mutation UpdateArea($id: ID!, $description: String!) {
//         updateAreaEstrategica(id: $id, description: $description) {
//           success
//           message
//           data {
//             id
//             description
//             pei { id observacion }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, description });
//   },

//   /** Elimina un área estratégica por su ID */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteArea($id: ID!) {
//         deleteAreaEstrategica(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene una área estratégica específica por su ID */
//   getById: async (id: number) => {
//     const query = `
//       query GetArea($id: ID!) {
//         getAreaEstrategica(id: $id) {
//           success
//           message
//           data {
//             id
//             description
//             pei { id observacion }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista áreas estratégicas con soporte para paginación */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListAreas($limit: Int, $offset: Int) {
//         listAreasEstrategicas(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             description
//             pei { id observacion }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Busca áreas estratégicas por coincidencia de texto */
//   search: async (text: string, limit = 50) => {
//     const query = `
//       query SearchAreas($search: String!, $limit: Int) {
//         searchAreasEstrategicas(search: $search, limit: $limit) {
//           count
//           results {
//             id
//             description
//             pei { id observacion }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { search: text, limit });
//   },

//   /** Filtra áreas estratégicas por un PEI específico */
//   filterByPei: async (peiId: number, limit = 100) => {
//     const query = `
//       query FilterByPei($peiId: Int!, $limit: Int) {
//         filterAreasPorPei(peiId: $peiId, limit: $limit) {
//           count
//           results {
//             id
//             description
//             pei { id observacion }
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { peiId, limit });
//   },

//   /** Utilidades para conteo y validación de existencia */
//   utils: {
//     count: () => fetchGraphQL<any>(`query { countAreasEstrategicas }`),
//     exists: (id: number) =>
//       fetchGraphQL<any>(
//         `query Exists($id: ID!) { existsAreaEstrategica(id: $id) }`,
//         { id }
//       ),
//   },
// };

// src/modules/pei/services/area.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import type {
  AreaEstrategica,
  CreateAreaEstrategicaInput,
  UpdateAreaEstrategicaInput,
} from "@/modules/pei/types/area.types";

import {
  LIST_AREAS,
  FILTER_AREAS_POR_PEI,
  SEARCH_AREAS,
  GET_AREA,
  COUNT_AREAS,
  EXISTS_AREA,
  GET_AREAS_ORDENADAS,
} from "@/graphql/pei/queries/area.queries";

import {
  CREATE_AREA,
  UPDATE_AREA,
  DELETE_AREA,
} from "@/graphql/pei/mutations/area.mutations";
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

// HELPER FUNCTIONS
const handleServiceError = (operation: string, error: unknown): never => {
  const message = error instanceof Error ? error.message : "Error desconocido";
  console.error(`Error en AreaService.${operation}:`, message);
  throw new Error(message);
};

// SERVICE
export const AreaService = {
  /**
   * Lista todas las áreas estratégicas sin filtros
   */
  listAll: async ({ limit = 10, offset = 0 }: PaginationParams = {}): Promise<{
    results: AreaEstrategica[];
    count: number;
  }> => {
    try {
      const response = await fetchGraphQL<{
        listAreasEstrategicas: ListResponse<AreaEstrategica>;
      }>(LIST_AREAS, {
        limit,
        offset,
      });

      return {
        results: response.listAreasEstrategicas.results,
        count: response.listAreasEstrategicas.count,
      };
    } catch (error) {
      return handleServiceError("listAll", error);
    }
  },

  /**
   * Busca áreas estratégicas por PEI
   */
  searchByPei: async (
    peiId: number,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: AreaEstrategica[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterAreasPorPei: ListResponse<AreaEstrategica>;
      }>(FILTER_AREAS_POR_PEI, { peiId, limit, offset });

      return {
        results: response.filterAreasPorPei.results,
        count: response.filterAreasPorPei.count,
      };
    } catch (error) {
      return handleServiceError("searchByPei", error);
    }
  },

  /**
   * Busca áreas estratégicas por texto en descripción
   */
  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: AreaEstrategica[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchAreasEstrategicas: ListResponse<AreaEstrategica>;
      }>(SEARCH_AREAS, {
        search: searchTerm,
        limit,
        offset,
      });

      return {
        results: response.searchAreasEstrategicas.results,
        count: response.searchAreasEstrategicas.count,
      };
    } catch (error) {
      return handleServiceError("searchByText", error);
    }
  },

  /**
   * Obtiene áreas ordenadas
   */
  getOrdenadas: async (
    orderBy: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: AreaEstrategica[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        getAreasEstrategicasOrdenadas: ListResponse<AreaEstrategica>;
      }>(GET_AREAS_ORDENADAS, { orderBy, limit, offset });

      return {
        results: response.getAreasEstrategicasOrdenadas.results,
        count: response.getAreasEstrategicasOrdenadas.count,
      };
    } catch (error) {
      return handleServiceError("getOrdenadas", error);
    }
  },

  /**
   * Cuenta el total de áreas estratégicas
   */
  count: async (): Promise<number> => {
    try {
      const response = await fetchGraphQL<{ countAreasEstrategicas: number }>(
        COUNT_AREAS
      );

      return response.countAreasEstrategicas;
    } catch (error) {
      return handleServiceError("count", error);
    }
  },

  /**
   * Verifica si existe un área estratégica por ID
   */
  exists: async (id: number): Promise<boolean> => {
    try {
      const response = await fetchGraphQL<{ existsAreaEstrategica: boolean }>(
        EXISTS_AREA,
        { id }
      );

      return response.existsAreaEstrategica;
    } catch (error) {
      return handleServiceError("exists", error);
    }
  },

  /**
   * Obtiene un área estratégica por ID
   */
  getById: async (id: number): Promise<AreaEstrategica> => {
    try {
      const response = await fetchGraphQL<{
        getAreaEstrategica: MutationResponse<AreaEstrategica>;
      }>(GET_AREA, { id });

      if (
        !response.getAreaEstrategica.success ||
        !response.getAreaEstrategica.data
      ) {
        throw new Error(
          response.getAreaEstrategica.message ||
            "No se encontró el área estratégica"
        );
      }

      return response.getAreaEstrategica.data;
    } catch (error) {
      return handleServiceError("getById", error);
    }
  },

  /**
   * Crea una nueva área estratégica
   */
  create: async (
    data: CreateAreaEstrategicaInput
  ): Promise<AreaEstrategica> => {
    try {
      const variables = {
        description: data.description,
        peiId: data.peiId,
      };

      const response = await fetchGraphQL<{
        createAreaEstrategica: MutationResponse<AreaEstrategica>;
      }>(CREATE_AREA, variables);

      if (
        !response.createAreaEstrategica.success ||
        !response.createAreaEstrategica.data
      ) {
        throw new Error(
          response.createAreaEstrategica.message ||
            "No se pudo crear el área estratégica"
        );
      }

      return response.createAreaEstrategica.data;
    } catch (error) {
      return handleServiceError("create", error);
    }
  },

  /**
   * Actualiza un área estratégica existente
   */
  update: async (
    id: number,
    data: UpdateAreaEstrategicaInput
  ): Promise<AreaEstrategica> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.description !== undefined)
        variables.description = data.description;
      if (data.peiId !== undefined) variables.peiId = data.peiId;

      const response = await fetchGraphQL<{
        updateAreaEstrategica: MutationResponse<AreaEstrategica>;
      }>(UPDATE_AREA, variables);

      if (
        !response.updateAreaEstrategica.success ||
        !response.updateAreaEstrategica.data
      ) {
        throw new Error(
          response.updateAreaEstrategica.message ||
            "No se pudo actualizar el área estratégica"
        );
      }

      return response.updateAreaEstrategica.data;
    } catch (error) {
      return handleServiceError("update", error);
    }
  },

  /**
   * Elimina un área estratégica
   */
  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteAreaEstrategica: MutationResponse<boolean>;
      }>(DELETE_AREA, { id });

      if (!response.deleteAreaEstrategica.success) {
        throw new Error(
          response.deleteAreaEstrategica.message ||
            "No se pudo eliminar el área estratégica"
        );
      }
    } catch (error) {
      return handleServiceError("delete", error);
    }
  },
};

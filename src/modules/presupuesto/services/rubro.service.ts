// import { fetchGraphQL } from '@/lib/graphql-client';

// export const RubroService = {
//   // --- MUTATIONS ---

//   /** Crea un nuevo rubro con descripción e importe */
//   create: async (description: string, importeDouble: number) => {
//     const mutation = `
//       mutation CreateRubro($description: String!, $importe: Float!) {
//         createRubro(description: $description, importeDouble: $importe) {
//           success
//           message
//           data {
//             id
//             description
//             importeDouble
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { description, importe: importeDouble });
//   },

//   /** Actualiza el importe de un rubro existente */
//   update: async (id: number, importeDouble: number) => {
//     const mutation = `
//       mutation UpdateRubro($id: ID!, $importe: Float!) {
//         updateRubro(id: $id, importeDouble: $importe) {
//           success
//           message
//           data {
//             id
//             description
//             importeDouble
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id, importe: importeDouble });
//   },

//   /** Elimina un rubro por su ID */
//   delete: async (id: number) => {
//     const mutation = `
//       mutation DeleteRubro($id: ID!) {
//         deleteRubro(id: $id) {
//           success
//           message
//           data
//         }
//       }`;
//     return fetchGraphQL<any>(mutation, { id });
//   },

//   // --- QUERIES ---

//   /** Obtiene un rubro por su ID */
//   getById: async (id: number) => {
//     const query = `
//       query GetRubro($id: ID!) {
//         getRubro(id: $id) {
//           success
//           message
//           data {
//             id
//             description
//             importeDouble
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { id });
//   },

//   /** Lista todos los rubros con soporte para paginación */
//   list: async (limit = 100, offset = 0) => {
//     const query = `
//       query ListRubros($limit: Int, $offset: Int) {
//         listRubros(limit: $limit, offset: $offset) {
//           count
//           results {
//             id
//             description
//             importeDouble
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { limit, offset });
//   },

//   /** Busca rubros por coincidencia en la descripción (ej: "MATERIALES") */
//   search: async (text: string, limit = 50) => {
//     const query = `
//       query SearchRubros($search: String!, $limit: Int) {
//         searchRubros(search: $search, limit: $limit) {
//           count
//           results {
//             id
//             description
//             importeDouble
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { search: text, limit });
//   },

//   /** Obtiene la lista de rubros ordenada por un campo específico */
//   getOrdered: async (orderBy: string, limit = 100) => {
//     const query = `
//       query GetOrdered($orderBy: String, $limit: Int) {
//         getRubrosOrdenados(orderBy: $orderBy, limit: $limit) {
//           count
//           results {
//             id
//             description
//             importeDouble
//           }
//         }
//       }`;
//     return fetchGraphQL<any>(query, { orderBy, limit });
//   },

//   /** Utilidades para conteo y validación de existencia */
//   utils: {
//     count: () => fetchGraphQL<any>(`query { countRubros }`),
//     exists: (id: number) => fetchGraphQL<any>(`query Exists($id: ID!) { existsRubro(id: $id) }`, { id })
//   }
// };

// src/modules/presupuesto/services/rubro.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  Rubro,
  CreateRubroInput,
  UpdateRubroInput,
} from "@/modules/presupuesto/types/rubro.types";

import {
  LIST_RUBROS,
  SEARCH_RUBROS,
  GET_RUBRO,
} from "@/graphql/presupuesto/queries/rubro.queries";

import {
  CREATE_RUBRO,
  UPDATE_RUBRO,
  DELETE_RUBRO,
} from "@/graphql/presupuesto/mutations/rubro.mutations";

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

// ERROR HANDLER
const handleError = createServiceErrorHandler("RubroService");

// SERVICE
export const RubroService = {
  /**
   * Lista todos los rubros sin filtros o con búsqueda por texto
   */
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<{ results: Rubro[]; count: number }> => {
    try {
      // Si hay búsqueda, usar searchByText
      if (search && search.trim()) {
        return RubroService.searchByText(search.trim(), { limit, offset });
      }

      // Sin búsqueda, listar normalmente
      const response = await fetchGraphQL<{
        listRubros: ListResponse<Rubro>;
      }>(LIST_RUBROS, { limit, offset });

      return {
        results: response.listRubros.results,
        count: response.listRubros.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  /**
   * Busca rubros por texto en descripción
   */
  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: Rubro[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchRubros: ListResponse<Rubro>;
      }>(SEARCH_RUBROS, {
        search: searchTerm,
        limit,
        offset,
      });

      return {
        results: response.searchRubros.results,
        count: response.searchRubros.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  /**
   * Obtiene un rubro por ID
   */
  getById: async (id: number): Promise<Rubro> => {
    try {
      const response = await fetchGraphQL<{
        getRubro: MutationResponse<Rubro>;
      }>(GET_RUBRO, { id });

      if (!response.getRubro.success || !response.getRubro.data) {
        throw new Error(response.getRubro.message || "No se encontró el Rubro");
      }

      return response.getRubro.data;
    } catch (error) {
      return handleError("getById", error);
    }
  },

  /**
   * Crea un nuevo rubro
   */
  create: async (data: CreateRubroInput): Promise<Rubro> => {
    try {
      const variables = {
        description: data.description,
        importeDouble: data.importeDouble,
      };

      const response = await fetchGraphQL<{
        createRubro: MutationResponse<Rubro>;
      }>(CREATE_RUBRO, variables);

      if (!response.createRubro.success || !response.createRubro.data) {
        throw new Error(
          response.createRubro.message || "No se pudo crear el Rubro"
        );
      }

      return response.createRubro.data;
    } catch (error) {
      return handleError("create", error);
    }
  },

  /**
   * Actualiza un rubro existente
   */
  update: async (id: number, data: UpdateRubroInput): Promise<Rubro> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.description !== undefined)
        variables.description = data.description;
      if (data.importeDouble !== undefined)
        variables.importeDouble = data.importeDouble;

      const response = await fetchGraphQL<{
        updateRubro: MutationResponse<Rubro>;
      }>(UPDATE_RUBRO, variables);

      if (!response.updateRubro.success || !response.updateRubro.data) {
        throw new Error(
          response.updateRubro.message || "No se pudo actualizar el Rubro"
        );
      }

      return response.updateRubro.data;
    } catch (error) {
      return handleError("update", error);
    }
  },

  /**
   * Elimina un rubro
   */
  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteRubro: MutationResponse<boolean>;
      }>(DELETE_RUBRO, { id });

      if (!response.deleteRubro.success) {
        throw new Error(
          response.deleteRubro.message || "No se pudo eliminar el Rubro"
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};

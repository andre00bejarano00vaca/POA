// src/modules/presupuesto/services/fuente.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  Fuente,
  CreateFuenteInput,
  UpdateFuenteInput,
} from "@/modules/presupuesto/types/fuente.types";

import {
  LIST_FUENTES,
  SEARCH_FUENTES,
  GET_FUENTE,
} from "@/graphql/presupuesto/queries/fuente.queries";

import {
  CREATE_FUENTE,
  UPDATE_FUENTE,
  DELETE_FUENTE,
} from "@/graphql/presupuesto/mutations/fuente.mutations";

// ============================================
// TYPES
// ============================================
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
const handleError = createServiceErrorHandler("FuenteService");

// ============================================
// SERVICE
// ============================================
export const FuenteService = {
  /**
   * Lista todas las fuentes sin filtros o con búsqueda por texto
   */
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string
  ): Promise<{ results: Fuente[]; count: number }> => {
    try {
      // Si hay búsqueda, usar searchByText
      if (search && search.trim()) {
        return FuenteService.searchByText(search.trim(), { limit, offset });
      }

      // Sin búsqueda, listar normalmente
      const response = await fetchGraphQL<{
        listFuentes: ListResponse<Fuente>;
      }>(LIST_FUENTES, { limit, offset });

      return {
        results: response.listFuentes.results,
        count: response.listFuentes.count,
      };
    } catch (error) {
      return handleError("listAll", error); // ✅ Simplificado
    }
  },

  /**
   * Busca fuentes por texto en descripción
   */
  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {}
  ): Promise<{ results: Fuente[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchFuentes: ListResponse<Fuente>;
      }>(SEARCH_FUENTES, {
        search: searchTerm,
        limit,
        offset,
      });

      return {
        results: response.searchFuentes.results,
        count: response.searchFuentes.count,
      };
    } catch (error) {
      return handleError("searchByText", error); // ✅ Simplificado
    }
  },

  /**
   * Obtiene una fuente por ID
   */
  getById: async (id: number): Promise<Fuente> => {
    try {
      const response = await fetchGraphQL<{
        getFuente: MutationResponse<Fuente>;
      }>(GET_FUENTE, { id });

      if (!response.getFuente.success || !response.getFuente.data) {
        throw new Error(
          response.getFuente.message || "No se encontró la Fuente"
        );
      }

      return response.getFuente.data;
    } catch (error) {
      return handleError("getById", error); // ✅ Simplificado
    }
  },

  /**
   * Crea una nueva fuente
   */
  create: async (data: CreateFuenteInput): Promise<Fuente> => {
    try {
      const variables = {
        codigo: data.codigo,
        description: data.description,
      };

      const response = await fetchGraphQL<{
        createFuente: MutationResponse<Fuente>;
      }>(CREATE_FUENTE, variables);

      if (!response.createFuente.success || !response.createFuente.data) {
        throw new Error(
          response.createFuente.message || "No se pudo crear la Fuente"
        );
      }

      return response.createFuente.data;
    } catch (error) {
      return handleError("create", error); // ✅ Simplificado
    }
  },

  /**
   * Actualiza una fuente existente
   */
  update: async (id: number, data: UpdateFuenteInput): Promise<Fuente> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.codigo !== undefined) variables.codigo = data.codigo;
      if (data.description !== undefined)
        variables.description = data.description;

      const response = await fetchGraphQL<{
        updateFuente: MutationResponse<Fuente>;
      }>(UPDATE_FUENTE, variables);

      if (!response.updateFuente.success || !response.updateFuente.data) {
        throw new Error(
          response.updateFuente.message || "No se pudo actualizar la Fuente"
        );
      }

      return response.updateFuente.data;
    } catch (error) {
      return handleError("update", error); // ✅ Simplificado
    }
  },

  /**
   * Elimina una fuente
   */
  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteFuente: MutationResponse<boolean>;
      }>(DELETE_FUENTE, { id });

      if (!response.deleteFuente.success) {
        throw new Error(
          response.deleteFuente.message || "No se pudo eliminar la Fuente"
        );
      }
    } catch (error) {
      return handleError("delete", error); // ✅ Simplificado
    }
  },
};

// src/modules/poa/services/indicadorPoa.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  IndicadorPoa,
  CreateIndicadorPoaInput,
  UpdateIndicadorPoaInput,
} from "@/modules/poa/types/indicadorPoa.types";

import {
  LIST_INDICADORES_POA,
  GET_INDICADOR_POA,
  SEARCH_INDICADORES_POA,
  FILTER_INDICADORES_POA_POR_ACTIVIDAD,
  FILTER_INDICADORES_POA_POR_UNIDAD_MEDIDA,
  FILTER_INDICADORES_POA_POR_RANGO_META,
  GET_INDICADORES_POA_ORDENADOS,
  COUNT_INDICADORES_POA,
  EXISTS_INDICADOR_POA,
} from "@/graphql/poa/queries/indicadorPoa.queries";

import {
  CREATE_INDICADOR_POA,
  UPDATE_INDICADOR_POA,
  DELETE_INDICADOR_POA,
} from "@/graphql/poa/mutations/indicadorPoa.mutations";

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

const handleError = createServiceErrorHandler("IndicadorPoaService");

const normalizarIndicadorPoa = (indicador: any): IndicadorPoa => ({
  id: indicador.id,
  description: indicador.description,
  formula: indicador.formula,
  lineaBase: indicador.lineaBase,
  meta: indicador.meta,
  unidadMedida: indicador.unidadMedida,
  actividad: indicador.actividad || null,
});

export const IndicadorPoaService = {
  listAll: async (
    limit: number = 10,
    offset: number = 0,
    search?: string,
  ): Promise<{ results: IndicadorPoa[]; count: number }> => {
    try {
      if (search && search.trim()) {
        return IndicadorPoaService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }

      const response = await fetchGraphQL<{
        listIndicadoresPoa: ListResponse<any>;
      }>(LIST_INDICADORES_POA, { limit, offset });

      const results = response.listIndicadoresPoa.results.map(
        normalizarIndicadorPoa,
      );

      return {
        results,
        count: response.listIndicadoresPoa.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  searchByText: async (
    searchTerm: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: IndicadorPoa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        searchIndicadoresPoa: ListResponse<any>;
      }>(SEARCH_INDICADORES_POA, {
        search: searchTerm,
        limit,
        offset,
      });

      const results = response.searchIndicadoresPoa.results.map(
        normalizarIndicadorPoa,
      );

      return {
        results,
        count: response.searchIndicadoresPoa.count,
      };
    } catch (error) {
      return handleError("searchByText", error);
    }
  },

  filterByActividad: async (
    actividadId: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: IndicadorPoa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterIndicadoresPoaPorActividad: ListResponse<any>;
      }>(FILTER_INDICADORES_POA_POR_ACTIVIDAD, { actividadId, limit, offset });

      const results = response.filterIndicadoresPoaPorActividad.results.map(
        normalizarIndicadorPoa,
      );

      return {
        results,
        count: response.filterIndicadoresPoaPorActividad.count,
      };
    } catch (error) {
      return handleError("filterByActividad", error);
    }
  },

  filterByUnidadMedida: async (
    unidadMedida: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: IndicadorPoa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterIndicadoresPoaPorUnidadMedida: ListResponse<any>;
      }>(FILTER_INDICADORES_POA_POR_UNIDAD_MEDIDA, {
        unidadMedida,
        limit,
        offset,
      });

      const results = response.filterIndicadoresPoaPorUnidadMedida.results.map(
        normalizarIndicadorPoa,
      );

      return {
        results,
        count: response.filterIndicadoresPoaPorUnidadMedida.count,
      };
    } catch (error) {
      return handleError("filterByUnidadMedida", error);
    }
  },

  filterByRangoMeta: async (
    metaMin: number,
    metaMax: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: IndicadorPoa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterIndicadoresPoaPorRangoMeta: ListResponse<any>;
      }>(FILTER_INDICADORES_POA_POR_RANGO_META, {
        metaMin,
        metaMax,
        limit,
        offset,
      });

      const results = response.filterIndicadoresPoaPorRangoMeta.results.map(
        normalizarIndicadorPoa,
      );

      return {
        results,
        count: response.filterIndicadoresPoaPorRangoMeta.count,
      };
    } catch (error) {
      return handleError("filterByRangoMeta", error);
    }
  },

  getOrdenados: async (
    orderBy: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: IndicadorPoa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        getIndicadoresPoaOrdenados: ListResponse<any>;
      }>(GET_INDICADORES_POA_ORDENADOS, { orderBy, limit, offset });

      const results = response.getIndicadoresPoaOrdenados.results.map(
        normalizarIndicadorPoa,
      );

      return {
        results,
        count: response.getIndicadoresPoaOrdenados.count,
      };
    } catch (error) {
      return handleError("getOrdenados", error);
    }
  },

  count: async (): Promise<number> => {
    try {
      const response = await fetchGraphQL<{
        countIndicadoresPoa: number;
      }>(COUNT_INDICADORES_POA, {});

      return response.countIndicadoresPoa;
    } catch (error) {
      return handleError("count", error);
    }
  },

  exists: async (id: number): Promise<boolean> => {
    try {
      const response = await fetchGraphQL<{
        existsIndicadorPoa: boolean;
      }>(EXISTS_INDICADOR_POA, { id });

      return response.existsIndicadorPoa;
    } catch (error) {
      return handleError("exists", error);
    }
  },

  getById: async (id: number): Promise<IndicadorPoa> => {
    try {
      const response = await fetchGraphQL<{
        getIndicadorPoa: MutationResponse<any>;
      }>(GET_INDICADOR_POA, { id });

      if (!response.getIndicadorPoa.success || !response.getIndicadorPoa.data) {
        throw new Error(
          response.getIndicadorPoa.message || "No se encontró el Indicador POA",
        );
      }

      return normalizarIndicadorPoa(response.getIndicadorPoa.data);
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (data: CreateIndicadorPoaInput): Promise<IndicadorPoa> => {
    try {
      const variables = {
        description: data.description,
        formula: data.formula,
        lineaBase: data.lineaBase,
        meta: data.meta,
        unidadMedida: data.unidadMedida,
        actividadId: data.actividadId,
      };

      const response = await fetchGraphQL<{
        createIndicadorPoa: MutationResponse<any>;
      }>(CREATE_INDICADOR_POA, variables);

      if (
        !response.createIndicadorPoa.success ||
        !response.createIndicadorPoa.data
      ) {
        throw new Error(
          response.createIndicadorPoa.message ||
            "No se pudo crear el Indicador POA",
        );
      }

      return normalizarIndicadorPoa(response.createIndicadorPoa.data);
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateIndicadorPoaInput,
  ): Promise<IndicadorPoa> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.description !== undefined)
        variables.description = data.description;
      if (data.formula !== undefined) variables.formula = data.formula;
      if (data.lineaBase !== undefined) variables.lineaBase = data.lineaBase;
      if (data.meta !== undefined) variables.meta = data.meta;
      if (data.unidadMedida !== undefined)
        variables.unidadMedida = data.unidadMedida;
      if (data.actividadId !== undefined)
        variables.actividadId = data.actividadId;

      const response = await fetchGraphQL<{
        updateIndicadorPoa: MutationResponse<any>;
      }>(UPDATE_INDICADOR_POA, variables);

      if (
        !response.updateIndicadorPoa.success ||
        !response.updateIndicadorPoa.data
      ) {
        throw new Error(
          response.updateIndicadorPoa.message ||
            "No se pudo actualizar el Indicador POA",
        );
      }

      return normalizarIndicadorPoa(response.updateIndicadorPoa.data);
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteIndicadorPoa: MutationResponse<boolean>;
      }>(DELETE_INDICADOR_POA, { id });

      if (!response.deleteIndicadorPoa.success) {
        throw new Error(
          response.deleteIndicadorPoa.message ||
            "No se pudo eliminar el Indicador POA",
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};

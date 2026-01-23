// src/modules/programacion/services/programacionMetaAnual.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  ProgramacionMetaAnual,
  CreateProgramacionMetaAnualInput,
  UpdateProgramacionMetaAnualInput,
} from "@/modules/pei/types/programacionMetaAnual.types";

import {
  LIST_PROGRAMACIONES_METAS_ANUALES,
  GET_PROGRAMACION_META_ANUAL,
  FILTER_METAS_POR_ANIO,
  FILTER_METAS_POR_INDICADOR,
  FILTER_METAS_POR_PEI,
  GET_PROGRAMACIONES_METAS_ANUALES_ORDENADAS,
  COUNT_PROGRAMACIONES_METAS_ANUALES,
  EXISTS_PROGRAMACION_META_ANUAL,
} from "@/graphql/pei/queries/programacionMetaAnual.queries";

import {
  CREATE_PROGRAMACION_META_ANUAL,
  UPDATE_PROGRAMACION_META_ANUAL,
  DELETE_PROGRAMACION_META_ANUAL,
} from "@/graphql/pei/mutations/programacionMetaAnual.mutations";

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

const handleError = createServiceErrorHandler("ProgramacionMetaAnualService");

const normalizarProgramacionMetaAnual = (
  programacion: any,
): ProgramacionMetaAnual => ({
  id: programacion.id,
  anio: programacion.anio,
  programado: programacion.programado,
  ejecutado: programacion.ejecutado,
  idIndicadorPeiImp: programacion.idIndicadorPeiImp || null,
  peiIdPei: programacion.peiIdPei || null,
});

export const ProgramacionMetaAnualService = {
  listAll: async ({ limit = 10, offset = 0 }: PaginationParams = {}): Promise<{
    results: ProgramacionMetaAnual[];
    count: number;
  }> => {
    try {
      const response = await fetchGraphQL<{
        listProgramacionesMetasAnuales: ListResponse<any>;
      }>(LIST_PROGRAMACIONES_METAS_ANUALES, { limit, offset });

      const results = response.listProgramacionesMetasAnuales.results.map(
        normalizarProgramacionMetaAnual,
      );

      return {
        results,
        count: response.listProgramacionesMetasAnuales.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  filterByAnio: async (
    anio: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: ProgramacionMetaAnual[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterMetasPorAnio: ListResponse<any>;
      }>(FILTER_METAS_POR_ANIO, { anio, limit, offset });

      const results = response.filterMetasPorAnio.results.map(
        normalizarProgramacionMetaAnual,
      );

      return {
        results,
        count: response.filterMetasPorAnio.count,
      };
    } catch (error) {
      return handleError("filterByAnio", error);
    }
  },

  filterByIndicador: async (
    idIndicadorPeiImpId: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: ProgramacionMetaAnual[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterMetasPorIndicador: ListResponse<any>;
      }>(FILTER_METAS_POR_INDICADOR, { idIndicadorPeiImpId, limit, offset });

      const results = response.filterMetasPorIndicador.results.map(
        normalizarProgramacionMetaAnual,
      );

      return {
        results,
        count: response.filterMetasPorIndicador.count,
      };
    } catch (error) {
      return handleError("filterByIndicador", error);
    }
  },

  filterByPei: async (
    peiIdPeiId: number,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: ProgramacionMetaAnual[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        filterMetasPorPei: ListResponse<any>;
      }>(FILTER_METAS_POR_PEI, { peiIdPeiId, limit, offset });

      const results = response.filterMetasPorPei.results.map(
        normalizarProgramacionMetaAnual,
      );

      return {
        results,
        count: response.filterMetasPorPei.count,
      };
    } catch (error) {
      return handleError("filterByPei", error);
    }
  },

  getOrdenadas: async (
    orderBy: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: ProgramacionMetaAnual[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        getProgramacionesMetasAnualesOrdenadas: ListResponse<any>;
      }>(GET_PROGRAMACIONES_METAS_ANUALES_ORDENADAS, {
        orderBy,
        limit,
        offset,
      });

      const results =
        response.getProgramacionesMetasAnualesOrdenadas.results.map(
          normalizarProgramacionMetaAnual,
        );

      return {
        results,
        count: response.getProgramacionesMetasAnualesOrdenadas.count,
      };
    } catch (error) {
      return handleError("getOrdenadas", error);
    }
  },

  count: async (): Promise<number> => {
    try {
      const response = await fetchGraphQL<{
        countProgramacionesMetasAnuales: number;
      }>(COUNT_PROGRAMACIONES_METAS_ANUALES, {});

      return response.countProgramacionesMetasAnuales;
    } catch (error) {
      return handleError("count", error);
    }
  },

  exists: async (id: number): Promise<boolean> => {
    try {
      const response = await fetchGraphQL<{
        existsProgramacionMetaAnual: boolean;
      }>(EXISTS_PROGRAMACION_META_ANUAL, { id });

      return response.existsProgramacionMetaAnual;
    } catch (error) {
      return handleError("exists", error);
    }
  },

  getById: async (id: number): Promise<ProgramacionMetaAnual> => {
    try {
      const response = await fetchGraphQL<{
        getProgramacionMetaAnual: MutationResponse<any>;
      }>(GET_PROGRAMACION_META_ANUAL, { id });

      if (
        !response.getProgramacionMetaAnual.success ||
        !response.getProgramacionMetaAnual.data
      ) {
        throw new Error(
          response.getProgramacionMetaAnual.message ||
            "No se encontró la Programación de Meta Anual",
        );
      }

      return normalizarProgramacionMetaAnual(
        response.getProgramacionMetaAnual.data,
      );
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (
    data: CreateProgramacionMetaAnualInput,
  ): Promise<ProgramacionMetaAnual> => {
    try {
      const variables = {
        anio: data.anio,
        programado: data.programado,
        ejecutado: data.ejecutado,
        idIndicadorPeiImpId: data.idIndicadorPeiImpId,
        peiIdPeiId: data.peiIdPeiId,
      };

      const response = await fetchGraphQL<{
        createProgramacionMetaAnual: MutationResponse<any>;
      }>(CREATE_PROGRAMACION_META_ANUAL, variables);

      if (
        !response.createProgramacionMetaAnual.success ||
        !response.createProgramacionMetaAnual.data
      ) {
        throw new Error(
          response.createProgramacionMetaAnual.message ||
            "No se pudo crear la Programación de Meta Anual",
        );
      }

      return normalizarProgramacionMetaAnual(
        response.createProgramacionMetaAnual.data,
      );
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateProgramacionMetaAnualInput,
  ): Promise<ProgramacionMetaAnual> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.anio !== undefined) variables.anio = data.anio;
      if (data.programado !== undefined) variables.programado = data.programado;
      if (data.ejecutado !== undefined) variables.ejecutado = data.ejecutado;
      if (data.idIndicadorPeiImpId !== undefined)
        variables.idIndicadorPeiImpId = data.idIndicadorPeiImpId;
      if (data.peiIdPeiId !== undefined) variables.peiIdPeiId = data.peiIdPeiId;

      const response = await fetchGraphQL<{
        updateProgramacionMetaAnual: MutationResponse<any>;
      }>(UPDATE_PROGRAMACION_META_ANUAL, variables);

      if (
        !response.updateProgramacionMetaAnual.success ||
        !response.updateProgramacionMetaAnual.data
      ) {
        throw new Error(
          response.updateProgramacionMetaAnual.message ||
            "No se pudo actualizar la Programación de Meta Anual",
        );
      }

      return normalizarProgramacionMetaAnual(
        response.updateProgramacionMetaAnual.data,
      );
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteProgramacionMetaAnual: MutationResponse<boolean>;
      }>(DELETE_PROGRAMACION_META_ANUAL, { id });

      if (!response.deleteProgramacionMetaAnual.success) {
        throw new Error(
          response.deleteProgramacionMetaAnual.message ||
            "No se pudo eliminar la Programación de Meta Anual",
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};

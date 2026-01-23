// src/modules/seguimiento/services/seguimientoPeiIndicador.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type {
  SeguimientoPeiIndicador,
  CreateSeguimientoPeiIndicadorInput,
  UpdateSeguimientoPeiIndicadorInput,
} from "../types/seguimientoPei.types";

// Importar queries y mutations
import {
  LIST_SEGUIMIENTOS_PEI_INDICADORES,
  GET_SEGUIMIENTO_PEI_INDICADOR,
  GET_SEGUIMIENTOS_PEI_INDICADORES_ORDENADOS,
  COUNT_SEGUIMIENTOS_PEI_INDICADORES,
  EXISTS_SEGUIMIENTO_PEI_INDICADOR,
  FILTER_INDICADORES_POR_OBJETIVO,
} from "@/graphql/pei/queries/seguimientoPeiIndicador.queries";

import {
  CREATE_SEGUIMIENTO_PEI_INDICADOR,
  UPDATE_SEGUIMIENTO_PEI_INDICADOR,
  DELETE_SEGUIMIENTO_PEI_INDICADOR,
} from "@/graphql/pei/mutations/seguimientoPeiIndicador.mutations";

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

const handleError = createServiceErrorHandler("SeguimientoPeiIndicadorService");

// ===== NORMALIZADOR =====
const normalizarSeguimientoPeiIndicador = (
  indicador: any,
): SeguimientoPeiIndicador => ({
  id: indicador.id,
  programado: indicador.programado,
  ejecutado: indicador.ejecutado,
  grado_cumplimiento: indicador.gradoComplimiento,
  escala_valoracion: indicador.escalaValoracion,
  comentarios: indicador.comentarios || "",
  seguimiento_pei_objetivo_id_spo: indicador.seguimientoPeiObjetivo?.id || 0,
  progra_anual_meta_id_pam: indicador.procesoAnualMeta?.id || 0,
  seguimiento_pei_objetivo: indicador.seguimientoPeiObjetivo,
  programa_anual_meta: indicador.procesoAnualMeta
    ? {
        id: indicador.procesoAnualMeta.id,
        anio: indicador.procesoAnualMeta.anio,
        programado: indicador.procesoAnualMeta.programado,
        ejecutado: indicador.procesoAnualMeta.ejecutado,
        idIndicadorPeiImp: indicador.procesoAnualMeta.idIndicadorPeiImp,
      }
    : undefined,
});

// ===== SERVICE =====
export const SeguimientoPeiIndicadorService = {
  listAll: async ({ limit = 10, offset = 0 }: PaginationParams = {}): Promise<{
    results: SeguimientoPeiIndicador[];
    count: number;
  }> => {
    try {
      const response = await fetchGraphQL<{
        listSeguimientosPeiIndicadores: ListResponse<any>;
      }>(LIST_SEGUIMIENTOS_PEI_INDICADORES, { limit, offset });

      const results = response.listSeguimientosPeiIndicadores.results.map(
        normalizarSeguimientoPeiIndicador,
      );

      return {
        results,
        count: response.listSeguimientosPeiIndicadores.count,
      };
    } catch (error) {
      return handleError("listAll", error);
    }
  },

  getByObjetivoId: async (
    objetivoId: number,
  ): Promise<SeguimientoPeiIndicador[]> => {
    try {
      // Intentar usar la query específica de filtro si está disponible
      const response = await fetchGraphQL<{
        filterIndicadoresPorObjetivo: ListResponse<any>;
      }>(FILTER_INDICADORES_POR_OBJETIVO, {
        objetivoId,
        limit: 100,
        offset: 0,
      });

      return response.filterIndicadoresPorObjetivo.results.map(
        normalizarSeguimientoPeiIndicador,
      );
    } catch (error) {
      // Fallback: obtener todos los indicadores y filtrar manualmente
      try {
        const allResponse = await fetchGraphQL<{
          listSeguimientosPeiIndicadores: ListResponse<any>;
        }>(LIST_SEGUIMIENTOS_PEI_INDICADORES, { limit: 100, offset: 0 });

        const allIndicadores =
          allResponse.listSeguimientosPeiIndicadores.results.map(
            normalizarSeguimientoPeiIndicador,
          );

        // Filtrar por seguimiento_pei_objetivo_id_spo
        return allIndicadores.filter(
          (ind) => ind.seguimiento_pei_objetivo_id_spo === objetivoId,
        );
      } catch (fallbackError) {
        return handleError("getByObjetivoId", fallbackError);
      }
    }
  },

  getById: async (id: number): Promise<SeguimientoPeiIndicador> => {
    try {
      const response = await fetchGraphQL<{
        getSeguimientoPeiIndicador: MutationResponse<any>;
      }>(GET_SEGUIMIENTO_PEI_INDICADOR, { id });

      if (
        !response.getSeguimientoPeiIndicador.success ||
        !response.getSeguimientoPeiIndicador.data
      ) {
        throw new Error(
          response.getSeguimientoPeiIndicador.message ||
            "No se encontró el indicador",
        );
      }

      return normalizarSeguimientoPeiIndicador(
        response.getSeguimientoPeiIndicador.data,
      );
    } catch (error) {
      return handleError("getById", error);
    }
  },

  create: async (
    data: CreateSeguimientoPeiIndicadorInput,
  ): Promise<SeguimientoPeiIndicador> => {
    try {
      const variables = {
        ejecutado: data.ejecutado,
        escalaValoracion: data.escala_valoracion,
        gradoComplimiento: data.grado_cumplimiento,
        procesoAnualMetaId: data.progra_anual_meta_id_pam,
        programado: data.programado,
        seguimientoPeiObjetivoId: data.seguimiento_pei_objetivo_id_spo,
        comentarios: data.comentarios,
      };

      const response = await fetchGraphQL<{
        createSeguimientoPeiIndicador: MutationResponse<any>;
      }>(CREATE_SEGUIMIENTO_PEI_INDICADOR, variables);

      if (
        !response.createSeguimientoPeiIndicador.success ||
        !response.createSeguimientoPeiIndicador.data
      ) {
        throw new Error(
          response.createSeguimientoPeiIndicador.message ||
            "No se pudo crear el indicador",
        );
      }

      return normalizarSeguimientoPeiIndicador(
        response.createSeguimientoPeiIndicador.data,
      );
    } catch (error) {
      return handleError("create", error);
    }
  },

  update: async (
    id: number,
    data: UpdateSeguimientoPeiIndicadorInput,
  ): Promise<SeguimientoPeiIndicador> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.programado !== undefined) variables.programado = data.programado;
      if (data.ejecutado !== undefined) variables.ejecutado = data.ejecutado;
      if (data.grado_cumplimiento !== undefined)
        variables.gradoComplimiento = data.grado_cumplimiento;
      if (data.escala_valoracion !== undefined)
        variables.escalaValoracion = data.escala_valoracion;
      if (data.comentarios !== undefined)
        variables.comentarios = data.comentarios;
      if (data.progra_anual_meta_id_pam !== undefined)
        variables.procesoAnualMetaId = data.progra_anual_meta_id_pam;

      const response = await fetchGraphQL<{
        updateSeguimientoPeiIndicador: MutationResponse<any>;
      }>(UPDATE_SEGUIMIENTO_PEI_INDICADOR, variables);

      if (
        !response.updateSeguimientoPeiIndicador.success ||
        !response.updateSeguimientoPeiIndicador.data
      ) {
        throw new Error(
          response.updateSeguimientoPeiIndicador.message ||
            "No se pudo actualizar el indicador",
        );
      }

      return normalizarSeguimientoPeiIndicador(
        response.updateSeguimientoPeiIndicador.data,
      );
    } catch (error) {
      return handleError("update", error);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteSeguimientoPeiIndicador: MutationResponse<boolean>;
      }>(DELETE_SEGUIMIENTO_PEI_INDICADOR, { id });

      if (!response.deleteSeguimientoPeiIndicador.success) {
        throw new Error(
          response.deleteSeguimientoPeiIndicador.message ||
            "No se pudo eliminar el indicador",
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },

  // ===== MÉTODOS ADICIONALES =====
  count: async (): Promise<number> => {
    try {
      const response = await fetchGraphQL<{
        countSeguimientosPeiIndicadores: number;
      }>(COUNT_SEGUIMIENTOS_PEI_INDICADORES, {});

      return response.countSeguimientosPeiIndicadores;
    } catch (error) {
      return handleError("count", error);
    }
  },

  exists: async (id: number): Promise<boolean> => {
    try {
      const response = await fetchGraphQL<{
        existsSeguimientoPeiIndicador: boolean;
      }>(EXISTS_SEGUIMIENTO_PEI_INDICADOR, { id });

      return response.existsSeguimientoPeiIndicador;
    } catch (error) {
      return handleError("exists", error);
    }
  },

  getOrdenados: async (
    orderBy: string,
    { limit = 10, offset = 0 }: PaginationParams = {},
  ): Promise<{ results: SeguimientoPeiIndicador[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        getSeguimientosPeiIndicadoresOrdenados: ListResponse<any>;
      }>(GET_SEGUIMIENTOS_PEI_INDICADORES_ORDENADOS, {
        orderBy,
        limit,
        offset,
      });

      const results =
        response.getSeguimientosPeiIndicadoresOrdenados.results.map(
          normalizarSeguimientoPeiIndicador,
        );

      return {
        results,
        count: response.getSeguimientosPeiIndicadoresOrdenados.count,
      };
    } catch (error) {
      return handleError("getOrdenados", error);
    }
  },
};

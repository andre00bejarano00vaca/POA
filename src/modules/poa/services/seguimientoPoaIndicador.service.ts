// src/modules/seguimiento/services/seguimientoPoaIndicador.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import type {
  SeguimientoPoaIndicador,
  ActualizarEjecutadoIndicadorPoaInput,
} from "../types/seguimientoPoa.types";

import {
  LIST_SEGUIMIENTOS_POA_INDICADOR,
  GET_SEGUIMIENTO_POA_INDICADOR,
} from "@/graphql/poa/queries/seguimientoPoaIndicador.queries";

import {
  UPDATE_SEGUIMIENTO_POA_INDICADOR,
  ACTUALIZAR_EJECUTADO_INDICADOR_POA,
} from "@/graphql/poa/mutations/seguimientoPoaIndicador.mutations";

interface MutationResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

interface ListResponse<T> {
  count: number;
  results: T[];
}

const normalizarSeguimientoPoaIndicador = (
  indicador: any,
): SeguimientoPoaIndicador => ({
  id: indicador.id,
  programado: indicador.programado,
  ejecutado: indicador.ejecutado,
  gradoCumplimiento:
    indicador.gradoCumplimiento || indicador.gradoComplimiento || 0,
  escalaValoracion: indicador.escalaValoracion,
  comentarios: indicador.comentarios || "",
  seguimiento_poa_actividad_id: indicador.seguimientoPoaActividad?.id || 0,
  programacion_trimestral_id: indicador.programacionTrimestral?.id || 0,
  programacionTrimestral: indicador.programacionTrimestral || null,
  seguimientoPoaActividad: indicador.seguimientoPoaActividad || null,
});

export const SeguimientoPoaIndicadorService = {
  listAll: async (
    limit?: number,
    offset?: number,
  ): Promise<{ results: SeguimientoPoaIndicador[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        listSeguimientosPoaIndicador: ListResponse<any>;
      }>(LIST_SEGUIMIENTOS_POA_INDICADOR, { limit, offset });

      const results = response.listSeguimientosPoaIndicador.results.map(
        normalizarSeguimientoPoaIndicador,
      );

      return {
        results,
        count: response.listSeguimientosPoaIndicador.count,
      };
    } catch (error) {
      console.error("Error en SeguimientoPoaIndicadorService.listAll:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<SeguimientoPoaIndicador> => {
    try {
      const response = await fetchGraphQL<{
        getSeguimientoPoaIndicador: MutationResponse<any>;
      }>(GET_SEGUIMIENTO_POA_INDICADOR, { id });

      if (
        !response.getSeguimientoPoaIndicador.success ||
        !response.getSeguimientoPoaIndicador.data
      ) {
        throw new Error(
          response.getSeguimientoPoaIndicador.message ||
            "No se encontró el Seguimiento POA Indicador",
        );
      }

      return normalizarSeguimientoPoaIndicador(
        response.getSeguimientoPoaIndicador.data,
      );
    } catch (error) {
      console.error("Error en SeguimientoPoaIndicadorService.getById:", error);
      throw error;
    }
  },

  update: async (
    id: number,
    ejecutado: number,
    comentarios?: string,
  ): Promise<SeguimientoPoaIndicador> => {
    try {
      const response = await fetchGraphQL<{
        updateSeguimientoPoaIndicador: MutationResponse<any>;
      }>(UPDATE_SEGUIMIENTO_POA_INDICADOR, {
        id,
        ejecutado: Math.round(ejecutado),
        comentarios,
      });

      if (
        !response.updateSeguimientoPoaIndicador.success ||
        !response.updateSeguimientoPoaIndicador.data
      ) {
        throw new Error(
          response.updateSeguimientoPoaIndicador.message ||
            "No se pudo actualizar el Seguimiento POA Indicador",
        );
      }

      return normalizarSeguimientoPoaIndicador(
        response.updateSeguimientoPoaIndicador.data,
      );
    } catch (error) {
      console.error("Error en SeguimientoPoaIndicadorService.update:", error);
      throw error;
    }
  },

  actualizarEjecutado: async (
    data: ActualizarEjecutadoIndicadorPoaInput,
  ): Promise<SeguimientoPoaIndicador> => {
    try {
      const response = await fetchGraphQL<{
        actualizarEjecutadoIndicadorPoa: MutationResponse<any>;
      }>(ACTUALIZAR_EJECUTADO_INDICADOR_POA, {
        seguimientoIndicadorId: data.seguimientoIndicadorId,
        ejecutado: Math.round(data.ejecutado),
        comentarios: data.comentarios || "",
      });

      if (
        !response.actualizarEjecutadoIndicadorPoa.success ||
        !response.actualizarEjecutadoIndicadorPoa.data
      ) {
        throw new Error(
          response.actualizarEjecutadoIndicadorPoa.message ||
            "No se pudo actualizar el ejecutado del indicador POA",
        );
      }

      return normalizarSeguimientoPoaIndicador(
        response.actualizarEjecutadoIndicadorPoa.data,
      );
    } catch (error) {
      console.error(
        "Error en SeguimientoPoaIndicadorService.actualizarEjecutado:",
        error,
      );
      throw error;
    }
  },
};

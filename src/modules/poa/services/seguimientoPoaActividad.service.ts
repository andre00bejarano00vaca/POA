// src/modules/seguimiento/services/seguimientoPoaActividad.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import type { SeguimientoPoaActividad } from "../types/seguimientoPoa.types";

import {
  LIST_SEGUIMIENTOS_POA_ACTIVIDAD,
  GET_SEGUIMIENTO_POA_ACTIVIDAD,
} from "@/graphql/poa/queries/seguimientoPoaActividad.queries";

import { DELETE_SEGUIMIENTO_POA_ACTIVIDAD } from "@/graphql/poa/mutations/seguimientoPoaActividad.mutations";

interface MutationResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

interface ListResponse<T> {
  count: number;
  results: T[];
}

const normalizarSeguimientoPoaActividad = (
  actividad: any,
): SeguimientoPoaActividad => ({
  id: actividad.id,
  promedioCumplimiento: actividad.promedioCumplimiento,
  escalaValoracion: actividad.escalaValoracion,
  valoracionCualitativa: actividad.valoracionCualitativa || "",
  seguimiento_poa_id: actividad.seguimientoPoa?.id || 0,
  actividad_id: actividad.actividad?.id || 0,
  actividad: actividad.actividad || null,
  seguimientoPoa: actividad.seguimientoPoa || null,
});

export const SeguimientoPoaActividadService = {
  listAll: async (
    limit?: number,
    offset?: number,
  ): Promise<{ results: SeguimientoPoaActividad[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        listSeguimientosPoaActividad: ListResponse<any>;
      }>(LIST_SEGUIMIENTOS_POA_ACTIVIDAD, { limit, offset });

      const results = response.listSeguimientosPoaActividad.results.map(
        normalizarSeguimientoPoaActividad,
      );

      return {
        results,
        count: response.listSeguimientosPoaActividad.count,
      };
    } catch (error) {
      console.error("Error en SeguimientoPoaActividadService.listAll:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<SeguimientoPoaActividad> => {
    try {
      const response = await fetchGraphQL<{
        getSeguimientoPoaActividad: MutationResponse<any>;
      }>(GET_SEGUIMIENTO_POA_ACTIVIDAD, { id });

      if (
        !response.getSeguimientoPoaActividad.success ||
        !response.getSeguimientoPoaActividad.data
      ) {
        throw new Error(
          response.getSeguimientoPoaActividad.message ||
            "No se encontró el Seguimiento POA Actividad",
        );
      }

      return normalizarSeguimientoPoaActividad(
        response.getSeguimientoPoaActividad.data,
      );
    } catch (error) {
      console.error("Error en SeguimientoPoaActividadService.getById:", error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteSeguimientoPoaActividad: MutationResponse<boolean>;
      }>(DELETE_SEGUIMIENTO_POA_ACTIVIDAD, { id });

      if (!response.deleteSeguimientoPoaActividad.success) {
        throw new Error(
          response.deleteSeguimientoPoaActividad.message ||
            "No se pudo eliminar el Seguimiento POA Actividad",
        );
      }
    } catch (error) {
      console.error("Error en SeguimientoPoaActividadService.delete:", error);
      throw error;
    }
  },
};

// src/modules/poa/services/programacionTrimestral.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import type {
  ProgramacionTrimestral,
  UpdateProgramacionTrimestralInput,
} from "../types/programacionTrimestralMeta.types";

import {
  LIST_PROGRAMACIONES_TRIMESTRAL_META_POA,
  GET_PROGRAMACION_TRIMESTRAL_META_POA,
} from "@/graphql/poa/queries/programacionTrimestralMeta.queries";

import {
  UPDATE_PROGRAMACION_TRIMESTRAL_META_POA,
  DELETE_PROGRAMACION_TRIMESTRAL_META_POA,
} from "@/graphql/poa/mutations/programacionTrimestralMeta.mutations";

interface MutationResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

interface ListResponse<T> {
  count: number;
  results: T[];
}

const normalizarProgramacionTrimestral = (
  programacion: any,
): ProgramacionTrimestral => ({
  id: programacion.id,
  trimestre: programacion.trimestre,
  programado: programacion.programado,
  indicadorPoaId: programacion.indicadorPoa?.id || 0,
  indicadorPoa: programacion.indicadorPoa || null,
});

export const ProgramacionTrimestralService = {
  listAll: async (): Promise<{
    results: ProgramacionTrimestral[];
    count: number;
  }> => {
    try {
      const response = await fetchGraphQL<{
        listProgramacionesTrimestralMetaPoa: ListResponse<any>;
      }>(LIST_PROGRAMACIONES_TRIMESTRAL_META_POA);

      const results = response.listProgramacionesTrimestralMetaPoa.results.map(
        normalizarProgramacionTrimestral,
      );

      return {
        results,
        count: response.listProgramacionesTrimestralMetaPoa.count,
      };
    } catch (error) {
      console.error("Error en ProgramacionTrimestralService.listAll:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<ProgramacionTrimestral> => {
    try {
      const response = await fetchGraphQL<{
        getProgramacionTrimestralMetaPoa: MutationResponse<any>;
      }>(GET_PROGRAMACION_TRIMESTRAL_META_POA, { id });

      if (
        !response.getProgramacionTrimestralMetaPoa.success ||
        !response.getProgramacionTrimestralMetaPoa.data
      ) {
        throw new Error(
          response.getProgramacionTrimestralMetaPoa.message ||
            "No se encontró la Programación Trimestral",
        );
      }

      return normalizarProgramacionTrimestral(
        response.getProgramacionTrimestralMetaPoa.data,
      );
    } catch (error) {
      console.error("Error en ProgramacionTrimestralService.getById:", error);
      throw error;
    }
  },

  update: async (
    id: number,
    data: UpdateProgramacionTrimestralInput,
  ): Promise<ProgramacionTrimestral> => {
    try {
      const response = await fetchGraphQL<{
        updateProgramacionTrimestralMetaPoa: MutationResponse<any>;
      }>(UPDATE_PROGRAMACION_TRIMESTRAL_META_POA, {
        id,
        programado: Math.round(data.programado!),
      });

      if (
        !response.updateProgramacionTrimestralMetaPoa.success ||
        !response.updateProgramacionTrimestralMetaPoa.data
      ) {
        throw new Error(
          response.updateProgramacionTrimestralMetaPoa.message ||
            "No se pudo actualizar la Programación Trimestral",
        );
      }

      return normalizarProgramacionTrimestral(
        response.updateProgramacionTrimestralMetaPoa.data,
      );
    } catch (error) {
      console.error("Error en ProgramacionTrimestralService.update:", error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteProgramacionTrimestralMetaPoa: MutationResponse<boolean>;
      }>(DELETE_PROGRAMACION_TRIMESTRAL_META_POA, { id });

      if (!response.deleteProgramacionTrimestralMetaPoa.success) {
        throw new Error(
          response.deleteProgramacionTrimestralMetaPoa.message ||
            "No se pudo eliminar la Programación Trimestral",
        );
      }
    } catch (error) {
      console.error("Error en ProgramacionTrimestralService.delete:", error);
      throw error;
    }
  },
};

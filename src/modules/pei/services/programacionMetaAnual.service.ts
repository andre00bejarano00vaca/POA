// src/modules/pei/services/programacionMetaAnual.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import {
  normalizeEntity,
  normalizeRelation,
  passthrough,
} from "@/shared/lib/normalizers";
import type {
  ProgramacionMetaAnual,
  UpdateProgramacionMetaAnualInput,
} from "../types/programacionMetaAnual.types";

import {
  LIST_PROGRAMACIONES_METAS_ANUALES,
  GET_PROGRAMACION_META_ANUAL,
} from "@/graphql/pei/queries/programacionMetaAnual.queries";

import {
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

const handleError = createServiceErrorHandler("ProgramacionMetaAnualService");

const normalizarProgramacionMetaAnual = (
  programacion: any,
): ProgramacionMetaAnual =>
  normalizeEntity<any, ProgramacionMetaAnual>(programacion, {
    id: passthrough,
    anio: passthrough,
    programado: passthrough,
    idIndicadorPeiImp: normalizeRelation,
    peiIdPei: normalizeRelation,
  });

export const ProgramacionMetaAnualService = {
  listAll: async (): Promise<{
    results: ProgramacionMetaAnual[];
    count: number;
  }> => {
    try {
      const response = await fetchGraphQL<{
        listProgramacionesMetasAnuales: ListResponse<any>;
      }>(LIST_PROGRAMACIONES_METAS_ANUALES);

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
            "No se encontró la Programación Meta Anual",
        );
      }

      return normalizarProgramacionMetaAnual(
        response.getProgramacionMetaAnual.data,
      );
    } catch (error) {
      return handleError("getById", error);
    }
  },

  update: async (
    id: number,
    data: UpdateProgramacionMetaAnualInput,
  ): Promise<ProgramacionMetaAnual> => {
    try {
      const response = await fetchGraphQL<{
        updateProgramacionMetaAnual: MutationResponse<any>;
      }>(UPDATE_PROGRAMACION_META_ANUAL, {
        id,
        programado: Math.round(data.programado),
      });

      if (
        !response.updateProgramacionMetaAnual.success ||
        !response.updateProgramacionMetaAnual.data
      ) {
        throw new Error(
          response.updateProgramacionMetaAnual.message ||
            "No se pudo actualizar la Programación Meta Anual",
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
            "No se pudo eliminar la Programación Meta Anual",
        );
      }
    } catch (error) {
      return handleError("delete", error);
    }
  },
};

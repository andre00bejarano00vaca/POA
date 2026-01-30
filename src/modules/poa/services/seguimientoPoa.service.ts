// src/modules/seguimiento/services/seguimientoPoa.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import type {
  SeguimientoPoa,
  CreateSeguimientoPoaInput,
  UpdateSeguimientoPoaInput,
} from "../types/seguimientoPoa.types";

import {
  LIST_SEGUIMIENTOS_POA,
  GET_SEGUIMIENTO_POA,
} from "@/graphql/poa/queries/seguimientoPoa.queries";

import {
  CREATE_SEGUIMIENTO_POA,
  UPDATE_SEGUIMIENTO_POA,
  DELETE_SEGUIMIENTO_POA,
  SYNC_ESTRUCTURA_SEGUIMIENTO_POA,
} from "@/graphql/poa/mutations/seguimientoPoa.mutations";

interface MutationResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

interface ListResponse<T> {
  count: number;
  results: T[];
}

/**
 * Convierte cualquier formato de fecha a YYYY-MM-DD para GraphQL
 */
const formatearFechaParaGraphQL = (fecha?: string | Date): string => {
  if (!fecha) {
    return new Date().toISOString().split("T")[0];
  }
  if (fecha instanceof Date) {
    return fecha.toISOString().split("T")[0];
  }
  return fecha.split("T")[0];
};

const normalizarSeguimientoPoa = (seguimiento: any): SeguimientoPoa => ({
  id: seguimiento.id,
  trimestre: seguimiento.trimestre,
  promedioGeneral: seguimiento.promedioGeneral,
  valoracionGlobal: seguimiento.valoracionGlobal,
  observaciones: seguimiento.observaciones || "",
  porcAlta: seguimiento.porcAlta,
  porcMedia: seguimiento.porcMedia,
  porcBaja: seguimiento.porcBaja,
  fechaRegistro: new Date(seguimiento.fechaRegistro),
  poa_id: seguimiento.poa?.id || 0,
  poa: seguimiento.poa || null,
});

export const SeguimientoPoaService = {
  listAll: async (
    limit?: number,
    offset?: number,
  ): Promise<{ results: SeguimientoPoa[]; count: number }> => {
    try {
      const response = await fetchGraphQL<{
        listSeguimientosPoa: ListResponse<any>;
      }>(LIST_SEGUIMIENTOS_POA, { limit, offset });

      const results = response.listSeguimientosPoa.results.map(
        normalizarSeguimientoPoa,
      );

      return {
        results,
        count: response.listSeguimientosPoa.count,
      };
    } catch (error) {
      console.error("Error en SeguimientoPoaService.listAll:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<SeguimientoPoa> => {
    try {
      const response = await fetchGraphQL<{
        getSeguimientoPoa: MutationResponse<any>;
      }>(GET_SEGUIMIENTO_POA, { id });

      if (
        !response.getSeguimientoPoa.success ||
        !response.getSeguimientoPoa.data
      ) {
        throw new Error(
          response.getSeguimientoPoa.message ||
            "No se encontró el Seguimiento POA",
        );
      }

      return normalizarSeguimientoPoa(response.getSeguimientoPoa.data);
    } catch (error) {
      console.error("Error en SeguimientoPoaService.getById:", error);
      throw error;
    }
  },

  create: async (data: CreateSeguimientoPoaInput): Promise<SeguimientoPoa> => {
    try {
      const response = await fetchGraphQL<{
        createSeguimientoPoa: MutationResponse<any>;
      }>(CREATE_SEGUIMIENTO_POA, {
        trimestre: data.trimestre,
        fechaRegistro: formatearFechaParaGraphQL(data.fechaRegistro),
        observaciones: data.observaciones || "",
        poaId: data.poaId,
      });

      if (
        !response.createSeguimientoPoa.success ||
        !response.createSeguimientoPoa.data
      ) {
        throw new Error(
          response.createSeguimientoPoa.message ||
            "No se pudo crear el Seguimiento POA",
        );
      }

      return normalizarSeguimientoPoa(response.createSeguimientoPoa.data);
    } catch (error) {
      console.error("Error en SeguimientoPoaService.create:", error);
      throw error;
    }
  },

  update: async (
    id: number,
    data: UpdateSeguimientoPoaInput,
  ): Promise<SeguimientoPoa> => {
    try {
      const variables: Record<string, unknown> = { id };

      if (data.fechaRegistro !== undefined) {
        variables.fechaRegistro = formatearFechaParaGraphQL(data.fechaRegistro);
      }
      if (data.observaciones !== undefined) {
        variables.observaciones = data.observaciones;
      }

      const response = await fetchGraphQL<{
        updateSeguimientoPoa: MutationResponse<any>;
      }>(UPDATE_SEGUIMIENTO_POA, variables);

      if (
        !response.updateSeguimientoPoa.success ||
        !response.updateSeguimientoPoa.data
      ) {
        throw new Error(
          response.updateSeguimientoPoa.message ||
            "No se pudo actualizar el Seguimiento POA",
        );
      }

      return normalizarSeguimientoPoa(response.updateSeguimientoPoa.data);
    } catch (error) {
      console.error("Error en SeguimientoPoaService.update:", error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetchGraphQL<{
        deleteSeguimientoPoa: MutationResponse<boolean>;
      }>(DELETE_SEGUIMIENTO_POA, { id });

      if (!response.deleteSeguimientoPoa.success) {
        throw new Error(
          response.deleteSeguimientoPoa.message ||
            "No se pudo eliminar el Seguimiento POA",
        );
      }
    } catch (error) {
      console.error("Error en SeguimientoPoaService.delete:", error);
      throw error;
    }
  },

  syncEstructura: async (seguimientoId: number): Promise<SeguimientoPoa> => {
    try {
      const response = await fetchGraphQL<{
        syncEstructuraSeguimientoPoa: MutationResponse<any>;
      }>(SYNC_ESTRUCTURA_SEGUIMIENTO_POA, { seguimientoId });

      if (
        !response.syncEstructuraSeguimientoPoa.success ||
        !response.syncEstructuraSeguimientoPoa.data
      ) {
        throw new Error(
          response.syncEstructuraSeguimientoPoa.message ||
            "No se pudo sincronizar la estructura del Seguimiento POA",
        );
      }

      return normalizarSeguimientoPoa(
        response.syncEstructuraSeguimientoPoa.data,
      );
    } catch (error) {
      console.error("Error en SeguimientoPoaService.syncEstructura:", error);
      throw error;
    }
  },
};

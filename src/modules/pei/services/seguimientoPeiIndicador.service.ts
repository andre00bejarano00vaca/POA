// src/modules/seguimiento/services/seguimientoPeiIndicador.service.ts

import { fetchGraphQL } from "@/shared/lib/graphql-client";
import { createServiceErrorHandler } from "@/shared/lib/service-errors";
import type { SeguimientoPeiIndicador } from "../types/seguimientoPei.types";

import {
  LIST_SEGUIMIENTOS_PEI_INDICADORES,
  GET_SEGUIMIENTO_PEI_INDICADOR,
  GET_SEGUIMIENTOS_PEI_INDICADORES_ORDENADOS,
  COUNT_SEGUIMIENTOS_PEI_INDICADORES,
  EXISTS_SEGUIMIENTO_PEI_INDICADOR,
  FILTER_INDICADORES_POR_OBJETIVO,
} from "@/graphql/pei/queries/seguimientoPeiIndicador.queries";

import { ACTUALIZAR_EJECUTADO_SEGUIMIENTO_INDICADOR } from "@/graphql/pei/mutations/seguimientoPeiIndicador.mutations";

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

/**
 * ✅ NORMALIZACIÓN COMPLETA coherente con ACTUALIZAR_EJECUTADO_SEGUIMIENTO_INDICADOR
 */
const normalizarSeguimientoPeiIndicador = (
  indicador: any,
): SeguimientoPeiIndicador => ({
  id: indicador.id,
  programado: indicador.programado ?? 0,
  ejecutado: indicador.ejecutado ?? 0,
  grado_cumplimiento: indicador.gradoComplimiento ?? 0,
  escala_valoracion: indicador.escalaValoracion ?? "BAJA",
  comentarios: indicador.comentarios ?? "",

  // IDs para compatibilidad
  seguimiento_pei_objetivo_id_spo: indicador.seguimientoPeiObjetivo?.id ?? 0,
  progra_anual_meta_id_pam: indicador.metaAnual?.id ?? 0,

  // ✅ Objeto seguimiento_pei_objetivo completo (camelCase → snake_case)
  seguimiento_pei_objetivo: indicador.seguimientoPeiObjetivo
    ? {
        id: indicador.seguimientoPeiObjetivo.id,
        promedio_cumplimiento:
          indicador.seguimientoPeiObjetivo.promedioCumplimiento ?? 0,
        escala_valoracion:
          indicador.seguimientoPeiObjetivo.escalaValoracion ?? "BAJA",
        valoracion_cualitativa:
          indicador.seguimientoPeiObjetivo.valoracionCualitativa ?? "",
        objetivo_estrategico_id: 0, // No viene en la respuesta
        seguimiento_pei_id:
          indicador.seguimientoPeiObjetivo.seguimientoPei?.id ?? 0,
        objetivo_estrategico: undefined, // No viene en la respuesta

        // ✅ Seguimiento PEI anidado (camelCase → snake_case)
        seguimiento_pei: indicador.seguimientoPeiObjetivo.seguimientoPei
          ? {
              id: indicador.seguimientoPeiObjetivo.seguimientoPei.id,
              ano: indicador.seguimientoPeiObjetivo.seguimientoPei.anio ?? 0,
              promedio_general:
                indicador.seguimientoPeiObjetivo.seguimientoPei
                  .promediaGeneral ?? 0,
              valoracion_global:
                indicador.seguimientoPeiObjetivo.seguimientoPei
                  .valoracionGlobal ?? "",
              observaciones:
                indicador.seguimientoPeiObjetivo.seguimientoPei.observaciones ??
                "",
              porc_alta:
                indicador.seguimientoPeiObjetivo.seguimientoPei.porcAlta ?? 0,
              porc_media:
                indicador.seguimientoPeiObjetivo.seguimientoPei.porcMedia ?? 0,
              porc_baja:
                indicador.seguimientoPeiObjetivo.seguimientoPei.porcBaja ?? 0,
              fecha_registro:
                indicador.seguimientoPeiObjetivo.seguimientoPei.fechaRegistro ??
                "",
              pei_id:
                indicador.seguimientoPeiObjetivo.seguimientoPei.pei?.id ?? 0,
              pei: indicador.seguimientoPeiObjetivo.seguimientoPei.pei
                ? {
                    id: indicador.seguimientoPeiObjetivo.seguimientoPei.pei.id,
                    anioIni:
                      indicador.seguimientoPeiObjetivo.seguimientoPei.pei
                        .anioIni,
                    anioFin:
                      indicador.seguimientoPeiObjetivo.seguimientoPei.pei
                        .anioFin,
                    metaTotal:
                      indicador.seguimientoPeiObjetivo.seguimientoPei.pei
                        .metaTotal ?? 0,
                    ejecucion:
                      indicador.seguimientoPeiObjetivo.seguimientoPei.pei
                        .ejecucion ?? 0,
                    observacion:
                      indicador.seguimientoPeiObjetivo.seguimientoPei.pei
                        .observacion ?? "",
                  }
                : undefined,
            }
          : undefined,
      }
    : undefined,

  // ✅ Objeto programa_anual_meta completo (camelCase → snake_case)
  programa_anual_meta: indicador.metaAnual
    ? {
        id: indicador.metaAnual.id,
        anio: indicador.metaAnual.anio ?? 0,
        programado: indicador.metaAnual.programado ?? 0,
        ejecutado: indicador.metaAnual.ejecutado ?? 0,
        id_indicador_pei_imp_id: indicador.metaAnual.idIndicadorPeiImp?.id ?? 0,
        pei_id_pei_id: indicador.metaAnual.peiIdPei?.id ?? 0,

        // ✅ Indicador PEI anidado
        idIndicadorPeiImp: indicador.metaAnual.idIndicadorPeiImp
          ? {
              id: indicador.metaAnual.idIndicadorPeiImp.id,
              description:
                indicador.metaAnual.idIndicadorPeiImp.description ?? "",
              unidadMedida:
                indicador.metaAnual.idIndicadorPeiImp.unidadMedida ?? "",
              formula: indicador.metaAnual.idIndicadorPeiImp.formula ?? "",
              lineaBase: indicador.metaAnual.idIndicadorPeiImp.lineaBase ?? 0,
              meta: indicador.metaAnual.idIndicadorPeiImp.meta ?? 0,

              // ✅ Objetivo Estratégico anidado
              objetivoEstrategico: indicador.metaAnual.idIndicadorPeiImp
                .objetivoEstrategico
                ? {
                    id: indicador.metaAnual.idIndicadorPeiImp
                      .objetivoEstrategico.id,
                    idOe:
                      indicador.metaAnual.idIndicadorPeiImp.objetivoEstrategico
                        .idOe ?? 0,
                    description:
                      indicador.metaAnual.idIndicadorPeiImp.objetivoEstrategico
                        .description ?? "",

                    // Política de Desarrollo anidada
                    politicaDesarrollo: indicador.metaAnual.idIndicadorPeiImp
                      .objetivoEstrategico.politicaDesarrollo
                      ? {
                          id: indicador.metaAnual.idIndicadorPeiImp
                            .objetivoEstrategico.politicaDesarrollo.id,
                          idPd:
                            indicador.metaAnual.idIndicadorPeiImp
                              .objetivoEstrategico.politicaDesarrollo.idPd ?? 0,
                          description:
                            indicador.metaAnual.idIndicadorPeiImp
                              .objetivoEstrategico.politicaDesarrollo
                              .description ?? "",

                          // Área Estratégica anidada
                          areaEstrategica: indicador.metaAnual.idIndicadorPeiImp
                            .objetivoEstrategico.politicaDesarrollo
                            .areaEstrategica
                            ? {
                                id: indicador.metaAnual.idIndicadorPeiImp
                                  .objetivoEstrategico.politicaDesarrollo
                                  .areaEstrategica.id,
                                description:
                                  indicador.metaAnual.idIndicadorPeiImp
                                    .objetivoEstrategico.politicaDesarrollo
                                    .areaEstrategica.description ?? "",

                                // PEI anidado
                                pei: indicador.metaAnual.idIndicadorPeiImp
                                  .objetivoEstrategico.politicaDesarrollo
                                  .areaEstrategica.pei
                                  ? {
                                      id: indicador.metaAnual.idIndicadorPeiImp
                                        .objetivoEstrategico.politicaDesarrollo
                                        .areaEstrategica.pei.id,
                                      anioIni:
                                        indicador.metaAnual.idIndicadorPeiImp
                                          .objetivoEstrategico
                                          .politicaDesarrollo.areaEstrategica
                                          .pei.anioIni,
                                      anioFin:
                                        indicador.metaAnual.idIndicadorPeiImp
                                          .objetivoEstrategico
                                          .politicaDesarrollo.areaEstrategica
                                          .pei.anioFin,
                                      metaTotal:
                                        indicador.metaAnual.idIndicadorPeiImp
                                          .objetivoEstrategico
                                          .politicaDesarrollo.areaEstrategica
                                          .pei.metaTotal ?? 0,
                                      ejecucion:
                                        indicador.metaAnual.idIndicadorPeiImp
                                          .objetivoEstrategico
                                          .politicaDesarrollo.areaEstrategica
                                          .pei.ejecucion ?? 0,
                                      observacion:
                                        indicador.metaAnual.idIndicadorPeiImp
                                          .objetivoEstrategico
                                          .politicaDesarrollo.areaEstrategica
                                          .pei.observacion ?? "",
                                    }
                                  : undefined,
                              }
                            : undefined,
                        }
                      : undefined,
                  }
                : undefined,
            }
          : undefined,
      }
    : undefined,
});

export const SeguimientoPeiIndicadorService = {
  /**
   * ✅ Lista todos los indicadores de seguimiento
   */
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

  /**
   * ✅ Obtiene indicadores por objetivo
   */
  getByObjetivoId: async (
    objetivoId: number,
  ): Promise<SeguimientoPeiIndicador[]> => {
    try {
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
      // Fallback: obtener todos y filtrar
      try {
        const allResponse = await fetchGraphQL<{
          listSeguimientosPeiIndicadores: ListResponse<any>;
        }>(LIST_SEGUIMIENTOS_PEI_INDICADORES, { limit: 100, offset: 0 });

        const allIndicadores =
          allResponse.listSeguimientosPeiIndicadores.results.map(
            normalizarSeguimientoPeiIndicador,
          );

        return allIndicadores.filter(
          (ind) => ind.seguimiento_pei_objetivo_id_spo === objetivoId,
        );
      } catch (fallbackError) {
        return handleError("getByObjetivoId", fallbackError);
      }
    }
  },

  /**
   * ✅ Obtiene un indicador por ID
   */
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

  /**
   * ✅ MÉTODO PRINCIPAL: Actualizar ejecutado
   *
   * Esta es la ÚNICA mutación disponible para SeguimientoPeiIndicador.
   *
   * Utiliza el método `actualizar_ejecutado()` del modelo Django, que:
   * - Calcula automáticamente grado_cumplimiento
   * - Determina escala_valoracion (ALTA/MEDIA/BAJA)
   * - Recalcula valores del objetivo padre
   * - Recalcula valores del seguimiento PEI completo
   *
   * @param id - ID del SeguimientoPEIIndicador
   * @param ejecutado - Valor ejecutado
   * @param comentarios - Comentarios opcionales
   * @returns SeguimientoPeiIndicador actualizado con toda la estructura anidada
   */
  actualizarEjecutado: async (
    id: number,
    ejecutado: number,
    comentarios?: string,
  ): Promise<SeguimientoPeiIndicador> => {
    try {
      const variables = {
        seguimientoPeiIndicadorId: id,
        ejecutado: ejecutado,
        comentarios: comentarios || null,
      };

      const response = await fetchGraphQL<{
        actualizarEjecutadoSeguimientoIndicador: MutationResponse<any>;
      }>(ACTUALIZAR_EJECUTADO_SEGUIMIENTO_INDICADOR, variables);

      if (
        !response.actualizarEjecutadoSeguimientoIndicador.success ||
        !response.actualizarEjecutadoSeguimientoIndicador.data
      ) {
        throw new Error(
          response.actualizarEjecutadoSeguimientoIndicador.message ||
            "No se pudo actualizar el ejecutado",
        );
      }

      return normalizarSeguimientoPeiIndicador(
        response.actualizarEjecutadoSeguimientoIndicador.data,
      );
    } catch (error) {
      return handleError("actualizarEjecutado", error);
    }
  },

  /**
   * ✅ Cuenta total de indicadores
   */
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

  /**
   * ✅ Verifica si existe un indicador
   */
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

  /**
   * ✅ Obtiene indicadores ordenados
   */
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

// src/modules/seguimiento/types/seguimientoPei.types.ts

import type { IndicadorPei } from "@/modules/pei/types/indicadorPei.types";
import type { PEI } from "@/modules/pei/types/pei.types";
import type { ObjetivoEstrategico } from "@/modules/pei/types/objetivoEstrategico.types";

// ===== SEGUIMIENTO_PEI (Tabla principal) =====
export interface SeguimientoPei {
  id: number;
  ano: number;
  promedio_general: number;
  valoracion_global: string;
  observaciones: string;
  porc_alta: number;
  porc_media: number;
  porc_baja: number;
  fecha_registro: Date;
  pei_id_pei: number;
  // Relaciones
  objetivos?: SeguimientoPeiObjetivo[];
  pei?: PEI;
}

// ===== SEGUIMIENTO_PEI_OBJETIVO =====
export interface SeguimientoPeiObjetivo {
  id: number;
  promedio_cumplimiento: number;
  escala_valoracion: string;
  valoracion_cualitativa: string;
  seguimiento_pei_id_spo: number;
  objetivo_estrategico_id_oe: number;
  // Relaciones
  indicadores?: SeguimientoPeiIndicador[];
  objetivo_estrategico?: ObjetivoEstrategico;
  seguimiento_pei?: SeguimientoPei;
}

// ===== SEGUIMIENTO_PEI_INDICADOR =====
export interface SeguimientoPeiIndicador {
  id: number;
  programado: number;
  ejecutado: number;
  grado_cumplimiento: number;
  escala_valoracion: string;
  comentarios: string;
  seguimiento_pei_objetivo_id_spo: number;
  progra_anual_meta_id_pam: number;
  // Relaciones
  seguimiento_pei_objetivo?: SeguimientoPeiObjetivo;
  programa_anual_meta?: any; // Referencia a tu ProgramacionMetaAnual
}

// ===== INPUTS PARA CRUD =====
export interface CreateSeguimientoPeiInput {
  ano: number;
  fecha_registro?: string | Date;
  promedio_general: number;
  valoracion_global: string;
  observaciones: string;
  porc_alta: number;
  porc_media: number;
  porc_baja: number;
  pei_id_pei: number;
}

export interface UpdateSeguimientoPeiInput {
  ano?: number;
  fecha_registro?: string | Date;
  promedio_general?: number;
  valoracion_global?: string;
  observaciones?: string;
  porc_alta?: number;
  porc_media?: number;
  porc_baja?: number;
  pei_id_pei?: number;
}

export interface CreateSeguimientoPeiObjetivoInput {
  promedio_cumplimiento: number;
  escala_valoracion: string;
  valoracion_cualitativa: string;
  seguimiento_pei_id_spo: number;
  objetivo_estrategico_id_oe: number;
}

export interface UpdateSeguimientoPeiObjetivoInput {
  promedio_cumplimiento?: number;
  escala_valoracion?: string;
  valoracion_cualitativa?: string;
  objetivo_estrategico_id_oe?: number;
}

export interface CreateSeguimientoPeiIndicadorInput {
  programado: number;
  ejecutado: number;
  grado_cumplimiento: number;
  escala_valoracion: string;
  comentarios: string;
  seguimiento_pei_objetivo_id_spo: number;
  progra_anual_meta_id_pam: number;
}

export interface UpdateSeguimientoPeiIndicadorInput {
  programado?: number;
  ejecutado?: number;
  grado_cumplimiento?: number;
  escala_valoracion?: string;
  comentarios?: string;
  progra_anual_meta_id_pam?: number;
}

// ===== VISTA COMPLETA PARA UI =====
export interface SeguimientoPeiCompleto extends SeguimientoPei {
  objetivos: (SeguimientoPeiObjetivo & {
    indicadores: SeguimientoPeiIndicador[];
    objetivo_estrategico: ObjetivoEstrategico;
  })[];
  pei: PEI;
}

// ===== ENUMS Y CONSTANTES =====
export const ESCALAS_VALORACION = {
  EXCELENTE: "Excelente",
  BUENO: "Bueno",
  REGULAR: "Regular",
  DEFICIENTE: "Deficiente",
} as const;

export type EscalaValoracion =
  (typeof ESCALAS_VALORACION)[keyof typeof ESCALAS_VALORACION];

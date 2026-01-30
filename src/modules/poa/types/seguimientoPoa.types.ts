// src/modules/seguimiento/types/seguimientoPoa.types.ts

import type { POA } from "@/modules/poa/types/poa.types";
import type { Actividad } from "@/modules/poa/types/actividad.types";

// ===== SEGUIMIENTO_POA (Tabla principal) =====
export interface SeguimientoPoa {
  id: number;
  trimestre: number;
  promedioGeneral: number;
  valoracionGlobal: string;
  observaciones: string;
  porcAlta: number;
  porcMedia: number;
  porcBaja: number;
  fechaRegistro: Date;
  poa_id: number;
  // Relaciones
  actividades?: SeguimientoPoaActividad[];
  poa?: POA;
}

// ===== SEGUIMIENTO_POA_ACTIVIDAD =====
export interface SeguimientoPoaActividad {
  id: number;
  promedioCumplimiento: number;
  escalaValoracion: string;
  valoracionCualitativa: string;
  seguimiento_poa_id: number;
  actividad_id: number;
  // Relaciones
  indicadores?: SeguimientoPoaIndicador[];
  actividad?: Actividad;
  seguimientoPoa?: SeguimientoPoa;
}

// ===== SEGUIMIENTO_POA_INDICADOR =====
export interface SeguimientoPoaIndicador {
  id: number;
  programado: number;
  ejecutado: number;
  gradoCumplimiento: number;
  escalaValoracion: string;
  comentarios: string;
  seguimiento_poa_actividad_id: number;
  programacion_trimestral_id: number;
  // Relaciones
  seguimientoPoaActividad?: SeguimientoPoaActividad;
  programacionTrimestral?: any; // Referencia a ProgramacionTrimestral
}

// ===== INPUTS PARA CRUD =====
export interface CreateSeguimientoPoaInput {
  trimestre: number;
  fechaRegistro?: string | Date;
  observaciones?: string;
  poaId: number;
}

export interface UpdateSeguimientoPoaInput {
  trimestre?: number;
  fechaRegistro?: string | Date;
  observaciones?: string;
  poaId?: number;
}

export interface CreateSeguimientoPoaActividadInput {
  promedioCumplimiento: number;
  escalaValoracion: string;
  valoracionCualitativa: string;
  seguimiento_poa_id: number;
  actividad_id: number;
}

export interface UpdateSeguimientoPoaActividadInput {
  promedioCumplimiento?: number;
  escalaValoracion?: string;
  valoracionCualitativa?: string;
  actividad_id?: number;
}

export interface CreateSeguimientoPoaIndicadorInput {
  programado: number;
  ejecutado: number;
  gradoCumplimiento: number;
  escalaValoracion: string;
  comentarios: string;
  seguimiento_poa_actividad_id: number;
  programacion_trimestral_id: number;
}

export interface UpdateSeguimientoPoaIndicadorInput {
  programado?: number;
  ejecutado?: number;
  gradoCumplimiento?: number;
  escalaValoracion?: string;
  comentarios?: string;
  programacion_trimestral_id?: number;
}

export interface ActualizarEjecutadoIndicadorPoaInput {
  seguimientoIndicadorId: number;
  ejecutado: number;
  comentarios?: string;
}

// ===== VISTA COMPLETA PARA UI =====
export interface SeguimientoPoaCompleto extends SeguimientoPoa {
  actividades: (SeguimientoPoaActividad & {
    indicadores: SeguimientoPoaIndicador[];
    actividad: Actividad;
  })[];
  poa: POA;
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

export const TRIMESTRES = {
  PRIMERO: 1,
  SEGUNDO: 2,
  TERCERO: 3,
  CUARTO: 4,
} as const;

export type Trimestre = (typeof TRIMESTRES)[keyof typeof TRIMESTRES];

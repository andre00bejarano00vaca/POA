// src/modules/poa/types/indicadorPoa.types.ts

import type { Actividad } from "./actividad.types";

export interface IndicadorPoa {
  id: number;
  description: string;
  formula: string;
  lineaBase: number;
  meta: number;
  unidadMedida: string;
  actividad: Actividad | null;
}

export interface CreateIndicadorPoaInput {
  description: string;
  formula: string;
  lineaBase: number;
  meta: number;
  unidadMedida: string;
  actividadId: number;
}

export interface UpdateIndicadorPoaInput {
  description?: string;
  formula?: string;
  lineaBase?: number;
  meta?: number;
  unidadMedida?: string;
  actividadId?: number;
}

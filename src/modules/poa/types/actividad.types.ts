// src/modules/poa/types/actividad.types.ts

import type { AccionCortoPlazo } from "./accionCortoPlazo.types";

export interface Actividad {
  id: number;
  description: string;
  tipo: string;
  clase: string;
  categProgramatica: string;
  fechaIni: string;
  fechaFinal: string;
  docVerif: number;
  causasDesv: string;
  accionCortoPlazo: AccionCortoPlazo | null;
}

export interface CreateActividadInput {
  description: string;
  tipo: string;
  clase: string;
  categProgramatica: string;
  fechaIni: string;
  fechaFinal: string;
  docVerif: number;
  causasDesv: string;
  accionCortoPlazoId: number;
}

export interface UpdateActividadInput {
  description?: string;
  tipo?: string;
  clase?: string;
  categProgramatica?: string;
  fechaIni?: string;
  fechaFinal?: string;
  docVerif?: number;
  causasDesv?: string;
  accionCortoPlazoId?: number;
}

// src/modules/pei/types/programacionMetaAnual.types.ts

import type { IndicadorPei } from "./indicadorPei.types";

export interface Pei {
  id: number;
  anioIni: number;
  anioFin: number;
  ejecucion: boolean;
  metaTotal: number;
  observacion: string | null;
}

export interface ProgramacionMetaAnual {
  id: number;
  anio: number;
  programado: number;
  idIndicadorPeiImp: IndicadorPei;
  peiIdPei: Pei;
}

// Solo UPDATE porque no tienes CREATE
export interface UpdateProgramacionMetaAnualInput {
  programado: number; // Solo esto según tu mutation
}

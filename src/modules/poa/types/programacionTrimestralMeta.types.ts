// src/modules/poa/types/programacionTrimestralMeta.types.ts

import type { IndicadorPoa } from "./indicadorPoa.types";

export interface ProgramacionTrimestralMeta {
  id: number;
  trimestre: number;
  programado: number;
  ejecutado: number;
  indicadorPoa: IndicadorPoa | null;
}

export interface CreateProgramacionTrimestralMetaInput {
  trimestre: number;
  programado: number;
  ejecutado: number;
  indicadorPoaId: number;
}

export interface UpdateProgramacionTrimestralMetaInput {
  trimestre?: number;
  programado?: number;
  ejecutado?: number;
  indicadorPoaId?: number;
}

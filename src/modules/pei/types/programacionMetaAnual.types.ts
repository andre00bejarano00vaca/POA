// src/modules/programacion/types/programacionMetaAnual.types.ts

import type { IndicadorPei } from "@/modules/pei/types/indicadorPei.types";
import type { PEI } from "@/modules/pei/types/pei.types";

export interface ProgramacionMetaAnual {
  id: number;
  anio: number;
  programado: number;
  ejecutado: number;
  idIndicadorPeiImp: IndicadorPei | null;
  peiIdPei: PEI | null;
}

export interface CreateProgramacionMetaAnualInput {
  anio: number;
  programado: number;
  ejecutado: number;
  idIndicadorPeiImpId: number;
  peiIdPeiId: number;
}

export interface UpdateProgramacionMetaAnualInput {
  anio?: number;
  programado?: number;
  ejecutado?: number;
  idIndicadorPeiImpId?: number;
  peiIdPeiId?: number;
}

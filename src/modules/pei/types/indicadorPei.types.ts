// src/modules/pei/types/indicadorPei.types.ts

import type { ObjetivoEstrategico } from "./objetivoEstrategico.types";

export interface IndicadorPei {
  id: number;
  description: string;
  formula: string;
  lineaBase: number;
  meta: number;
  unidadMedida: string;
  objetivoEstrategico: ObjetivoEstrategico | null;
}

export interface CreateIndicadorPeiInput {
  description: string;
  formula: string;
  lineaBase: number;
  meta: number;
  unidadMedida: string;
  objetivoEstrategicoId: number;
}

export interface UpdateIndicadorPeiInput {
  description?: string;
  formula?: string;
  lineaBase?: number;
  meta?: number;
  unidadMedida?: string;
  objetivoEstrategicoId?: number;
}

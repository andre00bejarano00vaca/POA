// src/modules/pei/types/politicaDesarrollo.types.ts

import type { AreaEstrategica } from "./area.types";

export interface PoliticaDesarrollo {
  id: number;
  idPd: number;
  description: string;
  areaEstrategica: AreaEstrategica | null;
}
export interface CreatePoliticaDesarrolloInput {
  idPd: number;
  description: string;
  areaEstrategicaId: number;
}

export interface UpdatePoliticaDesarrolloInput {
  idPd?: number;
  description?: string;
  areaEstrategicaId?: number;
}

// src/modules/pei/types/accionEstrategica.types.ts

import type { ObjetivoEstrategico } from "./objetivoEstrategico.types";

export interface AccionEstrategica {
  id: number;
  description: string;
  objetivoEstrategico: ObjetivoEstrategico | null;
}

export interface CreateAccionEstrategicaInput {
  description: string;
  objetivoEstrategicoId: number;
}

export interface UpdateAccionEstrategicaInput {
  description?: string;
  objetivoEstrategicoId?: number;
}

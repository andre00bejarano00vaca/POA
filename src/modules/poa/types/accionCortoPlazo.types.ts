// src/modules/poa/types/accionCortoPlazo.types.ts

import type { Programa } from "./programa.types";

export interface AccionCortoPlazo {
  id: number;
  description: string;
  programa: Programa | null;
}

export interface CreateAccionCortoPlazoInput {
  description: string;
  programaId: number;
}

export interface UpdateAccionCortoPlazoInput {
  description?: string;
  programaId?: number;
}

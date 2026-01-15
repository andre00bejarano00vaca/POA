import type { PEI } from "./pei.types";

export interface AreaEstrategica {
  id: number;
  description: string;
  pei: PEI;
}

export interface CreateAreaEstrategicaInput {
  description: string;
  peiId: number;

  // Solo UI (para mostrar en edición)
  peiLabel?: string;
}

export interface UpdateAreaEstrategicaInput {
  description?: string;
  peiId?: number;

  // Solo UI (para mostrar en edición)
  peiLabel?: string;
}

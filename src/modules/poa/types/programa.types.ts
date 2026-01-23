// src/modules/poa/types/programa.types.ts

import type { Poa } from "./poa.types";

export interface Programa {
  id: number;
  description: string;
  poa: Poa | null;
}

export interface CreateProgramaInput {
  description: string;
  poaId: number;
}

export interface UpdateProgramaInput {
  description?: string;
  poaId?: number;
}

// src/modules/presupuesto/types/entidadTransferencia.types.ts

import type { Rubro } from "./rubro.types";

export interface EntidadTransferencia {
  id: number;
  codigo: number;
  description: string;
  rubro: Rubro | null;
}

export interface CreateEntidadTransferenciaInput {
  codigo: number;
  description: string;
  rubroIdRubroId: number;
}

export interface UpdateEntidadTransferenciaInput {
  codigo?: number;
  description?: string;
  rubroIdRubroId?: number;
}

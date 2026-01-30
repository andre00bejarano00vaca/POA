// src/modules/poa/types/poa.types.ts

import type { UnidadEjecutora } from "@/modules/organization/types/unidadEjecutora.types";

export interface Poa {
  id: number;
  anio: number;
  fechaRegistro: string;
  unidadEjecutora: UnidadEjecutora | null;
}

export interface CreatePoaInput {
  anio: number;
  fechaRegistro: string;
  unidadEjecutoraId: number;
}

export interface UpdatePoaInput {
  anio?: number;
  fechaRegistro?: string;
  unidadEjecutoraId?: number;
}

export type POA = Poa;

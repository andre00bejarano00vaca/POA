// src/modules/unidad/types/unidadEjecutora.types.ts

import type { DireccionAdministrativa } from "@/modules/organization/types/direccionAdministrativa.types";

export interface UnidadEjecutora {
  id: number;
  description: string;
  techoPres: number;
  direccionAdministrativa: DireccionAdministrativa | null;
}

export interface CreateUnidadEjecutoraInput {
  description: string;
  direccionAdministrativaId: number;
  techoPres: number;
}

export interface UpdateUnidadEjecutoraInput {
  description?: string;
  techoPres?: number;
}

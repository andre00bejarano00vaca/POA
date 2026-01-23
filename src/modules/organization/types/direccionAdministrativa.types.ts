// src/modules/direccion/types/direccionAdministrativa.types.ts

import type { Entidad } from "@/modules/organization/types/entidad.types";

export interface DireccionAdministrativa {
  id: number;
  description: string;
  entidad: Entidad | null;
}

export interface CreateDireccionAdministrativaInput {
  description: string;
  entidadId: number;
}

export interface UpdateDireccionAdministrativaInput {
  description?: string;
  entidadId?: number;
}

// src/types/presupuesto/organismo.types.ts

import type { Fuente } from "../../presupuesto/types/fuente.types";

export interface Organismo {
  id: number;
  codigo: number;
  description: string;
  fuentes: Fuente[];
}

export interface CreateOrganismoInput {
  codigo: number;
  description: string;
}

export interface UpdateOrganismoInput {
  codigo?: number;
  description?: string;
}

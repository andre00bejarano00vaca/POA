// src/types/presupuesto/rubro.types.ts

export interface Rubro {
  id: number;
  description: string;
  importeDouble: number;
}

export interface CreateRubroInput {
  description: string;
  importeDouble: number;
}

export interface UpdateRubroInput {
  description?: string;
  importeDouble?: number;
}

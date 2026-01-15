// src/types/fuente/fuente.types.ts

export interface Fuente {
  id: number;
  codigo: number;
  description: string;
}

export interface CreateFuenteInput {
  codigo: number;
  description: string;
}

export interface UpdateFuenteInput {
  codigo?: number;
  description?: string;
}
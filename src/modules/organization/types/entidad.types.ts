// src/modules/entidad/types/entidad.types.ts

export interface Entidad {
  id: number;
  codigo: number;
  sigla: string;
  // estado: number;
  // activo: number;
}

export interface CreateEntidadInput {
  codigo: number;
  sigla: string;
  // activo: number;
  // estado: number;
}

export interface UpdateEntidadInput {
  codigo?: number;
  sigla?: string;
  // activo?: number;
  // estado?: number;
}

// src/types/presupuesto/recaudacion.types.ts
import type { Rubro } from "@/modules/presupuesto/types/rubro.types";

export interface Recaudacion {
  id: number;
  description: string;
  codOec: string;
  nBienes: number;
  costoUServicio: number;
  totalDouble: number;
  idRubro: Rubro;
}

export interface CreateRecaudacionInput {
  description: string;
  codOec: string;
  nBienes: number;
  costoUServicio: number;
  totalDouble: number;
  idRubroId: number;
}

export interface UpdateRecaudacionInput {
  description?: string;
  codOec?: string;
  nBienes?: number;
  costoUServicio?: number;
  totalDouble?: number;
  idRubroId?: number;
}

// src/modules/pei/types/objetivoEstrategico.types.ts

import type { PoliticaDesarrollo } from "./politicaDesarrollo.types";

export interface ObjetivoEstrategico {
  id: number;
  idOe: number;
  description: string;
  politicaDesarrollo: PoliticaDesarrollo | null;
}

export interface CreateObjetivoEstrategicoInput {
  idOe: number;
  description: string;
  politicaDesarrolloId: number;
}

export interface UpdateObjetivoEstrategicoInput {
  idOe?: number;
  description?: string;
  politicaDesarrolloId?: number;
}

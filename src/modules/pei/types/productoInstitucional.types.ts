// src/modules/pei/types/productoInstitucional.types.ts

import type { AccionEstrategica } from "./accionEstrategica.types";

export interface ProductoInstitucional {
  id: number;
  idPi: number;
  description: string;
  accionEstrategica: AccionEstrategica | null;
}

export interface CreateProductoInstitucionalInput {
  idPi: number;
  description: string;
  accionEstrategicaId: number;
}

export interface UpdateProductoInstitucionalInput {
  idPi?: number;
  description?: string;
  accionEstrategicaId?: number;
}

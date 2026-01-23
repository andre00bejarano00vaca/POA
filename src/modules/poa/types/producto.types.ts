// src/modules/poa/types/producto.types.ts

import type { AccionCortoPlazo } from "./accionCortoPlazo.types";

export interface Producto {
  id: number;
  description: string;
  accionCortoPlazo: AccionCortoPlazo | null;
}

export interface CreateProductoInput {
  description: string;
  accionCortoPlazoId: number;
}

export interface UpdateProductoInput {
  description?: string;
  accionCortoPlazoId?: number;
}

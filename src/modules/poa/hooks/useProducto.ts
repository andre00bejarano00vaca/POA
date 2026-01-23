// src/modules/poa/hooks/useProducto.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { ProductoService } from "@/modules/poa/services/producto.service";
import type {
  Producto,
  CreateProductoInput,
  UpdateProductoInput,
} from "@/modules/poa/types/producto.types";

export const useProducto = () => {
  return useCrud<Producto, CreateProductoInput, UpdateProductoInput>({
    listAll: ProductoService.listAll,
    getById: ProductoService.getById,
    create: ProductoService.create,
    update: ProductoService.update,
    delete: ProductoService.delete,
  });
};

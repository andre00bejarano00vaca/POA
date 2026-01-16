// src/modules/pei/hooks/useProductoInstitucional.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { ProductoInstitucionalService } from "../services/productoInstitucional.service";
import type {
  ProductoInstitucional,
  CreateProductoInstitucionalInput,
  UpdateProductoInstitucionalInput,
} from "../types/productoInstitucional.types";

export const useProductoInstitucional = () => {
  return useCrud<
    ProductoInstitucional,
    CreateProductoInstitucionalInput,
    UpdateProductoInstitucionalInput
  >({
    listAll: ProductoInstitucionalService.listAll,
    getById: ProductoInstitucionalService.getById,
    create: ProductoInstitucionalService.create,
    update: ProductoInstitucionalService.update,
    delete: ProductoInstitucionalService.delete,
  });
};

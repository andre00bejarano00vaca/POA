// src/modules/seguimiento/hooks/useSeguimientoPei.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { SeguimientoPeiService } from "../services/seguimientoPei.service";
import type {
  SeguimientoPei,
  CreateSeguimientoPeiInput,
  UpdateSeguimientoPeiInput,
} from "../types/seguimientoPei.types";

export const useSeguimientoPei = () => {
  return useCrud<
    SeguimientoPei,
    CreateSeguimientoPeiInput,
    UpdateSeguimientoPeiInput
  >({
    listAll: SeguimientoPeiService.listAll,
    getById: SeguimientoPeiService.getById,
    create: SeguimientoPeiService.create,
    update: SeguimientoPeiService.update,
    delete: SeguimientoPeiService.delete,
  });
};

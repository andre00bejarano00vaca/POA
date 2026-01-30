// src/modules/seguimiento/hooks/useSeguimientoPoa.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { SeguimientoPoaService } from "../services/seguimientoPoa.service";
import type {
  SeguimientoPoa,
  CreateSeguimientoPoaInput,
  UpdateSeguimientoPoaInput,
} from "../types/seguimientoPoa.types";

export const useSeguimientoPoa = () => {
  return useCrud<
    SeguimientoPoa,
    CreateSeguimientoPoaInput,
    UpdateSeguimientoPoaInput
  >({
    listAll: SeguimientoPoaService.listAll,
    getById: SeguimientoPoaService.getById,
    create: SeguimientoPoaService.create,
    update: SeguimientoPoaService.update,
    delete: SeguimientoPoaService.delete,
  });
};

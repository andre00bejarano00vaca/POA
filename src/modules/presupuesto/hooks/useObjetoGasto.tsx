// src/modules/presupuesto/hooks/useObjetoGasto.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { ObjetoGastoService } from "@/modules/presupuesto/services/objetoGasto.service";
import type {
  ObjetoGasto,
  CreateObjetoGastoInput,
  UpdateObjetoGastoInput,
} from "@/modules/presupuesto/types/objetoGasto.types";

export const useObjetoGasto = () => {
  return useCrud<ObjetoGasto, CreateObjetoGastoInput, UpdateObjetoGastoInput>({
    listAll: ObjetoGastoService.listAll,
    getById: ObjetoGastoService.getById,
    create: ObjetoGastoService.create,
    update: ObjetoGastoService.update,
    delete: ObjetoGastoService.delete,
  });
};

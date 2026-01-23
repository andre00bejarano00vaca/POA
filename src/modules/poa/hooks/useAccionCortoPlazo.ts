// src/modules/poa/hooks/useAccionCortoPlazo.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { AccionCortoPlazoService } from "@/modules/poa/services/accionCortoPlazo.service";
import type {
  AccionCortoPlazo,
  CreateAccionCortoPlazoInput,
  UpdateAccionCortoPlazoInput,
} from "@/modules/poa/types/accionCortoPlazo.types";

export const useAccionCortoPlazo = () => {
  return useCrud<
    AccionCortoPlazo,
    CreateAccionCortoPlazoInput,
    UpdateAccionCortoPlazoInput
  >({
    listAll: AccionCortoPlazoService.listAll,
    getById: AccionCortoPlazoService.getById,
    create: AccionCortoPlazoService.create,
    update: AccionCortoPlazoService.update,
    delete: AccionCortoPlazoService.delete,
  });
};

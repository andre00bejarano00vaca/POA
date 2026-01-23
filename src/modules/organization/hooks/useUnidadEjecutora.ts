// src/modules/unidad/hooks/useUnidadEjecutora.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { UnidadEjecutoraService } from "@/modules/organization/services/unidadEjecutora.service";
import type {
  UnidadEjecutora,
  CreateUnidadEjecutoraInput,
  UpdateUnidadEjecutoraInput,
} from "@/modules/organization/types/unidadEjecutora.types";

export const useUnidadEjecutora = () => {
  return useCrud<
    UnidadEjecutora,
    CreateUnidadEjecutoraInput,
    UpdateUnidadEjecutoraInput
  >({
    listAll: UnidadEjecutoraService.listAll,
    getById: UnidadEjecutoraService.getById,
    create: UnidadEjecutoraService.create,
    update: UnidadEjecutoraService.update,
    delete: UnidadEjecutoraService.delete,
  });
};

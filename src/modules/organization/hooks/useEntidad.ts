// src/modules/entidad/hooks/useEntidad.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { EntidadService } from "@/modules/organization/services/entidad.service";
import type {
  Entidad,
  CreateEntidadInput,
  UpdateEntidadInput,
} from "@/modules/organization/types/entidad.types";

export const useEntidad = () => {
  return useCrud<Entidad, CreateEntidadInput, UpdateEntidadInput>({
    listAll: EntidadService.listAll,
    getById: EntidadService.getById,
    create: EntidadService.create,
    update: EntidadService.update,
    delete: EntidadService.delete,
  });
};

// src/modules/poa/hooks/useActividad.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { ActividadService } from "@/modules/poa/services/actividad.service";
import type {
  Actividad,
  CreateActividadInput,
  UpdateActividadInput,
} from "@/modules/poa/types/actividad.types";

export const useActividad = () => {
  return useCrud<Actividad, CreateActividadInput, UpdateActividadInput>({
    listAll: ActividadService.listAll,
    getById: ActividadService.getById,
    create: ActividadService.create,
    update: ActividadService.update,
    delete: ActividadService.delete,
  });
};

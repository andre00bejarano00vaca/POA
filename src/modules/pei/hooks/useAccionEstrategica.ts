// src/modules/pei/hooks/useAccionEstrategica.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { AccionEstrategicaService } from "../services/accionEstrategica.service";
import type {
  AccionEstrategica,
  CreateAccionEstrategicaInput,
  UpdateAccionEstrategicaInput,
} from "../types/accionEstrategica.types";

export const useAccionEstrategica = () => {
  return useCrud<
    AccionEstrategica,
    CreateAccionEstrategicaInput,
    UpdateAccionEstrategicaInput
  >({
    listAll: AccionEstrategicaService.listAll,
    getById: AccionEstrategicaService.getById,
    create: AccionEstrategicaService.create,
    update: AccionEstrategicaService.update,
    delete: AccionEstrategicaService.delete,
  });
};

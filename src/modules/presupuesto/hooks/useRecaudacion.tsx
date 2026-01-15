// src/hooks/presupuesto/useRecaudacion.tsx
"use client";

import { useCrud } from "../../../shared/hooks/useCrud";
import { RecaudacionService } from "@/modules/presupuesto/services/recaudacion.service";
import type {
  Recaudacion,
  CreateRecaudacionInput,
  UpdateRecaudacionInput,
} from "@/modules/presupuesto/types/recaudacion.types";

export const useRecaudacion = () => {
  return useCrud<Recaudacion, CreateRecaudacionInput, UpdateRecaudacionInput>({
    listAll: RecaudacionService.listAll,
    getById: RecaudacionService.getById,
    create: RecaudacionService.create,
    update: RecaudacionService.update,
    delete: RecaudacionService.delete,
  });
};

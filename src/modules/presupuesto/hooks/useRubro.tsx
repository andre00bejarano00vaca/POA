// src/hooks/presupuesto/useRubro.tsx
"use client";

import { useCrud } from "../../../shared/hooks/useCrud";
import { RubroService } from "@/modules/presupuesto/services/rubro.service";
import type {
  Rubro,
  CreateRubroInput,
  UpdateRubroInput,
} from "@/modules/presupuesto/types/rubro.types";

export const useRubro = () => {
  return useCrud<Rubro, CreateRubroInput, UpdateRubroInput>({
    listAll: RubroService.listAll,
    getById: RubroService.getById,
    create: RubroService.create,
    update: RubroService.update,
    delete: RubroService.delete,
  });
};

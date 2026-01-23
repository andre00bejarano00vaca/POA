// src/modules/poa/hooks/usePoa.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { PoaService } from "@/modules/poa/services/poa.service";
import type {
  Poa,
  CreatePoaInput,
  UpdatePoaInput,
} from "@/modules/poa/types/poa.types";

export const usePoa = () => {
  return useCrud<Poa, CreatePoaInput, UpdatePoaInput>({
    listAll: PoaService.listAll,
    getById: PoaService.getById,
    create: PoaService.create,
    update: PoaService.update,
    delete: PoaService.delete,
  });
};

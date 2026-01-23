// src/modules/poa/hooks/useIndicadorPoa.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { IndicadorPoaService } from "@/modules/poa/services/indicadorPoa.service";
import type {
  IndicadorPoa,
  CreateIndicadorPoaInput,
  UpdateIndicadorPoaInput,
} from "@/modules/poa/types/indicadorPoa.types";

export const useIndicadorPoa = () => {
  return useCrud<
    IndicadorPoa,
    CreateIndicadorPoaInput,
    UpdateIndicadorPoaInput
  >({
    listAll: IndicadorPoaService.listAll,
    getById: IndicadorPoaService.getById,
    create: IndicadorPoaService.create,
    update: IndicadorPoaService.update,
    delete: IndicadorPoaService.delete,
  });
};

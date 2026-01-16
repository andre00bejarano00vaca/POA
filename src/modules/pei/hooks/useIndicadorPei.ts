// src/modules/pei/hooks/useIndicadorPei.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { IndicadorPeiService } from "../services/indicadorPei.service";
import type {
  IndicadorPei,
  CreateIndicadorPeiInput,
  UpdateIndicadorPeiInput,
} from "../types/indicadorPei.types";

export const useIndicadorPei = () => {
  return useCrud<
    IndicadorPei,
    CreateIndicadorPeiInput,
    UpdateIndicadorPeiInput
  >({
    listAll: IndicadorPeiService.listAll,
    getById: IndicadorPeiService.getById,
    create: IndicadorPeiService.create,
    update: IndicadorPeiService.update,
    delete: IndicadorPeiService.delete,
  });
};

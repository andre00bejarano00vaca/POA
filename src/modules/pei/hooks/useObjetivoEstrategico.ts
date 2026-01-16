// src/modules/pei/hooks/useObjetivoEstrategico.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { ObjetivoEstrategicoService } from "../services/objetivoEstrategico.service";
import type {
  ObjetivoEstrategico,
  CreateObjetivoEstrategicoInput,
  UpdateObjetivoEstrategicoInput,
} from "../types/objetivoEstrategico.types";

export const useObjetivoEstrategico = () => {
  return useCrud<
    ObjetivoEstrategico,
    CreateObjetivoEstrategicoInput,
    UpdateObjetivoEstrategicoInput
  >({
    listAll: ObjetivoEstrategicoService.listAll,
    getById: ObjetivoEstrategicoService.getById,
    create: ObjetivoEstrategicoService.create,
    update: ObjetivoEstrategicoService.update,
    delete: ObjetivoEstrategicoService.delete,
  });
};

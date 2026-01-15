// src/modules/pei/hooks/usePoliticaDesarrollo.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { PoliticaDesarrolloService } from "@/modules/pei/services/politicaDesarrollo.service";
import type {
  PoliticaDesarrollo,
  CreatePoliticaDesarrolloInput,
  UpdatePoliticaDesarrolloInput,
} from "@/modules/pei/types/politicaDesarrollo.types";

export const usePoliticaDesarrollo = () => {
  return useCrud<
    PoliticaDesarrollo,
    CreatePoliticaDesarrolloInput,
    UpdatePoliticaDesarrolloInput
  >({
    listAll: PoliticaDesarrolloService.listAll,
    getById: PoliticaDesarrolloService.getById,
    create: PoliticaDesarrolloService.create,
    update: PoliticaDesarrolloService.update,
    delete: PoliticaDesarrolloService.delete,
  });
};

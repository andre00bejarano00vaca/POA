// src/modules/poa/hooks/usePrograma.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { ProgramaService } from "@/modules/poa/services/programa.service";
import type {
  Programa,
  CreateProgramaInput,
  UpdateProgramaInput,
} from "@/modules/poa/types/programa.types";

export const usePrograma = () => {
  return useCrud<Programa, CreateProgramaInput, UpdateProgramaInput>({
    listAll: ProgramaService.listAll,
    getById: ProgramaService.getById,
    create: ProgramaService.create,
    update: ProgramaService.update,
    delete: ProgramaService.delete,
  });
};

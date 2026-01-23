// src/modules/programacion/hooks/useProgramacionMetaAnual.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { ProgramacionMetaAnualService } from "@/modules/pei/services/programacionMetaAnual.service";
import type {
  ProgramacionMetaAnual,
  CreateProgramacionMetaAnualInput,
  UpdateProgramacionMetaAnualInput,
} from "@/modules/pei/types/programacionMetaAnual.types";

export const useProgramacionMetaAnual = () => {
  return useCrud<
    ProgramacionMetaAnual,
    CreateProgramacionMetaAnualInput,
    UpdateProgramacionMetaAnualInput
  >({
    listAll: ProgramacionMetaAnualService.listAll,
    getById: ProgramacionMetaAnualService.getById,
    create: ProgramacionMetaAnualService.create,
    update: ProgramacionMetaAnualService.update,
    delete: ProgramacionMetaAnualService.delete,
  });
};

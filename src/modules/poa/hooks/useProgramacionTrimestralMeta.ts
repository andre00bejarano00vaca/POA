// src/modules/poa/hooks/useProgramacionTrimestralMeta.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { ProgramacionTrimestralMetaService } from "@/modules/poa/services/programacionTrimestralMeta.service";
import type {
  ProgramacionTrimestralMeta,
  CreateProgramacionTrimestralMetaInput,
  UpdateProgramacionTrimestralMetaInput,
} from "@/modules/poa/types/programacionTrimestralMeta.types";

export const useProgramacionTrimestralMeta = () => {
  return useCrud<
    ProgramacionTrimestralMeta,
    CreateProgramacionTrimestralMetaInput,
    UpdateProgramacionTrimestralMetaInput
  >({
    listAll: ProgramacionTrimestralMetaService.listAll,
    getById: ProgramacionTrimestralMetaService.getById,
    create: ProgramacionTrimestralMetaService.create,
    update: ProgramacionTrimestralMetaService.update,
    delete: ProgramacionTrimestralMetaService.delete,
  });
};

// src/modules/direccion/hooks/useDireccionAdministrativa.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { DireccionAdministrativaService } from "@/modules/organization/services/direccionAdministrativa.service";
import type {
  DireccionAdministrativa,
  CreateDireccionAdministrativaInput,
  UpdateDireccionAdministrativaInput,
} from "@/modules/organization/types/direccionAdministrativa.types";

export const useDireccionAdministrativa = () => {
  return useCrud<
    DireccionAdministrativa,
    CreateDireccionAdministrativaInput,
    UpdateDireccionAdministrativaInput
  >({
    listAll: DireccionAdministrativaService.listAll,
    getById: DireccionAdministrativaService.getById,
    create: DireccionAdministrativaService.create,
    update: DireccionAdministrativaService.update,
    delete: DireccionAdministrativaService.delete,
  });
};

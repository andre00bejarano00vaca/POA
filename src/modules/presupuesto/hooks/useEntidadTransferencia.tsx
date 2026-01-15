"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { EntidadTransferenciaService } from "@/modules/presupuesto/services/entidadTransferencia.service";
import type {
  EntidadTransferencia,
  CreateEntidadTransferenciaInput,
  UpdateEntidadTransferenciaInput,
} from "@/modules/presupuesto/types/entidadTransferencia.types";

export const useEntidadTransferencia = () => {
  return useCrud<
    EntidadTransferencia,
    CreateEntidadTransferenciaInput,
    UpdateEntidadTransferenciaInput
  >({
    listAll: EntidadTransferenciaService.listAll,
    getById: EntidadTransferenciaService.getById,
    create: EntidadTransferenciaService.create,
    update: EntidadTransferenciaService.update,
    delete: EntidadTransferenciaService.delete,
  });
};

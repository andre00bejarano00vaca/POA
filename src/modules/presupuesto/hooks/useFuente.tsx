// src/modules/presupuesto/hooks/useFuente.ts

import { useCrud } from "@/shared/hooks/useCrud";
import { FuenteService } from "@/modules/presupuesto/services/fuente.service";
import type {
  Fuente,
  CreateFuenteInput,
  UpdateFuenteInput,
} from "@/modules/presupuesto/types/fuente.types";

/**
 * Hook personalizado para gestionar Fuentes de Financiamiento
 */
export const useFuente = () => {
  return useCrud<Fuente, CreateFuenteInput, UpdateFuenteInput>({
    listAll: FuenteService.listAll,
    create: FuenteService.create,
    update: FuenteService.update,
    delete: FuenteService.delete,
    getById: FuenteService.getById,
  });
};

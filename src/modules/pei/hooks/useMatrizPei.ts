// src/modules/pei/hooks/useMatrizPei.ts
"use client";

import { useCrud } from "@/shared/hooks/useCrud";
import { MatrizPeiService } from "@/modules/pei/services/matrizPei.service";
import type {
  MatrizPei,
  CreateMatrizPeiInput,
  UpdateMatrizPeiInput,
} from "@/modules/pei/types/matrizPei.types";

export const useMatrizPei = () => {
  return useCrud<MatrizPei, CreateMatrizPeiInput, UpdateMatrizPeiInput>({
    listAll: MatrizPeiService.listAll,
    getById: MatrizPeiService.getById,
    create: MatrizPeiService.create,
    update: MatrizPeiService.update,
    delete: MatrizPeiService.delete,
  });
};

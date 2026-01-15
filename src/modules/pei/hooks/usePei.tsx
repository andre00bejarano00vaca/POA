// src/modules/pei/hooks/usePei.ts

import { useCrud } from "@/shared/hooks/useCrud";
import { PeiService } from "@/modules/pei/services/pei.service";
import type {
  PEI,
  CreatePEIInput,
  UpdatePEIInput,
} from "@/modules/pei/types/pei.types";

/**
 * Detecta el tipo de búsqueda basándose en el query string
 */
const detectSearchType = (query: string): "year" | "budget" | "text" => {
  const trimmed = query.trim();

  // Año (exactamente 4 dígitos)
  if (/^\d{4}$/.test(trimmed)) {
    return "year";
  }

  // Presupuesto (solo números)
  if (/^\d+$/.test(trimmed)) {
    const amount = parseInt(trimmed);
    // Si es muy grande, tratarlo como texto
    if (amount > 2147483647) {
      return "text";
    }
    return "budget";
  }

  // Texto general
  return "text";
};

/**
 * Hook personalizado para gestionar PEIs
 */
export const usePei = () => {
  const baseCrud = useCrud<PEI, CreatePEIInput, UpdatePEIInput>({
    listAll: (limit, offset) => PeiService.listAll({ limit, offset }),
    create: PeiService.create,
    update: PeiService.update,
    delete: PeiService.delete,
    getById: PeiService.getById,
  });

  /**
   * Busca PEIs con detección automática del tipo de búsqueda
   */
  const search = async (
    query: string,
    limit?: number,
    offset?: number
  ): Promise<{ results: PEI[]; count: number }> => {
    // Sin búsqueda, listar todos
    if (!query || !query.trim()) {
      return PeiService.listAll({ limit, offset });
    }

    const searchTerm = query.trim();
    const searchType = detectSearchType(searchTerm);

    switch (searchType) {
      case "year":
        return PeiService.searchByYear(parseInt(searchTerm), {
          limit,
          offset,
        });

      case "budget":
        return PeiService.searchByBudget(parseInt(searchTerm), {
          limit,
          offset,
        });

      case "text":
        return PeiService.searchByText(searchTerm, { limit, offset });

      default:
        return PeiService.listAll({ limit, offset });
    }
  };

  return {
    ...baseCrud,
    search,
    searchByYear: PeiService.searchByYear,
    searchByBudget: PeiService.searchByBudget,
    searchByText: PeiService.searchByText,
  };
};

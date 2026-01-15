// src/modules/pei/hooks/useArea.ts

import { useCrud } from "@/shared/hooks/useCrud";
import { AreaService } from "@/modules/pei/services/areaEstrategica.service";
import type {
  AreaEstrategica,
  CreateAreaEstrategicaInput,
  UpdateAreaEstrategicaInput,
} from "@/modules/pei/types/area.types";

/**
 * Detecta el tipo de búsqueda basándose en el query string
 */
const detectSearchType = (query: string): "pei" | "text" => {
  const trimmed = query.trim();

  // ID de PEI (solo números)
  if (/^\d+$/.test(trimmed)) {
    return "pei";
  }

  // Texto general
  return "text";
};

/**
 * Hook personalizado para gestionar Áreas Estratégicas
 */
export const useArea = () => {
  const baseCrud = useCrud<
    AreaEstrategica,
    CreateAreaEstrategicaInput,
    UpdateAreaEstrategicaInput
  >({
    listAll: (limit, offset) => AreaService.listAll({ limit, offset }),
    create: AreaService.create,
    update: AreaService.update,
    delete: AreaService.delete,
    getById: AreaService.getById,
  });

  /**
   * Busca áreas con detección automática del tipo de búsqueda
   */
  const search = async (
    query: string,
    limit?: number,
    offset?: number
  ): Promise<{ results: AreaEstrategica[]; count: number }> => {
    // Sin búsqueda, listar todos
    if (!query || !query.trim()) {
      return AreaService.listAll({ limit, offset });
    }

    const searchTerm = query.trim();
    const searchType = detectSearchType(searchTerm);

    switch (searchType) {
      case "pei":
        return AreaService.searchByPei(parseInt(searchTerm), {
          limit,
          offset,
        });

      case "text":
        return AreaService.searchByText(searchTerm, { limit, offset });

      default:
        return AreaService.listAll({ limit, offset });
    }
  };

  return {
    ...baseCrud,
    search,
    // Exponer métodos específicos
    searchByPei: AreaService.searchByPei,
    searchByText: AreaService.searchByText,
    getOrdenadas: AreaService.getOrdenadas,
    count: AreaService.count,
    exists: AreaService.exists,
  };
};

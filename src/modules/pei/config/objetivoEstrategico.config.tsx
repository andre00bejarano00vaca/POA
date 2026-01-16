// src/modules/pei/config/objetivoEstrategico.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { ObjetivoEstrategico } from "../types/objetivoEstrategico.types";
import { PoliticaDesarrolloService } from "../services/politicaDesarrollo.service";

export const objetivoEstrategicoColumns: ColumnConfig<ObjetivoEstrategico>[] = [
  // { key: "id", header: "ID", className: "text-center w-20" },
  { key: "idOe", header: "Codigo", className: "text-center w-24" },
  { key: "description", header: "Descripción", className: "text-left" },
  {
    key: "politicaDesarrollo",
    header: "Política de Desarrollo",
    className: "text-left w-64",
    render: (item) => item.politicaDesarrollo?.description ?? "Sin política",
  },
];

export const objetivoEstrategicoFormFields: FieldConfig<any>[] = [
  {
    key: "idOe",
    label: "ID OE",
    type: "number",
    required: true,
    min: 0,
    step: 1,
    placeholder: "Ingrese el ID OE",
  },
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
    size: "full",
    placeholder: "Describa el objetivo estratégico...",
  },
  {
    key: "politicaDesarrolloId",
    label: "Política de Desarrollo",
    type: "remote-search-select",
    required: true,
    size: "full",
    placeholder: "Buscar política de desarrollo...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return PoliticaDesarrolloService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return PoliticaDesarrolloService.listAll(limit, offset);
    },

    mapToOption: (politica) => ({
      value: politica.id,
      label: politica.description?.trim() || `Política #${politica.id}`,
    }),

    // ✅ FIX: Retorna STRING directamente
    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;

        if (isNaN(numericId) || numericId <= 0) {
          return `Política #${id}`;
        }

        const politica = await PoliticaDesarrolloService.getById(numericId);
        return politica.description?.trim() || `Política #${numericId}`;
      } catch (error) {
        console.error("Error en getByIdFn:", error);
        return `Política #${id}`;
      }
    },
  },
];

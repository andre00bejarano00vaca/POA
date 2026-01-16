// src/modules/pei/config/indicadorPei.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { IndicadorPei } from "../types/indicadorPei.types";
import { ObjetivoEstrategicoService } from "../services/objetivoEstrategico.service";

export const indicadorPeiColumns: ColumnConfig<IndicadorPei>[] = [
  { key: "id", header: "ID", className: "text-center w-20" },
  { key: "description", header: "Descripción", className: "text-left" },
  { key: "formula", header: "Fórmula", className: "text-left w-48" },
  { key: "lineaBase", header: "Línea Base", className: "text-center w-28" },
  { key: "meta", header: "Meta", className: "text-center w-24" },
  { key: "unidadMedida", header: "Unidad", className: "text-center w-32" },
  {
    key: "objetivoEstrategico",
    header: "Objetivo Estratégico",
    className: "text-left w-64",
    render: (item) => item.objetivoEstrategico?.description ?? "Sin objetivo",
  },
];

export const indicadorPeiFormFields: FieldConfig<any>[] = [
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
    size: "full",
    placeholder: "Describa el indicador...",
  },
  {
    key: "formula",
    label: "Fórmula",
    type: "text",
    required: true,
    size: "full",
    placeholder: "Fórmula de cálculo del indicador",
  },
  {
    key: "lineaBase",
    label: "Línea Base",
    type: "number",
    required: true,
    min: 0,
    step: 1,
    placeholder: "Valor inicial",
  },
  {
    key: "meta",
    label: "Meta",
    type: "number",
    required: true,
    min: 0,
    step: 1,
    placeholder: "Valor objetivo",
  },
  {
    key: "unidadMedida",
    label: "Unidad de Medida",
    type: "text",
    required: true,
    placeholder: "ej: %, unidades, personas",
  },
  {
    key: "objetivoEstrategicoId",
    label: "Objetivo Estratégico",
    type: "remote-search-select",
    required: true,
    size: "full",
    placeholder: "Buscar objetivo estratégico...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return ObjetivoEstrategicoService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return ObjetivoEstrategicoService.listAll(limit, offset);
    },

    mapToOption: (objetivo) => ({
      value: objetivo.id,
      label: objetivo.description?.trim() || `Objetivo #${objetivo.id}`,
    }),

    getByIdFn: async (id: number) => {
      const objetivo = await ObjetivoEstrategicoService.getById(id);
      return objetivo.description?.trim() || `Objetivo #${objetivo.id}`;
    },
  },
];

// src/modules/poa/config/programacionTrimestral.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { ProgramacionTrimestral } from "../types/programacionTrimestralMeta.types";
import { IndicadorPoaService } from "../services/indicadorPoa.service";

export const programacionTrimestralColumns: ColumnConfig<ProgramacionTrimestral>[] =
  [
    { key: "id", header: "ID", className: "text-center w-20" },
    {
      key: "trimestre",
      header: "Trimestre",
      className: "text-center w-24",
      render: (item) => `T${item.trimestre}`,
    },
    {
      key: "programado",
      header: "Programado",
      className: "text-center w-32",
      render: (item) =>
        `${item.programado} ${item.indicadorPoa?.unidadMedida || ""}`,
    },
    {
      key: "indicadorPoa",
      header: "Indicador POA",
      className: "text-left",
      render: (item) => item.indicadorPoa?.description || "Sin indicador",
    },
    {
      key: "indicadorPoa",
      header: "Actividad",
      className: "text-left",
      render: (item) =>
        item.indicadorPoa?.actividad?.description || "Sin actividad",
    },
  ];

export const programacionTrimestralFormFields: FieldConfig<any>[] = [
  {
    key: "trimestre",
    label: "Trimestre",
    type: "select",
    required: true,
    placeholder: "Seleccione el trimestre",
    options: [
      { value: 1, label: "Trimestre 1" },
      { value: 2, label: "Trimestre 2" },
      { value: 3, label: "Trimestre 3" },
      { value: 4, label: "Trimestre 4" },
    ],
  },
  {
    key: "programado",
    label: "Valor Programado",
    type: "number",
    required: true,
    min: 0,
    step: 0.01,
    placeholder: "Valor a alcanzar en el trimestre",
  },
  {
    key: "indicadorPoaId",
    label: "Indicador POA",
    type: "remote-search-select",
    required: true,
    size: "full",
    placeholder: "Buscar indicador POA...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return IndicadorPoaService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return IndicadorPoaService.listAll(limit, offset);
    },

    mapToOption: (indicador) => ({
      value: indicador.id,
      label: indicador.description?.trim() || `Indicador #${indicador.id}`,
    }),
  },
];

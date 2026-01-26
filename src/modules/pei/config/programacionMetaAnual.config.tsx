// src/modules/pei/config/programacionMetaAnual.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { ProgramacionMetaAnual } from "../types/programacionMetaAnual.types";
import { IndicadorPeiService } from "../services/indicadorPei.service";

export const programacionMetaAnualColumns: ColumnConfig<ProgramacionMetaAnual>[] =
  [
    { key: "id", header: "ID", className: "text-center w-20" },
    { key: "anio", header: "Año", className: "text-center w-24" },
    {
      key: "programado",
      header: "Programado",
      className: "text-center w-32",
      render: (item) =>
        `${item.programado} ${item.idIndicadorPeiImp?.unidadMedida || ""}`,
    },
    {
      key: "idIndicadorPeiImp",
      header: "Indicador PEI",
      className: "text-left",
      render: (item) => item.idIndicadorPeiImp?.description || "Sin indicador",
    },
    {
      key: "peiIdPei",
      header: "Período PEI",
      className: "text-center w-32",
      render: (item) =>
        item.peiIdPei
          ? `${item.peiIdPei.anioIni} - ${item.peiIdPei.anioFin}`
          : "Sin PEI",
    },
  ];

export const programacionMetaAnualFormFields: FieldConfig<any>[] = [
  {
    key: "anio",
    label: "Año",
    type: "number",
    required: true,
    min: 2020,
    max: 2050,
    step: 1,
    placeholder: "2024",
  },
  {
    key: "programado",
    label: "Valor Programado",
    type: "number",
    required: true,
    min: 0,
    step: 0.01,
    placeholder: "Valor a alcanzar en el año",
  },
  {
    key: "indicadorPeiId",
    label: "Indicador PEI",
    type: "remote-search-select",
    required: true,
    size: "full",
    placeholder: "Buscar indicador PEI...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return IndicadorPeiService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return IndicadorPeiService.listAll(limit, offset);
    },

    mapToOption: (indicador) => ({
      value: indicador.id,
      label: indicador.description?.trim() || `Indicador #${indicador.id}`,
    }),

    // getByIdFn: async (id: number) => {
    //   const indicador = await IndicadorPeiService.getById(id);
    //   return indicador.description?.trim() || `Indicador #${indicador.id}`;
    // },
  },
  {
    key: "peiId",
    label: "PEI (Plan Estratégico)",
    type: "number",
    required: true,
    placeholder: "ID del PEI",
    helpText: "Ingrese el ID del Plan Estratégico Institucional",
  },
];

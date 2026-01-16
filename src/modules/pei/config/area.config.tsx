// src/modules/pei/config/area.config.tsx

import React from "react";
import type { ColumnConfig } from "@/shared/components/common/DynamicTable";
import type { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { AreaEstrategica } from "@/modules/pei/types/area.types";
import { PeiService } from "../services/pei.service";

const extractYear = (dateString: string): string => {
  try {
    if (/^\d{4}$/.test(dateString)) {
      return dateString;
    }

    const yearMatch = dateString.match(/^(\d{4})/);
    if (yearMatch) {
      return yearMatch[1];
    }

    return dateString;
  } catch (error) {
    console.error("Error al extraer año:", error, dateString);
    return dateString;
  }
};

export const areaColumns: ColumnConfig<AreaEstrategica>[] = [
  {
    key: "id",
    header: "ID",
    className: "text-center font-medium",
  },
  {
    key: "description",
    header: "DESCRIPCIÓN",
    className: "font-medium",
    render: (item) => (
      <span className="block" title={item.description}>
        {item.description}
      </span>
    ),
  },
  {
    key: "pei",
    header: "PEI",
    className: "text-center",
    render: (item) => (
      <div className="flex flex-col items-center">
        <span className="font-medium text-blue-600">#{item.pei.id}</span>
        <span className="text-xs text-gray-500">
          {extractYear(item.pei.anioIni)} - {extractYear(item.pei.anioFin)}
        </span>
      </div>
    ),
  },
];

export const areaFormFields: FieldConfig<any>[] = [
  {
    key: "description",
    label: "Descripción del Área Estratégica",
    type: "textarea",
    required: true,
    size: "full",
    placeholder: "Ingrese la descripción del área estratégica...",
    rows: 4,
  },
  {
    key: "peiId",
    label: "Plan Estratégico Institucional (PEI)",
    type: "remote-search-select",
    required: true,
    placeholder: "Buscar PEI por año o texto...",
    size: "full",

    searchFn: async ({ search, limit, offset }) => {
      const trimmedSearch = search?.trim();

      if (!trimmedSearch) {
        return PeiService.listAll({ limit, offset });
      }

      if (/^\d{4}$/.test(trimmedSearch)) {
        return PeiService.searchByYear(parseInt(trimmedSearch), {
          limit,
          offset,
        });
      }

      return PeiService.searchByText(trimmedSearch, { limit, offset });
    },

    mapToOption: (pei) => ({
      value: pei.id,
      label: `PEI ${extractYear(pei.anioIni)} - ${extractYear(pei.anioFin)}${
        pei.resolucion ? ` | ${pei.resolucion}` : ""
      }${pei.observacion ? ` | ${pei.observacion.substring(0, 30)}...` : ""}`,
    }),

    // ✅ FIX: Retorna STRING directamente
    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;

        if (isNaN(numericId) || numericId <= 0) {
          return `PEI #${id}`;
        }

        const pei = await PeiService.getById(numericId);
        return `PEI ${extractYear(pei.anioIni)} - ${extractYear(pei.anioFin)}`;
      } catch (error) {
        console.error("Error en getByIdFn:", error);
        return `PEI #${id}`;
      }
    },
  },
];

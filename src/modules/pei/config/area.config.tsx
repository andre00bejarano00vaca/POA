// src/modules/pei/config/area.config.tsx

import React from "react";
import type { ColumnConfig } from "@/shared/components/common/DynamicTable";
import type { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { AreaEstrategica } from "@/modules/pei/types/area.types";
import { PeiService } from "@/modules/pei/services/pei.service";

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

    // ✅ SOLUCIÓN: Búsqueda inteligente usando los métodos de PeiService
    searchFn: async ({ search, limit, offset }) => {
      const trimmedSearch = search?.trim();

      // Sin búsqueda, listar todos
      if (!trimmedSearch) {
        return PeiService.listAll({ limit, offset });
      }

      // Si es solo números, buscar por año
      if (/^\d{4}$/.test(trimmedSearch)) {
        return PeiService.searchByYear(parseInt(trimmedSearch), {
          limit,
          offset,
        });
      }

      // Si es texto, buscar en observaciones
      return PeiService.searchByText(trimmedSearch, { limit, offset });
    },

    // ✅ Mapeo a opciones
    mapToOption: (pei) => ({
      value: pei.id,
      label: `PEI ${extractYear(pei.anioIni)} - ${extractYear(pei.anioFin)}${
        pei.resolucion ? ` | ${pei.resolucion}` : ""
      }${pei.observacion ? ` | ${pei.observacion.substring(0, 30)}...` : ""}`,
    }),

    // ✅ Función para cargar el PEI completo en edición
    getByIdFn: (id: number) => PeiService.getById(id),
  },
];

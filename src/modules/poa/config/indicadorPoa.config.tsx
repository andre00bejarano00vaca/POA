// src/modules/poa/config/indicadorPoa.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { IndicadorPoa } from "../types/indicadorPoa.types";
import { ActividadService } from "../services/actividad.service";

export const indicadorPoaColumns: ColumnConfig<IndicadorPoa>[] = [
  {
    key: "description",
    header: "Descripción",
    className: "text-left max-w-md",
    render: (item) => (
      <div className="whitespace-normal break-words">{item.description}</div>
    ),
  },
  {
    key: "formula",
    header: "Fórmula",
    className: "text-left w-40",
    render: (item) => (
      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
        {item.formula}
      </code>
    ),
  },
  {
    key: "lineaBase",
    header: "Línea Base",
    className: "text-center w-24",
  },
  {
    key: "meta",
    header: "Meta",
    className: "text-center w-24",
    render: (item) => (
      <span className="font-semibold text-blue-600">{item.meta}</span>
    ),
  },
  {
    key: "unidadMedida",
    header: "Unidad",
    className: "text-center w-24",
  },
  {
    key: "actividad",
    header: "Actividad",
    className: "text-left max-w-xs",
    render: (item) => (
      <div className="text-sm text-gray-600 truncate">
        {item.actividad?.description ?? "-"}
      </div>
    ),
  },
];

export const indicadorPoaFormFields: FieldConfig<any>[] = [
  {
    key: "description",
    label: "Descripción del Indicador",
    type: "textarea",
    required: true,
    placeholder: "Describa el indicador...",
  },
  {
    key: "formula",
    label: "Fórmula",
    type: "text",
    required: true,
    placeholder: "Ej: (A/B)*100",
  },
  {
    key: "lineaBase",
    label: "Línea Base",
    type: "number",
    required: true,
    min: 0,
    step: 1,
    placeholder: "Ingrese la línea base",
  },
  {
    key: "meta",
    label: "Meta",
    type: "number",
    required: true,
    min: 0,
    step: 1,
    placeholder: "Ingrese la meta",
  },
  {
    key: "unidadMedida",
    label: "Unidad de Medida",
    type: "text",
    required: true,
    placeholder: "Ej: Porcentaje, Número, etc.",
  },
  {
    key: "actividadId",
    label: "Actividad",
    type: "remote-search-select",
    required: true,
    placeholder: "Buscar actividad...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return ActividadService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return ActividadService.listAll(limit, offset);
    },

    mapToOption: (actividad) => ({
      value: actividad.id,
      label: `${actividad.description} - ${actividad.tipo}`,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;

        if (isNaN(numericId) || numericId <= 0) {
          return `Actividad #${id}`;
        }

        const actividad = await ActividadService.getById(numericId);
        return `${actividad.description} - ${actividad.tipo}`;
      } catch (error) {
        console.error("Error en getByIdFn:", error);
        return `Actividad #${id}`;
      }
    },
  },
];

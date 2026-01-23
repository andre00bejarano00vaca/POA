// src/modules/poa/config/accionCortoPlazo.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { AccionCortoPlazo } from "../types/accionCortoPlazo.types";
import { ProgramaService } from "../services/programa.service";

export const accionCortoPlazoColumns: ColumnConfig<AccionCortoPlazo>[] = [
  {
    key: "description",
    header: "Descripción",
    className: "text-left max-w-lg",
    render: (item) => (
      <div className="whitespace-normal break-words">{item.description}</div>
    ),
  },
  {
    key: "programa",
    header: "Programa",
    className: "text-left max-w-md",
    render: (item) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium">
          {item.programa?.description ?? "Sin programa"}
        </span>
        {item.programa?.poa && (
          <span className="text-xs text-gray-500">
            POA {item.programa.poa.anio}
          </span>
        )}
      </div>
    ),
  },
  {
    key: "programa",
    header: "Unidad Ejecutora",
    className: "text-left max-w-sm",
    render: (item) => (
      <div className="text-sm text-gray-600">
        {item.programa?.poa?.unidadEjecutora?.description ?? "-"}
      </div>
    ),
  },
];

export const accionCortoPlazoFormFields: FieldConfig<any>[] = [
  {
    key: "description",
    label: "Descripción de la Acción",
    type: "textarea",
    required: true,
    placeholder: "Describa la acción de corto plazo...",
  },
  {
    key: "programaId",
    label: "Programa",
    type: "remote-search-select",
    required: true,
    placeholder: "Buscar programa...",

    searchFn: async ({ search, limit, offset }) => {
      return ProgramaService.listAll(limit, offset, search);
    },

    mapToOption: (programa) => ({
      value: programa.id,
      label: `${programa.description} - POA ${programa.poa?.anio || ""}`,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;

        if (isNaN(numericId) || numericId <= 0) {
          return `Programa #${id}`;
        }

        const programa = await ProgramaService.getById(numericId);
        return `${programa.description} - POA ${programa.poa?.anio || ""}`;
      } catch (error) {
        console.error("Error en getByIdFn:", error);
        return `Programa #${id}`;
      }
    },
  },
];

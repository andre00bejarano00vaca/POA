// src/modules/poa/config/producto.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { Producto } from "../types/producto.types";
import { AccionCortoPlazoService } from "../services/accionCortoPlazo.service";

export const productoColumns: ColumnConfig<Producto>[] = [
  {
    key: "description",
    header: "Descripción del Producto",
    className: "text-left max-w-lg",
    render: (item) => (
      <div className="whitespace-normal break-words">{item.description}</div>
    ),
  },
  {
    key: "accionCortoPlazo",
    header: "Acción Corto Plazo",
    className: "text-left max-w-md",
    render: (item) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium">
          {item.accionCortoPlazo?.description ?? "Sin acción"}
        </span>
        {item.accionCortoPlazo?.programa && (
          <span className="text-xs text-gray-500">
            Programa: {item.accionCortoPlazo.programa.description}
          </span>
        )}
      </div>
    ),
  },
  {
    key: "accionCortoPlazo",
    header: "POA",
    className: "text-center w-24",
    render: (item) => (
      <span className="font-semibold">
        {item.accionCortoPlazo?.programa?.poa?.anio ?? "-"}
      </span>
    ),
  },
];

export const productoFormFields: FieldConfig<any>[] = [
  {
    key: "description",
    label: "Descripción del Producto",
    type: "textarea",
    required: true,
    placeholder: "Describa el producto...",
  },
  {
    key: "accionCortoPlazoId",
    label: "Acción Corto Plazo",
    type: "remote-search-select",
    required: true,
    placeholder: "Buscar acción corto plazo...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return AccionCortoPlazoService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return AccionCortoPlazoService.listAll(limit, offset);
    },

    mapToOption: (accion) => ({
      value: accion.id,
      label: `${accion.description} - ${accion.programa?.description || "Sin programa"}`,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;

        if (isNaN(numericId) || numericId <= 0) {
          return `Acción #${id}`;
        }

        const accion = await AccionCortoPlazoService.getById(numericId);
        return `${accion.description} - ${accion.programa?.description || "Sin programa"}`;
      } catch (error) {
        console.error("Error en getByIdFn:", error);
        return `Acción #${id}`;
      }
    },
  },
];

// src/modules/unidad/config/unidadEjecutora.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { UnidadEjecutora } from "../types/unidadEjecutora.types";
import { DireccionAdministrativaService } from "@/modules/organization/services/direccionAdministrativa.service";

export const unidadEjecutoraColumns: ColumnConfig<UnidadEjecutora>[] = [
  {
    key: "description",
    header: "Descripción",
    className: "text-left max-w-md",
    render: (item) => (
      <div className="whitespace-normal break-words">{item.description}</div>
    ),
  },
  {
    key: "techoPres",
    header: "Techo Presupuestario",
    className: "text-right w-40",
    render: (item) => {
      return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "BOB",
      }).format(item.techoPres);
    },
  },
  {
    key: "direccionAdministrativa",
    header: "Dirección Administrativa",
    className: "text-left max-w-md",
    render: (item) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium">
          {item.direccionAdministrativa?.description ?? "Sin dirección"}
        </span>
        {item.direccionAdministrativa?.entidad && (
          <span className="text-xs text-gray-500">
            {item.direccionAdministrativa.entidad.sigla} - Código:{" "}
            {item.direccionAdministrativa.entidad.codigo}
          </span>
        )}
      </div>
    ),
  },
];

export const unidadEjecutoraFormFields: FieldConfig<any>[] = [
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
    placeholder: "Describa la unidad ejecutora...",
  },
  {
    key: "techoPres",
    label: "Techo Presupuestario",
    type: "number",
    required: true,
    min: 0,
    step: 0.01,
    placeholder: "Ingrese el techo presupuestario",
  },
  {
    key: "direccionAdministrativaId",
    label: "Dirección Administrativa",
    type: "remote-search-select",
    required: true,
    placeholder: "Buscar dirección administrativa...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return DireccionAdministrativaService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return DireccionAdministrativaService.listAll(limit, offset);
    },

    mapToOption: (direccion) => ({
      value: direccion.id,
      label: `${direccion.description} ${
        direccion.entidad ? `- ${direccion.entidad.sigla}` : ""
      }`,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;

        if (isNaN(numericId) || numericId <= 0) {
          return `Dirección #${id}`;
        }

        const direccion = await DireccionAdministrativaService.getById(
          numericId
        );
        return `${direccion.description} ${
          direccion.entidad ? `- ${direccion.entidad.sigla}` : ""
        }`;
      } catch (error) {
        console.error("Error en getByIdFn:", error);
        return `Dirección #${id}`;
      }
    },
  },
];

// src/modules/poa/config/programa.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import { formatDateShort } from "@/shared/utils/date.utils";
import type { Programa } from "../types/programa.types";
import { PoaService } from "../services/poa.service";

export const programaColumns: ColumnConfig<Programa>[] = [
  {
    key: "description",
    header: "Descripción",
    className: "text-left max-w-lg",
    render: (item) => (
      <div className="whitespace-normal break-words">{item.description}</div>
    ),
  },
  {
    key: "poa",
    header: "POA",
    className: "text-center w-32",
    render: (item) => (
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Año {item.poa?.anio ?? "-"}</span>
        {item.poa?.fechaRegistro && (
          <span className="text-xs text-gray-500">
            {formatDateShort(item.poa.fechaRegistro)}
          </span>
        )}
      </div>
    ),
  },
  {
    key: "poa",
    header: "Unidad Ejecutora",
    className: "text-left max-w-md",
    render: (item) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium">
          {item.poa?.unidadEjecutora?.description ?? "Sin unidad"}
        </span>
        {item.poa?.unidadEjecutora?.direccionAdministrativa && (
          <span className="text-xs text-gray-500">
            {item.poa.unidadEjecutora.direccionAdministrativa.description}
          </span>
        )}
      </div>
    ),
  },
];

export const programaFormFields: FieldConfig<any>[] = [
  {
    key: "description",
    label: "Descripción del Programa",
    type: "textarea",
    required: true,
    placeholder: "Describa el programa...",
  },
  {
    key: "poaId",
    label: "POA",
    type: "remote-search-select",
    required: true,
    placeholder: "Buscar POA...",

    searchFn: async ({ search, limit, offset }) => {
      return PoaService.listAll(limit, offset, search);
    },

    mapToOption: (poa) => ({
      value: poa.id,
      label: `POA ${poa.anio} - ${poa.unidadEjecutora?.description || "Sin unidad"}`,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;

        if (isNaN(numericId) || numericId <= 0) {
          return `POA #${id}`;
        }

        const poa = await PoaService.getById(numericId);
        return `POA ${poa.anio} - ${poa.unidadEjecutora?.description || "Sin unidad"}`;
      } catch (error) {
        console.error("Error en getByIdFn:", error);
        return `POA #${id}`;
      }
    },
  },
];

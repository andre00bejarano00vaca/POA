// src/modules/poa/config/poa.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import { formatDateShort } from "@/shared/utils/date.utils";
import type { Poa } from "../types/poa.types";
import { UnidadEjecutoraService } from "@/modules/organization/services/unidadEjecutora.service";

export const poaColumns: ColumnConfig<Poa>[] = [
  {
    key: "anio",
    header: "Año",
    className: "text-center w-24",
  },
  {
    key: "fechaRegistro",
    header: "Fecha de Registro",
    className: "text-center w-40",
    render: (item) => {
      return formatDateShort(item.fechaRegistro);
    },
  },
  {
    key: "unidadEjecutora",
    header: "Unidad Ejecutora",
    className: "text-left max-w-md",
    render: (item) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium">
          {item.unidadEjecutora?.description ?? "Sin unidad ejecutora"}
        </span>
        {item.unidadEjecutora?.direccionAdministrativa && (
          <span className="text-xs text-gray-500">
            {item.unidadEjecutora.direccionAdministrativa.description}
          </span>
        )}
      </div>
    ),
  },
  {
    key: "unidadEjecutora",
    header: "Techo Presupuestario",
    className: "text-right w-40",
    render: (item) => {
      const techo = item.unidadEjecutora?.techoPres;
      return techo
        ? new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "BOB",
          }).format(techo)
        : "-";
    },
  },
];

export const poaFormFields: FieldConfig<any>[] = [
  {
    key: "anio",
    label: "Año",
    type: "number",
    required: true,
    min: 2000,
    max: 2100,
    step: 1,
    placeholder: "Ingrese el año del POA",
  },
  {
    key: "fechaRegistro",
    label: "Fecha de Registro",
    type: "date",
    required: true,
    placeholder: "Seleccione la fecha",
  },
  {
    key: "unidadEjecutoraId",
    label: "Unidad Ejecutora",
    type: "remote-search-select",
    required: true,
    placeholder: "Buscar unidad ejecutora...",

    searchFn: async ({ search, limit, offset }) => {
      const l = limit ?? 10;
      const o = offset ?? 0;

      if (search && search.trim()) {
        return UnidadEjecutoraService.searchByText(search.trim(), {
          limit: l,
          offset: o,
        });
      }

      return UnidadEjecutoraService.listAll(l, o);
    },

    mapToOption: (unidad) => ({
      value: unidad.id,
      label: unidad.description?.trim() || `Unidad #${unidad.id}`,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;

        if (isNaN(numericId) || numericId <= 0) {
          return `Unidad #${id}`;
        }

        const unidad = await UnidadEjecutoraService.getById(numericId);
        return unidad.description?.trim() || `Unidad #${numericId}`;
      } catch (error) {
        console.error("Error en getByIdFn:", error);
        return `Unidad #${id}`;
      }
    },
  },
];

// src/modules/pei/config/productoInstitucional.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { ProductoInstitucional } from "../types/productoInstitucional.types";
import { AccionEstrategicaService } from "../services/accionEstrategica.service";

export const productoInstitucionalColumns: ColumnConfig<ProductoInstitucional>[] =
  [
    { key: "id", header: "ID", className: "text-center w-20" },
    { key: "idPi", header: "ID PI", className: "text-center w-24" },
    { key: "description", header: "Descripción", className: "text-left" },
    {
      key: "accionEstrategica",
      header: "Acción Estratégica",
      className: "text-left w-64",
      render: (item) => item.accionEstrategica?.description ?? "Sin acción",
    },
  ];

export const productoInstitucionalFormFields: FieldConfig<any>[] = [
  {
    key: "idPi",
    label: "ID PI",
    type: "number",
    required: true,
    min: 0,
    step: 1,
    placeholder: "Ingrese el ID PI",
  },
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
    size: "full",
    placeholder: "Describa el producto institucional...",
  },
  {
    key: "accionEstrategicaId",
    label: "Acción Estratégica",
    type: "remote-search-select",
    required: true,
    size: "full",
    placeholder: "Buscar acción estratégica...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return AccionEstrategicaService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return AccionEstrategicaService.listAll(limit, offset);
    },

    mapToOption: (accion) => ({
      value: accion.id,
      label: accion.description?.trim() || `Acción #${accion.id}`,
    }),

    getByIdFn: async (id: number) => {
      const accion = await AccionEstrategicaService.getById(id);
      return accion.description?.trim() || `Acción #${accion.id}`;
    },
  },
];

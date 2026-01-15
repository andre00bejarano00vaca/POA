// src/modules/presupuesto/config/entidadTransferencia.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { EntidadTransferencia } from "@/modules/presupuesto/types/entidadTransferencia.types";
import { RubroService } from "@/modules/presupuesto/services/rubro.service";

export const entidadTransferenciaColumns: ColumnConfig<EntidadTransferencia>[] =
  [
    { key: "id", header: "ID", className: "text-center w-20" },
    { key: "codigo", header: "Código", className: "text-center w-32" },
    { key: "description", header: "Descripción", className: "text-left" },
    {
      key: "rubro",
      header: "Rubro",
      className: "text-left w-64",
      render: (item) => item.rubro?.description ?? "Sin rubro",
    },
  ];

export const entidadTransferenciaFormFields: FieldConfig<any>[] = [
  {
    key: "codigo",
    label: "Código",
    type: "number",
    required: true,
    min: 0,
    step: 1,
    placeholder: "Ingrese el código",
  },
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
    placeholder: "Descripción de la entidad de transferencia...",
    size: "full",
  },
  {
    key: "rubroIdRubroId",
    label: "Rubro",
    type: "remote-search-select",
    required: true,
    placeholder: "Buscar rubro...",
    size: "full",

    searchFn: ({ search, limit, offset }) =>
      RubroService.listAll(limit, offset, search),

    mapToOption: (r) => ({
      value: r.id,
      label: r.description?.trim() || `Rubro #${r.id} (sin descripción)`,
    }),

    getByIdFn: async (id: number) => {
      const rubro = await RubroService.getById(id);
      return rubro.description?.trim() || `Rubro #${rubro.id}`;
    },
  },
];

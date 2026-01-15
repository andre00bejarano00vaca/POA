// src/modules/presupuesto/config/recaudacion.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { Recaudacion } from "@/modules/presupuesto/types/recaudacion.types";
import { RubroService } from "@/modules/presupuesto/services/rubro.service";

export const recaudacionColumns: ColumnConfig<Recaudacion>[] = [
  { key: "id", header: "ID", className: "text-center w-20" },
  { key: "codOec", header: "Cod. OEC", className: "text-center w-32" },
  {
    key: "description",
    header: "Descripción",
    className: "text-left",
  },
  {
    key: "idRubro",
    header: "Rubro",
    className: "text-left w-64",
    render: (item) => item.idRubro?.description ?? "Sin rubro",
  },
  { key: "nBienes", header: "N° Bienes", className: "text-center w-28" },
  {
    key: "costoUServicio",
    header: "Costo U.",
    className: "text-right w-32",
  },
  {
    key: "totalDouble",
    header: "Total",
    className: "text-right w-32",
  },
];

export const recaudacionFormFields: FieldConfig<any>[] = [
  {
    key: "codOec",
    label: "Código OEC",
    type: "text",
    required: true,
    placeholder: "Ej: OEC-001",
  },
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
    placeholder: "Describa la recaudación...",
    size: "full",
  },
  {
    key: "nBienes",
    label: "N° Bienes",
    type: "number",
    required: true,
    min: 0,
    step: 1,
    placeholder: "Ej: 10",
  },
  {
    key: "costoUServicio",
    label: "Costo U. Servicio",
    type: "number",
    required: true,
    min: 0,
    step: 0.01,
    placeholder: "Ej: 1.50",
  },
  {
    key: "totalDouble",
    label: "Total",
    type: "number",
    required: true,
    min: 0,
    step: 0.01,
    placeholder: "Ej: 15.00",
  },
  {
    key: "idRubroId",
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

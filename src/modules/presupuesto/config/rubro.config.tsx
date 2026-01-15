// src/config/presupuesto/rubro.config.ts
import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { Rubro } from "@/modules/presupuesto/types/rubro.types";

export const rubroColumns: ColumnConfig<Rubro>[] = [
  {
    key: "id",
    header: "ID",
    className: "text-center w-20",
  },
  {
    key: "description",
    header: "Descripción",
    className: "text-left",
  },
  {
    key: "importeDouble",
    header: "Importe",
    className: "text-center w-40",
    render: (item) => {
      // (Opcional) formato simple, si no quieres esto borra render y listo
      const val = Number(item.importeDouble ?? 0);
      return val.toFixed(2);
    },
  },
];

export const rubroFormFields: FieldConfig<any>[] = [
  {
    key: "description",
    label: "Descripción",
    type: "text",
    required: true,
    placeholder: "Ingrese la descripción del rubro",
    size: "full",
  },
  {
    key: "importeDouble",
    label: "Importe",
    type: "number",
    required: true,
    placeholder: "Ingrese el importe",
    min: 0,
    step: 0.01,
  },
];

// src/config/presupuesto/organismo.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { Organismo } from "@/modules/presupuesto/types/organismo.types";

export const organismoColumns: ColumnConfig<Organismo>[] = [
  {
    key: "id",
    header: "ID",
    className: "text-center w-20",
  },
  {
    key: "codigo",
    header: "Código",
    className: "text-center w-32",
  },
  {
    key: "description",
    header: "Descripción",
    className: "text-left",
  },
  {
    key: "fuentes",
    header: "Fuentes Asignadas",
    className: "text-left w-80",
    render: (organismo: Organismo) => {
      if (!organismo.fuentes || organismo.fuentes.length === 0) {
        return (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 italic">Sin fuentes</span>
          </div>
        );
      }

      return (
        <div className="flex flex-wrap gap-1">
          {organismo.fuentes.map((fuente) => (
            <span
              key={fuente.id}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              title={fuente.description}
            >
              {fuente.codigo}
            </span>
          ))}
        </div>
      );
    },
  },
];

export const organismoFormFields: FieldConfig<any>[] = [
  {
    key: "codigo",
    label: "Código",
    type: "number",
    required: true,
    placeholder: "Ingrese el código",
  },
  {
    key: "description",
    label: "Descripción",
    type: "text",
    required: true,
    placeholder: "Ingrese la descripción del organismo",
  },
];

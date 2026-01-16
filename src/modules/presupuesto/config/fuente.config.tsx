// src/modules/presupuesto/config/fuente.config.tsx

import type { ColumnConfig } from "@/shared/components/common/DynamicTable";
import type { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { Fuente } from "@/modules/presupuesto/types/fuente.types";

/**
 * Configuración de columnas para la tabla de Fuentes
 */
export const fuenteColumns: ColumnConfig<Fuente>[] = [
  // {
  //   key: "id",
  //   header: "ID",
  //   className: "text-center w-20",
  // },
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
];

/**
 * Configuración de campos para el formulario de Fuentes
 */
export const fuenteFormFields: FieldConfig<any>[] = [
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
    type: "text",
    required: true,
    size: "full",
    placeholder: "Ingrese la descripción de la fuente",
  },
];

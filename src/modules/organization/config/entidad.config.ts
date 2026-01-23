// src/modules/entidad/config/entidad.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { Entidad } from "../types/entidad.types";

export const entidadColumns: ColumnConfig<Entidad>[] = [
  {
    key: "codigo",
    header: "Código",
    className: "text-left",
  },
  {
    key: "sigla",
    header: "Sigla",
    className: "text-left",
  },
  //   {
  //     key: "estado",
  //     header: "Estado",
  //     className: "text-center w-24",
  //     render: (item) => (
  //       <span
  //         className={`px-2 py-1 rounded-full text-xs font-medium ${
  //           item.estado === 1
  //             ? "bg-green-100 text-green-800"
  //             : "bg-red-100 text-red-800"
  //         }`}
  //       >
  //         {item.estado === 1 ? "Activo" : "Inactivo"}
  //       </span>
  //     ),
  //   },
  //   {
  //     key: "activo",
  //     header: "Activo",
  //     className: "text-center w-24",
  //     render: (item) => (
  //       <span
  //         className={`px-2 py-1 rounded-full text-xs font-medium ${
  //           item.activo === 1
  //             ? "bg-blue-100 text-blue-800"
  //             : "bg-gray-100 text-gray-800"
  //         }`}
  //       >
  //         {item.activo === 1 ? "Sí" : "No"}
  //       </span>
  //     ),
  //   },
];

export const entidadFormFields: FieldConfig<any>[] = [
  {
    key: "codigo",
    label: "Código",
    type: "number",
    required: true,
    min: 0,
    step: 1,
    placeholder: "Ingrese el código de la entidad",
  },
  {
    key: "sigla",
    label: "Sigla",
    type: "text",
    required: true,
    placeholder: "Ingrese la sigla de la entidad",
  },
  //   {
  //     key: "estado",
  //     label: "Estado",
  //     type: "select",
  //     required: true,
  //     options: [
  //       { value: 1, label: "Activo" },
  //       { value: 0, label: "Inactivo" },
  //     ],
  //   },
  //   {
  //     key: "activo",
  //     label: "Activo",
  //     type: "select",
  //     required: true,
  //     options: [
  //       { value: 1, label: "Sí" },
  //       { value: 0, label: "No" },
  //     ],
  //   },
];

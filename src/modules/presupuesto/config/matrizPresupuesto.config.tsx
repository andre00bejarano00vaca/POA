// src/config/matrizPresupuesto.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import { ObjetoGastoService } from "@/modules/presupuesto/services/objetoGasto.service";
import type { MatrizPresupuestoRecord } from "@/modules/presupuesto/types/matrizPresupuesto.types";

export const matrizPresupuestoColumns: ColumnConfig<MatrizPresupuestoRecord>[] =
  [
    { key: "codigo", header: "Código", className: "text-left w-32" },
    { key: "codPpto", header: "Cód. PPTO", className: "text-center w-20" },
    { key: "entidad", header: "Entidad", className: "text-center w-20" },
    { key: "da", header: "DA", className: "text-center w-16" },
    { key: "ue", header: "UE", className: "text-center w-16" },
    { key: "prog", header: "Prog.", className: "text-center w-16" },
    { key: "nroAct", header: "Nro. Act.", className: "text-center w-20" },
    {
      key: "descripcionActividad",
      header: "Descripción Actividades",
      className: "text-left min-w-64",
      render: (item) => (
        <span className="block truncate" title={item.descripcionActividad}>
          {item.descripcionActividad}
        </span>
      ),
    },
    { key: "fuente", header: "Fuente", className: "text-center w-20" },
    { key: "org", header: "ORG", className: "text-center w-20" },
    { key: "partida", header: "Partida", className: "text-left w-28" },
    {
      key: "descripcionGasto",
      header: "Descripción Gasto",
      className: "text-left min-w-48",
      render: (item) => (
        <span className="block truncate" title={item.descripcionGasto}>
          {item.descripcionGasto}
        </span>
      ),
    },
    {
      key: "entidadTransf",
      header: "Entidad Transf.",
      className: "text-center w-24",
    },
    {
      key: "importe",
      header: "Importe",
      className: "text-right w-32 font-medium",
      render: (item) =>
        `Bs. ${item.importe.toLocaleString("es-BO", {
          minimumFractionDigits: 2,
        })}`,
    },
  ];

export const matrizPresupuestoFormFields: FieldConfig<any>[] = [
  // Fila 1: Códigos de Identificación
  {
    key: "codigo",
    label: "Código",
    type: "text",
    required: true,
    placeholder: "420.005.03.01",
  },
  {
    key: "codPpto",
    label: "Cód. PPTO",
    type: "text",
    required: true,
    placeholder: "1",
  },
  {
    key: "entidad",
    label: "Entidad",
    type: "text",
    required: true,
    placeholder: "146",
  },
  {
    key: "da",
    label: "DA",
    type: "text",
    required: true,
    placeholder: "1",
  },

  // Fila 2: Organización y Programa
  {
    key: "ue",
    label: "UE",
    type: "text",
    required: true,
    placeholder: "47",
  },
  {
    key: "prog",
    label: "Programa",
    type: "text",
    required: true,
    placeholder: "5",
  },
  {
    key: "nroAct",
    label: "Nro. Act.",
    type: "text",
    required: true,
    placeholder: "01",
  },

  // Fila 3: Descripción de Actividad
  {
    key: "descripcionActividad",
    label: "Descripción de las Actividades",
    type: "textarea",
    required: true,
    size: "full",
    placeholder: "Ej: Asignación y control de los activos fijos...",
    rows: 3,
  },

  // Fila 4: SELECT de Objeto de Gasto (auto-llena los demás)
  {
    key: "objetoGastoId",
    label: "Objeto de Gasto (Partida)",
    type: "remote-search-select",
    required: true,
    size: "full",
    placeholder: "Buscar objeto de gasto...",
    helpText:
      "Al seleccionar se auto-completarán: Partida, Organismo, Fuente y Entidad Transferencia",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return ObjetoGastoService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return ObjetoGastoService.listAll(limit, offset);
    },

    mapToOption: (obj) => ({
      value: obj.id,
      label: `${obj.description} - Bs. ${
        obj.importeDouble?.toLocaleString("es-BO") || "0"
      }`,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;
        if (isNaN(numericId)) return `Objeto #${id}`;

        const obj = await ObjetoGastoService.getById(numericId);
        return obj.description?.trim() || `Objeto #${numericId}`;
      } catch (error) {
        return `Objeto #${id}`;
      }
    },
  },

  // Campos auto-llenados (readonly, se muestran pero no se editan)
  {
    key: "partida",
    label: "Partida",
    type: "text",
    disabled: true,
    placeholder: "Se llena automáticamente",
    helpText: "Auto-llenado desde Objeto de Gasto",
  },
  {
    key: "org",
    label: "ORG",
    type: "text",
    disabled: true,
    placeholder: "Se llena automáticamente",
    helpText: "Auto-llenado desde Organismo",
  },
  {
    key: "fuente",
    label: "Fuente",
    type: "text",
    disabled: true,
    placeholder: "Se llena automáticamente",
    helpText: "Auto-llenado desde Fuente del Organismo",
  },
  {
    key: "entidadTransf",
    label: "Entidad Transferencia",
    type: "text",
    disabled: true,
    placeholder: "Se llena automáticamente",
    helpText: "Auto-llenado desde Entidad Transferencia",
  },

  // Fila 5: Importe
  {
    key: "importe",
    label: "Importe (Bs.)",
    type: "number",
    required: true,
    min: 0,
    step: 0.01,
    placeholder: "5000.00",
  },
];

// src/modules/seguimiento/config/seguimientoPei.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { SeguimientoPei } from "../types/seguimientoPei.types";
import { PeiService } from "@/modules/pei/services/pei.service";
import { ESCALAS_VALORACION } from "../types/seguimientoPei.types";

// ======================================================
// COLUMNAS PARA SEGUIMIENTO PEI
// ======================================================
export const seguimientoPeiColumns: ColumnConfig<SeguimientoPei>[] = [
  {
    key: "ano",
    header: "Año",
    className: "text-center w-20",
  },
  {
    key: "pei",
    header: "PEI",
    className: "text-left w-40",
    render: (item) => (
      <div className="whitespace-normal break-words">
        {item.pei ? `PEI ${item.pei.anioIni} - ${item.pei.anioFin}` : "Sin PEI"}
      </div>
    ),
  },
  {
    key: "promedio_general",
    header: "Promedio General",
    className: "text-center w-32",
    render: (item) => (
      <span className="font-semibold text-blue-600">
        {item.promedio_general.toFixed(2)}%
      </span>
    ),
  },
  {
    key: "valoracion_global",
    header: "Valoración",
    className: "text-center w-28",
    render: (item) => {
      const color =
        item.valoracion_global === "Excelente"
          ? "text-green-600 bg-green-50"
          : item.valoracion_global === "Bueno"
            ? "text-blue-600 bg-blue-50"
            : item.valoracion_global === "Regular"
              ? "text-yellow-600 bg-yellow-50"
              : "text-red-600 bg-red-50";

      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
          {item.valoracion_global}
        </span>
      );
    },
  },
  {
    key: "porc_alta",
    header: "% Alta",
    className: "text-center w-20",
    render: (item) => (
      <span className="font-medium text-green-600">
        {item.porc_alta.toFixed(1)}%
      </span>
    ),
  },
  {
    key: "porc_media",
    header: "% Media",
    className: "text-center w-20",
    render: (item) => (
      <span className="font-medium text-yellow-600">
        {item.porc_media.toFixed(1)}%
      </span>
    ),
  },
  {
    key: "porc_baja",
    header: "% Baja",
    className: "text-center w-20",
    render: (item) => (
      <span className="font-medium text-red-600">
        {item.porc_baja.toFixed(1)}%
      </span>
    ),
  },
  {
    key: "fecha_registro",
    header: "Fecha Registro",
    className: "text-center w-32",
    render: (item) => (
      <span className="text-gray-600">
        {item.fecha_registro.toLocaleDateString("es-ES")}
      </span>
    ),
  },
];

// ======================================================
// FORMULARIO PARA SEGUIMIENTO PEI
// ======================================================
export const seguimientoPeiFormFields: FieldConfig<any>[] = [
  {
    key: "ano",
    label: "Año",
    type: "number",
    required: true,
    min: 2000,
    max: 2100,
    step: 1,
    placeholder: "Ingrese el año",
  },
  {
    key: "fecha_registro",
    label: "Fecha de Registro",
    type: "date",
    required: true,
    placeholder: "Seleccione la fecha de registro",
  },
  {
    key: "promedio_general",
    label: "Promedio General (%)",
    type: "number",
    required: true,
    min: 0,
    max: 100,
    step: 0.01,
    placeholder: "Ingrese el promedio general",
  },
  {
    key: "valoracion_global",
    label: "Valoración Global",
    type: "select",
    required: true,
    placeholder: "Seleccione valoración",
    options: [
      { value: ESCALAS_VALORACION.EXCELENTE, label: "Excelente" },
      { value: ESCALAS_VALORACION.BUENO, label: "Bueno" },
      { value: ESCALAS_VALORACION.REGULAR, label: "Regular" },
      { value: ESCALAS_VALORACION.DEFICIENTE, label: "Deficiente" },
    ],
  },
  {
    key: "porc_alta",
    label: "Porcentaje Alta (%)",
    type: "number",
    required: true,
    min: 0,
    max: 100,
    step: 0.1,
    placeholder: "Ingrese porcentaje alta",
  },
  {
    key: "porc_media",
    label: "Porcentaje Media (%)",
    type: "number",
    required: true,
    min: 0,
    max: 100,
    step: 0.1,
    placeholder: "Ingrese porcentaje media",
  },
  {
    key: "porc_baja",
    label: "Porcentaje Baja (%)",
    type: "number",
    required: true,
    min: 0,
    max: 100,
    step: 0.1,
    placeholder: "Ingrese porcentaje baja",
  },
  {
    key: "observaciones",
    label: "Observaciones",
    type: "textarea",
    required: false,
    placeholder: "Ingrese observaciones adicionales",
    rows: 3,
  },

  // ==================================================
  // PEI (REMOTE SELECT)
  // ==================================================
  {
    key: "pei_id_pei",
    label: "PEI",
    type: "remote-search-select",
    required: true,
    placeholder: "Buscar PEI...",

    searchFn: async ({ search, limit, offset }) => {
      const l = limit ?? 10;
      const o = offset ?? 0;

      if (search && search.trim()) {
        return PeiService.searchByText(search.trim(), {
          limit: l,
          offset: o,
        });
      }

      return PeiService.listAll({ limit: l, offset: o });
    },

    mapToOption: (pei) => ({
      value: pei.id,
      label: `PEI ${pei.anioIni} - ${pei.anioFin}`,
    }),

    getByIdFn: async (id: number | string) => {
      const numericId = typeof id === "string" ? parseInt(id, 10) : id;
      if (isNaN(numericId) || numericId <= 0) {
        return `PEI #${id}`;
      }

      const pei = await PeiService.getById(numericId);
      return `PEI ${pei.anioIni} - ${pei.anioFin}`;
    },
  },
];

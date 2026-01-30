// src/modules/seguimiento/config/seguimientoPoa.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { SeguimientoPoa } from "../types/seguimientoPoa.types";
import { PoaService } from "@/modules/poa/services/poa.service";
import { ESCALAS_VALORACION } from "../types/seguimientoPoa.types";

// ======================================================
// COLUMNAS PARA SEGUIMIENTO POA
// ======================================================
export const seguimientoPoaColumns: ColumnConfig<SeguimientoPoa>[] = [
  {
    key: "trimestre",
    header: "Trimestre",
    className: "text-center w-24",
    render: (item) => <span className="font-semibold">T{item.trimestre}</span>,
  },
  {
    key: "poa",
    header: "POA",
    className: "text-left w-40",
    render: (item) => (
      <div className="whitespace-normal break-words">
        {item.poa
          ? `POA ${item.poa.anio} - ${item.poa.unidadEjecutora?.description || ""}`
          : "Sin POA"}
      </div>
    ),
  },
  {
    key: "promedioGeneral",
    header: "Promedio General",
    className: "text-center w-32",
    render: (item) => (
      <span className="font-semibold text-blue-600">
        {item.promedioGeneral.toFixed(2)}%
      </span>
    ),
  },
  {
    key: "valoracionGlobal",
    header: "Valoración",
    className: "text-center w-28",
    render: (item) => {
      const color =
        item.valoracionGlobal === "Excelente"
          ? "text-green-600 bg-green-50"
          : item.valoracionGlobal === "Bueno"
            ? "text-blue-600 bg-blue-50"
            : item.valoracionGlobal === "Regular"
              ? "text-yellow-600 bg-yellow-50"
              : "text-red-600 bg-red-50";

      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
          {item.valoracionGlobal}
        </span>
      );
    },
  },
  {
    key: "porcAlta",
    header: "% Alta",
    className: "text-center w-20",
    render: (item) => (
      <span className="font-medium text-green-600">
        {item.porcAlta.toFixed(1)}%
      </span>
    ),
  },
  {
    key: "porcMedia",
    header: "% Media",
    className: "text-center w-20",
    render: (item) => (
      <span className="font-medium text-yellow-600">
        {item.porcMedia.toFixed(1)}%
      </span>
    ),
  },
  {
    key: "porcBaja",
    header: "% Baja",
    className: "text-center w-20",
    render: (item) => (
      <span className="font-medium text-red-600">
        {item.porcBaja.toFixed(1)}%
      </span>
    ),
  },
  {
    key: "fechaRegistro",
    header: "Fecha Registro",
    className: "text-center w-32",
    render: (item) => (
      <span className="text-gray-600">
        {item.fechaRegistro.toLocaleDateString("es-ES")}
      </span>
    ),
  },
];

// ======================================================
// FORMULARIO PARA SEGUIMIENTO POA
// ======================================================
export const seguimientoPoaFormFields: FieldConfig<any>[] = [
  {
    key: "trimestre",
    label: "Trimestre",
    type: "select",
    required: true,
    placeholder: "Seleccione el trimestre",
    options: [
      { value: 1, label: "Trimestre 1 (Ene-Mar)" },
      { value: 2, label: "Trimestre 2 (Abr-Jun)" },
      { value: 3, label: "Trimestre 3 (Jul-Sep)" },
      { value: 4, label: "Trimestre 4 (Oct-Dic)" },
    ],
  },
  {
    key: "fechaRegistro",
    label: "Fecha de Registro",
    type: "date",
    required: true,
    placeholder: "Seleccione la fecha de registro",
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
  // POA (REMOTE SELECT)
  // ==================================================
  {
    key: "poaId",
    label: "POA",
    type: "remote-search-select",
    required: true,
    placeholder: "Buscar POA...",

    searchFn: async ({ search, limit, offset }) => {
      const l = limit ?? 10;
      const o = offset ?? 0;

      // listAll recibe parámetros posicionales, no objeto
      return PoaService.listAll(l, o, search?.trim());
    },

    mapToOption: (poa) => ({
      value: poa.id,
      label: `POA ${poa.anio} - ${poa.unidadEjecutora?.description || ""}`,
    }),

    getByIdFn: async (id: number | string) => {
      const numericId = typeof id === "string" ? parseInt(id, 10) : id;

      if (isNaN(numericId) || numericId <= 0) {
        return `POA #${id}`;
      }

      const poa = await PoaService.getById(numericId);
      return `POA ${poa.anio} - ${poa.unidadEjecutora?.description || ""}`;
    },
  },
];

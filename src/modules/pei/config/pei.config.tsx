// src/config/pei/pei.config.tsx

import React from "react";
import type { ColumnConfig } from "@/shared/components/common/DynamicTable";
import type { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { PEI, CreatePEIInput } from "@/modules/pei/types/pei.types";

// const formatCurrency = (amount: number): string => {
//   return new Intl.NumberFormat("es-BO", {
//     style: "currency",
//     currency: "BOB",
//     minimumFractionDigits: 2,
//   }).format(amount);
// };

const extractYear = (dateString: string): string => {
  try {
    if (/^\d{4}$/.test(dateString)) {
      return dateString;
    }

    const yearMatch = dateString.match(/^(\d{4})/);
    if (yearMatch) {
      return yearMatch[1];
    }

    return dateString;
  } catch (error) {
    console.error("Error al extraer año:", error, dateString);
    return dateString;
  }
};

export const peiColumns: ColumnConfig<PEI>[] = [
  {
    key: "id",
    header: "ID",
    className: "text-center font-medium",
  },
  {
    key: "anioIni",
    header: "AÑO INICIO",
    className: "font-mono",
    render: (item) => extractYear(item.anioIni),
  },
  {
    key: "anioFin",
    header: "AÑO FIN",
    className: "font-mono",
    render: (item) => extractYear(item.anioFin),
  },
  {
    key: "metaTotal",
    header: "META TOTAL",
    className: "text-right font-semibold",
    // render: (item) => formatCurrency(item.metaTotal),
  },
  {
    key: "ejecucion",
    header: "EJECUCIÓN",
    className: "text-right",
    render: (item) => {
      const percentage =
        item.metaTotal > 0
          ? ((item.ejecucion / item.metaTotal) * 100).toFixed(1)
          : "0.0";

      return (
        <div className="flex flex-col items-end">
          <span
            className={
              item.ejecucion > 0
                ? "text-green-600 font-medium"
                : "text-gray-400"
            }
          >
            {item.ejecucion}
          </span>
          <span className="text-xs text-gray-500">({percentage}%)</span>
        </div>
      );
    },
  },
  {
    key: "observacion",
    header: "OBSERVACIONES",
    className: "max-w-[200px]",
    render: (item) =>
      item.observacion ? (
        <span className="block truncate" title={item.observacion}>
          {item.observacion}
        </span>
      ) : (
        <span className="text-gray-400 italic">Sin observaciones</span>
      ),
  },
];

export const peiFormFields: FieldConfig<CreatePEIInput>[] = [
  {
    key: "anioIni",
    label: "Año Inicio",
    type: "date",
    required: true,
    size: "half",
    placeholder: "Seleccione la fecha de inicio",
  },
  {
    key: "anioFin",
    label: "Año Fin",
    type: "date",
    required: true,
    size: "half",
    placeholder: "Seleccione la fecha de fin",
  },
  {
    key: "metaTotal",
    label: "Meta Total",
    type: "number",
    required: true,
    size: "half",
    min: 0,
    step: 1,
    placeholder: "Ingrese el presupuesto total",
  },
  {
    key: "ejecucion",
    label: "Ejecución Inicial",
    type: "number",
    required: true,
    size: "half",
    min: 0,
    step: 1,
    placeholder: "0",
  },
  {
    key: "observacion",
    label: "Observaciones",
    type: "textarea",
    required: false,
    size: "full",
    placeholder: "Detalles o comentarios sobre este PEI (opcional)...",
  },
];

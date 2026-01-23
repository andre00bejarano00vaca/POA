// src/modules/poa/config/programacionTrimestralMeta.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { ProgramacionTrimestralMeta } from "../types/programacionTrimestralMeta.types";
import { IndicadorPoaService } from "../services/indicadorPoa.service";

const getTrimesterName = (trimestre: number): string => {
  const nombres = ["", "Primer", "Segundo", "Tercer", "Cuarto"];
  return `${nombres[trimestre]} Trimestre`;
};

export const programacionTrimestralMetaColumns: ColumnConfig<ProgramacionTrimestralMeta>[] =
  [
    {
      key: "trimestre",
      header: "Trimestre",
      className: "text-center w-32",
      render: (item) => (
        <span className="font-semibold">
          {getTrimesterName(item.trimestre)}
        </span>
      ),
    },
    {
      key: "programado",
      header: "Programado",
      className: "text-center w-24",
      render: (item) => (
        <span className="font-semibold text-blue-600">{item.programado}</span>
      ),
    },
    {
      key: "ejecutado",
      header: "Ejecutado",
      className: "text-center w-24",
      render: (item) => (
        <span className="font-semibold text-green-600">{item.ejecutado}</span>
      ),
    },
    {
      key: "ejecutado", // ✅ key real del tipo
      header: "% Cumplimiento",
      className: "text-center w-32",
      render: (item) => {
        const porcentaje =
          item.programado > 0
            ? ((item.ejecutado / item.programado) * 100).toFixed(1)
            : "0.0";

        const p = parseFloat(porcentaje);
        const color =
          p >= 100
            ? "text-green-600"
            : p >= 75
              ? "text-yellow-600"
              : "text-red-600";

        return <span className={`font-bold ${color}`}>{porcentaje}%</span>;
      },
    },
    {
      key: "indicadorPoa",
      header: "Indicador",
      className: "text-left max-w-md",
      render: (item) => (
        <div className="text-sm text-gray-600 truncate">
          {item.indicadorPoa?.description ?? "-"}
        </div>
      ),
    },
  ];

export const programacionTrimestralMetaFormFields: FieldConfig<any>[] = [
  {
    key: "trimestre",
    label: "Trimestre",
    type: "select",
    required: true,
    options: [
      { value: 1, label: "Primer Trimestre" },
      { value: 2, label: "Segundo Trimestre" },
      { value: 3, label: "Tercer Trimestre" },
      { value: 4, label: "Cuarto Trimestre" },
    ],
  },
  {
    key: "programado",
    label: "Meta Programada",
    type: "number",
    required: true,
    min: 0,
    step: 1,
    placeholder: "Ingrese la meta programada",
  },
  {
    key: "ejecutado",
    label: "Meta Ejecutada",
    type: "number",
    required: true,
    min: 0,
    step: 1,
    placeholder: "Ingrese la meta ejecutada",
  },
  {
    key: "indicadorPoaId",
    label: "Indicador POA",
    type: "remote-search-select",
    required: true,
    placeholder: "Buscar indicador...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return IndicadorPoaService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return IndicadorPoaService.listAll(limit, offset);
    },

    mapToOption: (indicador) => ({
      value: indicador.id,
      label: `${indicador.description} - ${indicador.unidadMedida}`,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;

        if (isNaN(numericId) || numericId <= 0) {
          return `Indicador #${id}`;
        }

        const indicador = await IndicadorPoaService.getById(numericId);
        return `${indicador.description} - ${indicador.unidadMedida}`;
      } catch (error) {
        console.error("Error en getByIdFn:", error);
        return `Indicador #${id}`;
      }
    },
  },
];

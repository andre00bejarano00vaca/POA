// src/modules/programacion/config/programacionMetaAnual.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { ProgramacionMetaAnual } from "../types/programacionMetaAnual.types";
import { IndicadorPeiService } from "@/modules/pei/services/indicadorPei.service";
import { PeiService } from "@/modules/pei/services/pei.service";

// ======================================================
// COLUMNAS
// ======================================================
export const programacionMetaAnualColumns: ColumnConfig<ProgramacionMetaAnual>[] =
  [
    {
      key: "anio",
      header: "Año",
      className: "text-center w-20",
    },
    {
      key: "idIndicadorPeiImp",
      header: "Indicador",
      className: "text-left max-w-md",
      render: (item) => (
        <div className="whitespace-normal break-words">
          {item.idIndicadorPeiImp?.description ?? "Sin indicador"}
        </div>
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
      key: "ejecutado", // key válida
      header: "% Cumplimiento",
      className: "text-center w-32",
      render: (item) => {
        const porcentaje =
          item.programado > 0
            ? ((item.ejecutado / item.programado) * 100).toFixed(1)
            : "0.0";

        const color =
          parseFloat(porcentaje) >= 100
            ? "text-green-600"
            : parseFloat(porcentaje) >= 75
              ? "text-yellow-600"
              : "text-red-600";

        return <span className={`font-bold ${color}`}>{porcentaje}%</span>;
      },
    },
  ];

// ======================================================
// FORMULARIO
// ======================================================
export const programacionMetaAnualFormFields: FieldConfig<any>[] = [
  {
    key: "anio",
    label: "Año",
    type: "number",
    required: true,
    min: 2000,
    max: 2100,
    step: 1,
    placeholder: "Ingrese el año",
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

  // ==================================================
  // INDICADOR PEI (SERVICE NUMÉRICO)
  // ==================================================
  {
    key: "idIndicadorPeiImpId",
    label: "Indicador PEI",
    type: "remote-search-select",
    required: true,
    placeholder: "Buscar indicador...",

    searchFn: async ({ search, limit, offset }) => {
      const l = limit ?? 10;
      const o = offset ?? 0;

      if (search && search.trim()) {
        return IndicadorPeiService.searchByText(search.trim(), {
          limit: l,
          offset: o,
        });
      }

      return IndicadorPeiService.listAll(l, o);
    },

    mapToOption: (indicador) => ({
      value: indicador.id,
      label: indicador.description?.trim() || `Indicador #${indicador.id}`,
    }),

    getByIdFn: async (id: number | string) => {
      const numericId = typeof id === "string" ? parseInt(id, 10) : id;
      if (isNaN(numericId) || numericId <= 0) {
        return `Indicador #${id}`;
      }

      const indicador = await IndicadorPeiService.getById(numericId);
      return indicador.description?.trim() || `Indicador #${numericId}`;
    },
  },

  // ==================================================
  // PEI (SERVICE OBJETO)
  // ==================================================
  {
    key: "peiIdPeiId",
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

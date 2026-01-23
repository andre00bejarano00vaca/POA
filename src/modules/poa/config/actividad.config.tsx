// src/modules/poa/config/actividad.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import { formatDateShort, toInputDate } from "@/shared/utils/date.utils";
import type { Actividad } from "../types/actividad.types";
import { AccionCortoPlazoService } from "../services/accionCortoPlazo.service";

export const actividadColumns: ColumnConfig<Actividad>[] = [
  {
    key: "description",
    header: "Descripción",
    className: "text-left max-w-md",
    render: (item) => (
      <div className="whitespace-normal break-words">{item.description}</div>
    ),
  },
  {
    key: "tipo",
    header: "Tipo",
    className: "text-center w-24",
  },
  {
    key: "clase",
    header: "Clase",
    className: "text-center w-24",
  },
  {
    key: "fechaIni",
    header: "Fecha Inicio",
    className: "text-center w-32",
    render: (item) => formatDateShort(item.fechaIni),
  },
  {
    key: "fechaFinal",
    header: "Fecha Final",
    className: "text-center w-32",
    render: (item) => formatDateShort(item.fechaFinal),
  },
  {
    key: "accionCortoPlazo",
    header: "Acción",
    className: "text-left max-w-xs",
    render: (item) => (
      <div className="text-sm text-gray-600 truncate">
        {item.accionCortoPlazo?.description ?? "-"}
      </div>
    ),
  },
];

export const actividadFormFields: FieldConfig<any>[] = [
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
    placeholder: "Describa la actividad...",
  },
  {
    key: "tipo",
    label: "Tipo",
    type: "text",
    required: true,
    placeholder: "Ingrese el tipo de actividad",
  },
  {
    key: "clase",
    label: "Clase",
    type: "text",
    required: true,
    placeholder: "Ingrese la clase",
  },
  {
    key: "categProgramatica",
    label: "Categoría Programática",
    type: "text",
    required: true,
    placeholder: "Ingrese la categoría programática",
  },
  {
    key: "fechaIni",
    label: "Fecha de Inicio",
    type: "date",
    required: true,
  },
  {
    key: "fechaFinal",
    label: "Fecha Final",
    type: "date",
    required: true,
  },
  {
    key: "docVerif",
    label: "Documento de Verificación",
    type: "number",
    required: true,
    min: 0,
    step: 1,
    placeholder: "Ingrese el documento de verificación",
  },
  {
    key: "causasDesv",
    label: "Causas de Desviación",
    type: "textarea",
    required: true,
    placeholder: "Describa las causas de desviación...",
  },
  {
    key: "accionCortoPlazoId",
    label: "Acción Corto Plazo",
    type: "remote-search-select",
    required: true,
    placeholder: "Buscar acción...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return AccionCortoPlazoService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return AccionCortoPlazoService.listAll(limit, offset);
    },

    mapToOption: (accion) => ({
      value: accion.id,
      label: accion.description,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;

        if (isNaN(numericId) || numericId <= 0) {
          return `Acción #${id}`;
        }

        const accion = await AccionCortoPlazoService.getById(numericId);
        return accion.description;
      } catch (error) {
        console.error("Error en getByIdFn:", error);
        return `Acción #${id}`;
      }
    },
  },
];

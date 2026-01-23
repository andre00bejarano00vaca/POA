// src/modules/direccion/config/direccionAdministrativa.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { DireccionAdministrativa } from "../types/direccionAdministrativa.types";
import { EntidadService } from "@/modules/organization/services/entidad.service";

export const direccionAdministrativaColumns: ColumnConfig<DireccionAdministrativa>[] =
  [
    {
      key: "description",
      header: "Descripción",
      className: "text-left max-w-lg",
      render: (item) => (
        <div className="whitespace-normal break-words">{item.description}</div>
      ),
    },
    {
      key: "entidad",
      header: "Entidad",
      className: "text-center w-32",
      render: (item) => (
        <div className="flex flex-col items-center gap-1">
          <span className="font-semibold">
            {item.entidad?.sigla ?? "Sin entidad"}
          </span>
          <span className="text-xs text-gray-500">
            Código: {item.entidad?.codigo ?? "-"}
          </span>
        </div>
      ),
    },
    // {
    //   key: "entidad",
    //   header: "Estado",
    //   className: "text-center w-24",
    //   render: (item) => (
    //     <span
    //       className={`px-2 py-1 rounded-full text-xs font-medium ${
    //         item.entidad?.estado === 1
    //           ? "bg-green-100 text-green-800"
    //           : "bg-red-100 text-red-800"
    //       }`}
    //     >
    //       {item.entidad?.estado === 1 ? "Activo" : "Inactivo"}
    //     </span>
    //   ),
    // },
  ];

export const direccionAdministrativaFormFields: FieldConfig<any>[] = [
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
    placeholder: "Describa la dirección administrativa...",
  },
  {
    key: "entidadId",
    label: "Entidad",
    type: "remote-search-select",
    required: true,
    placeholder: "Buscar entidad...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return EntidadService.searchByText(search.trim(), { limit, offset });
      }
      return EntidadService.listAll(limit, offset);
    },

    mapToOption: (entidad) => ({
      value: entidad.id,
      label: `${entidad.sigla} - Código: ${entidad.codigo}`,
    }),

    getByIdFn: async (id: number | string) => {
      try {
        const numericId = typeof id === "string" ? parseInt(id, 10) : id;

        if (isNaN(numericId) || numericId <= 0) {
          return `Entidad #${id}`;
        }

        const entidad = await EntidadService.getById(numericId);
        return `${entidad.sigla} - Código: ${entidad.codigo}`;
      } catch (error) {
        console.error("Error en getByIdFn:", error);
        return `Entidad #${id}`;
      }
    },
  },
];

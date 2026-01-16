// // src/modules/pei/config/accionEstrategica.config.tsx

// import { ColumnConfig } from "@/shared/components/common/DynamicTable";
// import { FieldConfig } from "@/shared/components/common/DynamicForm";
// import type { AccionEstrategica } from "../types/accionEstrategica.types";
// import { ObjetivoEstrategicoService } from "../services/objetivoEstrategico.service";

// export const accionEstrategicaColumns: ColumnConfig<AccionEstrategica>[] = [
//   { key: "id", header: "ID", className: "text-center w-20" },
//   { key: "description", header: "Descripción", className: "text-left" },
//   {
//     key: "objetivoEstrategico",
//     header: "Objetivo Estratégico",
//     className: "text-left w-64",
//     render: (item) => item.objetivoEstrategico?.description ?? "Sin objetivo",
//   },
// ];

// export const accionEstrategicaFormFields: FieldConfig<any>[] = [
//   {
//     key: "description",
//     label: "Descripción",
//     type: "textarea",
//     required: true,
//     size: "half",
//     placeholder: "Describa la acción estratégica institucional...",
//   },
//   {
//     key: "objetivoEstrategicoId",
//     label: "Objetivo Estratégico",
//     type: "remote-search-select",
//     required: true,
//     size: "half",
//     placeholder: "Buscar objetivo estratégico...",

//     searchFn: async ({ search, limit, offset }) => {
//       if (search && search.trim()) {
//         return ObjetivoEstrategicoService.searchByText(search.trim(), {
//           limit,
//           offset,
//         });
//       }
//       return ObjetivoEstrategicoService.listAll(limit, offset);
//     },

//     mapToOption: (objetivo) => ({
//       value: objetivo.id,
//       label: objetivo.description?.trim() || `Objetivo #${objetivo.id}`,
//     }),

//     getByIdFn: async (id: number) => {
//       const objetivo = await ObjetivoEstrategicoService.getById(id);
//       return objetivo.description?.trim() || `Objetivo #${objetivo.id}`;
//     },
//   },
// ];

// src/modules/pei/config/accionEstrategica.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { AccionEstrategica } from "../types/accionEstrategica.types";
import { ObjetivoEstrategicoService } from "../services/objetivoEstrategico.service";

export const accionEstrategicaColumns: ColumnConfig<AccionEstrategica>[] = [
  {
    key: "id",
    header: "ID",
    className: "text-center w-20",
  },
  {
    key: "description",
    header: "Descripción",
    className: "text-left max-w-lg", // ← Ancho máximo
    render: (item) => (
      <div className="whitespace-normal break-words">{item.description}</div>
    ),
  },
  {
    key: "objetivoEstrategico",
    header: "Objetivo Estratégico",
    className: "text-left max-w-md", // ← Ancho máximo
    render: (item) => (
      <div className="whitespace-normal break-words">
        {item.objetivoEstrategico?.description ?? "Sin objetivo"}
      </div>
    ),
  },
];

export const accionEstrategicaFormFields: FieldConfig<any>[] = [
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
    size: "half",
    placeholder: "Describa la acción estratégica institucional...",
  },
  {
    key: "objetivoEstrategicoId",
    label: "Objetivo Estratégico",
    type: "remote-search-select",
    required: true,
    size: "half",
    placeholder: "Buscar objetivo estratégico...",

    searchFn: async ({ search, limit, offset }) => {
      if (search && search.trim()) {
        return ObjetivoEstrategicoService.searchByText(search.trim(), {
          limit,
          offset,
        });
      }
      return ObjetivoEstrategicoService.listAll(limit, offset);
    },

    mapToOption: (objetivo) => ({
      value: objetivo.id,
      label: objetivo.description?.trim() || `Objetivo #${objetivo.id}`,
    }),

    getByIdFn: async (id: number) => {
      const objetivo = await ObjetivoEstrategicoService.getById(id);
      return objetivo.description?.trim() || `Objetivo #${objetivo.id}`;
    },
  },
];

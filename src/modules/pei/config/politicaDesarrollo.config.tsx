// src/modules/pei/config/politicaDesarrollo.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { PoliticaDesarrollo } from "../types/politicaDesarrollo.types";
import { AreaService } from "../services/areaEstrategica.service";
export const politicaDesarrolloColumns: ColumnConfig<PoliticaDesarrollo>[] = [
  { key: "id", header: "ID", className: "text-center w-20" },
  { key: "idPd", header: "ID PD", className: "text-center w-24" },
  { key: "description", header: "Descripción", className: "text-left" },
  {
    key: "areaEstrategica",
    header: "Área Estratégica",
    className: "text-left w-64",
    render: (item) => item.areaEstrategica?.description ?? "Sin área",
  },
];

export const politicaDesarrolloFormFields: FieldConfig<any>[] = [
  {
    key: "idPd",
    label: "ID PD",
    type: "number",
    required: true,
    min: 0,
    step: 1,
    placeholder: "Ingrese el ID PD",
  },
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
    size: "full",
    placeholder: "Describa la política de desarrollo...",
  },
  {
    key: "areaEstrategicaId",
    label: "Área Estratégica",
    type: "remote-search-select",
    required: true,
    size: "full",
    placeholder: "Buscar área estratégica...",

    // ✅ Adaptador: AreaService.listAll espera { limit, offset } no (limit, offset, search)
    searchFn: async ({ search, limit, offset }) => {
      // Si hay búsqueda, usa searchByText
      if (search && search.trim()) {
        return AreaService.searchByText(search.trim(), { limit, offset });
      }
      // Sin búsqueda, lista todas
      return AreaService.listAll({ limit, offset });
    },

    // ✅ Mapear a opciones del select
    mapToOption: (area) => ({
      value: area.id,
      label: area.description?.trim() || `Área #${area.id}`,
    }),

    // ✅ Obtener por ID cuando se abre el form en modo edición
    getByIdFn: async (id: number) => {
      const area = await AreaService.getById(id);
      return area.description?.trim() || `Área #${area.id}`;
    },
  },
];

// src/modules/presupuesto/config/objetoGasto.config.tsx

import { ColumnConfig } from "@/shared/components/common/DynamicTable";
import { FieldConfig } from "@/shared/components/common/DynamicForm";
import type { ObjetoGasto } from "@/modules/presupuesto/types/objetoGasto.types";
import { EntidadTransferenciaService } from "@/modules/presupuesto/services/entidadTransferencia.service";
import { OrganismoService } from "@/modules/presupuesto/services/organismo.service";

export const objetoGastoColumns: ColumnConfig<ObjetoGasto>[] = [
  { key: "id", header: "ID", className: "text-center w-20" },
  { key: "description", header: "Descripción", className: "text-left" },
  {
    key: "importeDouble",
    header: "Importe",
    className: "text-right w-32",
  },
  {
    key: "entidadTransferenciaIdEt",
    header: "Entidad",
    className: "text-left w-64",
    render: (item) =>
      item.entidadTransferenciaIdEt?.description ?? "Sin entidad",
  },
  {
    key: "organismoIdOrg",
    header: "Organismo",
    className: "text-left w-64",
    render: (item) => item.organismoIdOrg?.description ?? "Sin organismo",
  },
];

export const objetoGastoFormFields: FieldConfig<any>[] = [
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
    size: "full",
    placeholder: "Describa el objeto de gasto...",
  },
  {
    key: "importeDouble",
    label: "Importe",
    type: "number",
    required: true,
    min: 0,
    step: 0.01,
    placeholder: "Ej: 1500.00",
  },
  {
    key: "entidadTransferenciaIdEtId",
    label: "Entidad de Transferencia",
    type: "remote-search-select",
    required: true,
    size: "full",
    placeholder: "Buscar entidad...",

    // Función de búsqueda
    searchFn: ({ search, limit, offset }) =>
      EntidadTransferenciaService.listAll(limit, offset, search),

    // Mapear a opciones del select
    mapToOption: (entidad) => ({
      value: entidad.id,
      label: entidad.description?.trim() || `Entidad #${entidad.id}`,
    }),

    // Obtener por ID cuando se abre el form en modo edición
    getByIdFn: async (id: number) => {
      const entidad = await EntidadTransferenciaService.getById(id);
      return entidad.description?.trim() || `Entidad #${entidad.id}`;
    },
  },
  {
    key: "organismoIdOrgId",
    label: "Organismo",
    type: "remote-search-select",
    required: true,
    size: "full",
    placeholder: "Buscar organismo...",

    searchFn: ({ search, limit, offset }) =>
      OrganismoService.listAll(limit, offset, search),

    mapToOption: (organismo) => ({
      value: organismo.id,
      label: organismo.description?.trim() || `Organismo #${organismo.id}`,
    }),
    getByIdFn: async (id: number) => {
      const organismo = await OrganismoService.getById(id);
      return organismo.description?.trim() || `Organismo #${organismo.id}`;
    },
  },
];

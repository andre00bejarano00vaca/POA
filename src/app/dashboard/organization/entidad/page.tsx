// src/app/entidad/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useEntidad } from "@/modules/organization";
import { entidadColumns, entidadFormFields } from "@/modules/organization";
import type { Entidad } from "@/modules/organization";

export default function EntidadPage() {
  return (
    <GenericList<Entidad>
      title="Entidades"
      useData={useEntidad}
      columns={entidadColumns}
      formFields={entidadFormFields}
      searchKeys={["codigo", "sigla"]}
      searchPlaceholder="Buscar por código o sigla..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay entidades registradas."
      createButtonText="Añadir Entidad"
      mapItemToForm={(item: Entidad) => ({
        id: item.id,
        codigo: item.codigo,
        sigla: item.sigla,
        // estado: item.estado,
        // activo: item.activo,
      })}
    />
  );
}

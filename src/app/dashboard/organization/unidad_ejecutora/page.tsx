// src/app/unidad-ejecutora/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useUnidadEjecutora } from "@/modules/organization";
import {
  unidadEjecutoraColumns,
  unidadEjecutoraFormFields,
} from "@/modules/organization";
import type { UnidadEjecutora } from "@/modules/organization";

export default function UnidadEjecutoraPage() {
  return (
    <GenericList<UnidadEjecutora>
      title="Unidades Ejecutoras"
      useData={useUnidadEjecutora}
      columns={unidadEjecutoraColumns}
      formFields={unidadEjecutoraFormFields}
      searchKeys={["description"]}
      searchPlaceholder="Buscar por descripción..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay unidades ejecutoras registradas."
      createButtonText="Añadir Unidad Ejecutora"
      mapItemToForm={(item: UnidadEjecutora) => ({
        id: item.id,
        description: item.description,
        techoPres: item.techoPres,
        direccionAdministrativaId: item.direccionAdministrativa?.id,
      })}
    />
  );
}

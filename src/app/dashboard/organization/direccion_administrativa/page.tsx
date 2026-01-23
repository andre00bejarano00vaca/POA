// src/app/direccion-administrativa/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useDireccionAdministrativa } from "@/modules/organization";
import {
  direccionAdministrativaColumns,
  direccionAdministrativaFormFields,
} from "@/modules/organization";
import type { DireccionAdministrativa } from "@/modules/organization";

export default function DireccionAdministrativaPage() {
  return (
    <GenericList<DireccionAdministrativa>
      title="Direcciones Administrativas"
      useData={useDireccionAdministrativa}
      columns={direccionAdministrativaColumns}
      formFields={direccionAdministrativaFormFields}
      searchKeys={["description"]}
      searchPlaceholder="Buscar por descripción..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay direcciones administrativas registradas."
      createButtonText="Añadir Dirección"
      mapItemToForm={(item: DireccionAdministrativa) => ({
        id: item.id,
        description: item.description,
        entidadId: item.entidad?.id,
      })}
    />
  );
}

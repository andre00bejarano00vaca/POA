// src/app/dashboard/poa/objetivo_institucional_acp/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useAccionCortoPlazo } from "@/modules/poa";
import {
  accionCortoPlazoColumns,
  accionCortoPlazoFormFields,
} from "@/modules/poa";
import type { AccionCortoPlazo } from "@/modules/poa";

export default function AccionCortoPlazoPage() {
  return (
    <GenericList<AccionCortoPlazo>
      title="Acciones de Corto Plazo (ACP)"
      useData={useAccionCortoPlazo}
      columns={accionCortoPlazoColumns}
      formFields={accionCortoPlazoFormFields}
      searchKeys={["description"]}
      searchPlaceholder="Buscar por descripción..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay acciones de corto plazo registradas."
      createButtonText="Añadir Acción"
      mapItemToForm={(item: AccionCortoPlazo) => ({
        id: item.id,
        description: item.description,
        programaId: item.programa?.id,
      })}
    />
  );
}

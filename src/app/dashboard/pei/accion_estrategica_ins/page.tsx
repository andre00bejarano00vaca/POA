// src/app/(main)/(pei)/accion-estrategica/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useAccionEstrategica } from "@/modules/pei/hooks/useAccionEstrategica";
import {
  accionEstrategicaColumns,
  accionEstrategicaFormFields,
} from "@/modules/pei/config/accionEstrategica.config";
import type { AccionEstrategica } from "@/modules/pei/types/accionEstrategica.types";

export default function AccionEstrategicaPage() {
  return (
    <GenericList<AccionEstrategica>
      title="Acciones Estratégicas Institucionales"
      useData={useAccionEstrategica}
      columns={accionEstrategicaColumns}
      formFields={accionEstrategicaFormFields}
      searchKeys={["description"]}
      searchPlaceholder="Buscar por descripción..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay acciones estratégicas registradas."
      createButtonText="Añadir Acción"
      mapItemToForm={(item: AccionEstrategica) => ({
        id: item.id,
        description: item.description,
        objetivoEstrategicoId: item.objetivoEstrategico?.id,
      })}
    />
  );
}

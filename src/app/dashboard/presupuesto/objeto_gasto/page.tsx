// src/app/(main)/(presupuesto)/objeto-gasto/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useObjetoGasto } from "@/modules/presupuesto/hooks/useObjetoGasto";
import {
  objetoGastoColumns,
  objetoGastoFormFields,
} from "@/modules/presupuesto/config/objetoGasto.config";
import type { ObjetoGasto } from "@/modules/presupuesto/types/objetoGasto.types";

export default function ObjetoGastoPage() {
  return (
    <GenericList<ObjetoGasto>
      title="Objetos de Gasto"
      useData={useObjetoGasto}
      columns={objetoGastoColumns}
      formFields={objetoGastoFormFields}
      searchKeys={["description"]}
      searchPlaceholder="Buscar por descripción..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay objetos de gasto registrados."
      createButtonText="Añadir Objeto de Gasto"
      // mapItemToForm para transformar relaciones objeto → ID
      mapItemToForm={(item: ObjetoGasto) => ({
        // Campos normales se copian tal cual
        id: item.id,
        description: item.description,
        importeDouble: item.importeDouble,

        // Transformar relaciones objeto → ID (getByIdFn carga labels)
        entidadTransferenciaIdEtId: item.entidadTransferenciaIdEt?.id,
        organismoIdOrgId: item.organismoIdOrg?.id,
      })}
    />
  );
}

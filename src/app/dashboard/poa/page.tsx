// src/app/dashboard/poa/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { usePoa } from "@/modules/poa/hooks/usePoa";
import { poaColumns, poaFormFields } from "@/modules/poa/config/poa.config";
import { toInputDate } from "@/shared/utils/date.utils";
import type { Poa } from "@/modules/poa/types/poa.types";

export default function PoaPage() {
  return (
    <GenericList<Poa>
      title="Plan Operativo Anual (POA)"
      useData={usePoa}
      columns={poaColumns}
      formFields={poaFormFields}
      searchKeys={["anio"]}
      searchPlaceholder="Buscar por año..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay POAs registrados."
      createButtonText="Añadir POA"
      mapItemToForm={(item: Poa) => ({
        id: item.id,
        anio: item.anio,
        // ✅ Convertir ISO a formato YYYY-MM-DD para el input
        fechaRegistro: toInputDate(item.fechaRegistro),
        unidadEjecutoraId: item.unidadEjecutora?.id,
      })}
    />
  );
}

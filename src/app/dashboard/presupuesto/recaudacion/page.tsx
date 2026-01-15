// src/app/(main)/(presupuesto)/recaudacion/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useRecaudacion } from "@/modules/presupuesto/hooks/useRecaudacion";
import {
  recaudacionColumns,
  recaudacionFormFields,
} from "@/modules/presupuesto/config/recaudacion.config";
import type { Recaudacion } from "@/modules/presupuesto/types/recaudacion.types";

export default function RecaudacionPage() {
  return (
    <GenericList<Recaudacion>
      title="Recaudaciones"
      useData={useRecaudacion}
      columns={recaudacionColumns}
      formFields={recaudacionFormFields}
      searchKeys={["codOec", "description"]}
      searchPlaceholder="Buscar por código OEC o descripción..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay recaudaciones registradas."
      createButtonText="Añadir Recaudación"
      mapItemToForm={(item: Recaudacion) => ({
        // Campos normales se copian tal cual
        id: item.id,
        codOec: item.codOec,
        description: item.description,
        nBienes: item.nBienes,
        costoUServicio: item.costoUServicio,
        totalDouble: item.totalDouble,
        idRubroId: item.idRubro?.id,
      })}
    />
  );
}

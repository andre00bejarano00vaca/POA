"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useEntidadTransferencia } from "@/modules/presupuesto/hooks/useEntidadTransferencia";
import {
  entidadTransferenciaColumns,
  entidadTransferenciaFormFields,
} from "@/modules/presupuesto/config/entidadTransferencia.config";
import type { EntidadTransferencia } from "@/modules/presupuesto/types/entidadTransferencia.types";

export default function EntidadTransferenciaPage() {
  return (
    <GenericList<EntidadTransferencia>
      title="Entidades de Transferencia"
      useData={useEntidadTransferencia}
      columns={entidadTransferenciaColumns}
      formFields={entidadTransferenciaFormFields}
      searchKeys={["codigo", "description"]}
      searchPlaceholder="Buscar por código o descripción..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay entidades de transferencia registradas."
      createButtonText="Añadir Entidad"
      // ✅ ANTES lo ibas a meter en GenericList. Ahora va aquí.
      mapItemToForm={(item: any) => ({
        rubroIdRubroId: item.rubro?.id,
        rubroLabel: item.rubro?.description,
      })}
    />
  );
}

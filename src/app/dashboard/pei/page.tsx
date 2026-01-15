"use client";

import GenericList from "@/shared/components/common/GenericList";
import { usePei, peiColumns, peiFormFields } from "@/modules/pei";

export default function PeiPage() {
  return (
    <GenericList
      title="Plan Estratégico Institucional (PEI)"
      useData={usePei}
      columns={peiColumns}
      formFields={peiFormFields}
      searchKeys={["anioIni", "anioFin", "observacion"]}
      searchPlaceholder="Buscar por año inicial, año final u observaciones..."
      createButtonText="Añadir Nuevo PEI"
      emptyMessage="No se encontraron Planes Estratégicos Institucionales."
      idKey="id"
      enableCreate={true}
      enableEdit={true}
      enableDelete={true}
    />
  );
}

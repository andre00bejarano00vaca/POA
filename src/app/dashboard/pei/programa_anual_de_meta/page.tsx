// import FormProgramaAnualMeta from "@/modules/pei/components/FormProgramaAnualMeta";
// import React from "react";

// const page = () => {
//   return <FormProgramaAnualMeta />;
// };

// export default page;

// src/app/programacion-meta-anual/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useProgramacionMetaAnual } from "@/modules/pei/hooks/useProgramacionMetaAnual";
import {
  programacionMetaAnualColumns,
  programacionMetaAnualFormFields,
} from "@/modules/pei/config/programacionMetaAnual.config";
import type { ProgramacionMetaAnual } from "@/modules/pei/types/programacionMetaAnual.types";

export default function ProgramacionMetaAnualPage() {
  return (
    <GenericList<ProgramacionMetaAnual>
      title="Programación de Metas Anuales"
      useData={useProgramacionMetaAnual}
      columns={programacionMetaAnualColumns}
      formFields={programacionMetaAnualFormFields}
      searchKeys={["anio"]}
      searchPlaceholder="Buscar por año..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay programaciones de metas anuales registradas."
      createButtonText="Añadir Programación"
      mapItemToForm={(item: ProgramacionMetaAnual) => ({
        id: item.id,
        anio: item.anio,
        programado: item.programado,
        ejecutado: item.ejecutado,
        idIndicadorPeiImpId: item.idIndicadorPeiImp?.id,
        peiIdPeiId: item.peiIdPei?.id,
      })}
    />
  );
}

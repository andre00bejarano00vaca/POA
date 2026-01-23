// import ProgramacionTrimestralMetaForm from "@/modules/poa/components/ProgramacionTrimestralMetaForm";
// import React from "react";

// const page = () => {
//   const indicadores = [
//     { id: 10, descripcion: "Número de beneficiarios atendidos" },
//     { id: 11, descripcion: "Porcentaje de cumplimiento" },
//   ];
//   return <ProgramacionTrimestralMetaForm indicadores={indicadores} />;
// };

// export default page;

// src/app/dashboard/poa/programacacion_trimestral_meta/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useProgramacionTrimestralMeta } from "@/modules/poa";
import {
  programacionTrimestralMetaColumns,
  programacionTrimestralMetaFormFields,
} from "@/modules/poa";
import type { ProgramacionTrimestralMeta } from "@/modules/poa";

export default function ProgramacionTrimestralMetaPage() {
  return (
    <GenericList<ProgramacionTrimestralMeta>
      title="Programación Trimestral de Metas POA"
      useData={useProgramacionTrimestralMeta}
      columns={programacionTrimestralMetaColumns}
      formFields={programacionTrimestralMetaFormFields}
      searchKeys={["trimestre"]}
      searchPlaceholder="Buscar por trimestre (1-4)..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay programaciones trimestrales registradas."
      createButtonText="Añadir Programación"
      mapItemToForm={(item: ProgramacionTrimestralMeta) => ({
        id: item.id,
        trimestre: item.trimestre,
        programado: item.programado,
        ejecutado: item.ejecutado,
        indicadorPoaId: item.indicadorPoa?.id,
      })}
    />
  );
}

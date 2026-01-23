// import ProgramaPOAForm from "@/modules/poa/components/ProgramaPOAForm";
// import React from "react";

// const page = () => {
//   return <ProgramaPOAForm />;
// };

// export default page;

// src/app/dashboard/poa/programa_Poa/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { usePrograma } from "@/modules/poa";
import { programaColumns, programaFormFields } from "@/modules/poa";
import type { Programa } from "@/modules/poa";

export default function ProgramaPoaPage() {
  return (
    <GenericList<Programa>
      title="Programas POA"
      useData={usePrograma}
      columns={programaColumns}
      formFields={programaFormFields}
      searchKeys={["description"]}
      searchPlaceholder="Buscar por descripción..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay programas registrados."
      createButtonText="Añadir Programa"
      mapItemToForm={(item: Programa) => ({
        id: item.id,
        description: item.description,
        poaId: item.poa?.id,
      })}
    />
  );
}

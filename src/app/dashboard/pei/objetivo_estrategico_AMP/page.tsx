// import ObjetivoEstrategicoAMPForm from "@/modules/pei/components/ObjetivoEstrategicoAMPForm";
// import React from "react";

// const page = () => {
//   return <ObjetivoEstrategicoAMPForm />;
// };

// export default page;

// src/app/(main)/(pei)/objetivo-estrategico/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useObjetivoEstrategico } from "@/modules/pei/hooks/useObjetivoEstrategico";
import {
  objetivoEstrategicoColumns,
  objetivoEstrategicoFormFields,
} from "@/modules/pei/config/objetivoEstrategico.config";
import type { ObjetivoEstrategico } from "@/modules/pei/types/objetivoEstrategico.types";

export default function ObjetivoEstrategicoPage() {
  return (
    <GenericList<ObjetivoEstrategico>
      title="Objetivos Estratégicos"
      useData={useObjetivoEstrategico}
      columns={objetivoEstrategicoColumns}
      formFields={objetivoEstrategicoFormFields}
      searchKeys={["idOe", "description"]}
      searchPlaceholder="Buscar por ID OE o descripción..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay objetivos estratégicos registrados."
      createButtonText="Añadir Objetivo"
      mapItemToForm={(item: ObjetivoEstrategico) => ({
        id: item.id,
        idOe: item.idOe,
        description: item.description,
        politicaDesarrolloId: item.politicaDesarrollo?.id,
      })}
    />
  );
}

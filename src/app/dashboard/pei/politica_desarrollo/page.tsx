// import PoliticaForm from "@/modules/pei/components/PoliticaForm";
// import React from "react";

// const page = () => {
//   return <PoliticaForm />;
// };

// export default page;
// src/app/(main)/(pei)/politica-desarrollo/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { usePoliticaDesarrollo } from "@/modules/pei/hooks/usePoliticaDesarrollo";
import {
  politicaDesarrolloColumns,
  politicaDesarrolloFormFields,
} from "@/modules/pei/config/politicaDesarrollo.config";
import type { PoliticaDesarrollo } from "@/modules/pei/types/politicaDesarrollo.types";

export default function PoliticaDesarrolloPage() {
  return (
    <GenericList<PoliticaDesarrollo>
      title="Políticas de Desarrollo"
      useData={usePoliticaDesarrollo}
      columns={politicaDesarrolloColumns}
      formFields={politicaDesarrolloFormFields}
      searchKeys={["idPd", "description"]}
      searchPlaceholder="Buscar por ID PD o descripción..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay políticas de desarrollo registradas."
      createButtonText="Añadir Política"
      // ✅ mapItemToForm para transformar areaEstrategica (objeto) → areaEstrategicaId (number)
      mapItemToForm={(item: PoliticaDesarrollo) => ({
        // Campos normales se copian tal cual
        id: item.id,
        idPd: item.idPd,
        description: item.description,

        // ✅ Transformar relación objeto → ID (getByIdFn carga el label)
        areaEstrategicaId: item.areaEstrategica?.id,
      })}
    />
  );
}

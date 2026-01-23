// import IndicadorPOAForm from "@/modules/poa/components/IndicadorPOAForm";
// import React from "react";

// const page = () => {
//   const actividades = [
//     { id: 1, descripcion: "Taller de capacitación" },
//     { id: 2, descripcion: "Campaña educativa" },
//   ];
//   return <IndicadorPOAForm actividades={actividades} />;
// };

// export default page;

// src/app/dashboard/poa/indicador_poa/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useIndicadorPoa } from "@/modules/poa";
import { indicadorPoaColumns, indicadorPoaFormFields } from "@/modules/poa";
import type { IndicadorPoa } from "@/modules/poa";

export default function IndicadorPoaPage() {
  return (
    <GenericList<IndicadorPoa>
      title="Indicadores POA"
      useData={useIndicadorPoa}
      columns={indicadorPoaColumns}
      formFields={indicadorPoaFormFields}
      searchKeys={["description", "formula"]}
      searchPlaceholder="Buscar por descripción o fórmula..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay indicadores POA registrados."
      createButtonText="Añadir Indicador"
      mapItemToForm={(item: IndicadorPoa) => ({
        id: item.id,
        description: item.description,
        formula: item.formula,
        lineaBase: item.lineaBase,
        meta: item.meta,
        unidadMedida: item.unidadMedida,
        actividadId: item.actividad?.id,
      })}
    />
  );
}

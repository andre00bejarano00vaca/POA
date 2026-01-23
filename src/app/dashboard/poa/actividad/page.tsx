// import ActividadForm from "@/modules/poa/components/ActividadForm";
// import React from "react";

// const page = () => {
//   return <ActividadForm />;
// };

// export default page;

// src/app/dashboard/poa/actividad/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useActividad } from "@/modules/poa";
import { actividadColumns, actividadFormFields } from "@/modules/poa";
import { toInputDate } from "@/shared/utils/date.utils";
import type { Actividad } from "@/modules/poa";

export default function ActividadPage() {
  return (
    <GenericList<Actividad>
      title="Actividades POA"
      useData={useActividad}
      columns={actividadColumns}
      formFields={actividadFormFields}
      searchKeys={["description", "tipo"]}
      searchPlaceholder="Buscar por descripción o tipo..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay actividades registradas."
      createButtonText="Añadir Actividad"
      mapItemToForm={(item: Actividad) => ({
        id: item.id,
        description: item.description,
        tipo: item.tipo,
        clase: item.clase,
        categProgramatica: item.categProgramatica,
        fechaIni: toInputDate(item.fechaIni),
        fechaFinal: toInputDate(item.fechaFinal),
        docVerif: item.docVerif,
        causasDesv: item.causasDesv,
        accionCortoPlazoId: item.accionCortoPlazo?.id,
      })}
    />
  );
}

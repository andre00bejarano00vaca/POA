// src/app/(main)/(presupuesto)/rubro/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useRubro } from "@/modules/presupuesto/hooks/useRubro";
import {
  rubroColumns,
  rubroFormFields,
} from "@/modules/presupuesto/config/rubro.config";

export default function RubroPage() {
  return (
    <GenericList
      title="Rubros"
      useData={useRubro}
      columns={rubroColumns}
      formFields={rubroFormFields}
      searchKeys={["description", "importeDouble"]}
      searchPlaceholder="Buscar por descripción o importe..."
      enableCreate={true}
      enableEdit={true}
      enableDelete={true}
      emptyMessage="No hay rubros registrados."
      createButtonText="Añadir Nuevo Rubro"
    />
  );
}

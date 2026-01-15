// src/app/(main)/(presupuesto)/fuente/page.tsx
"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useFuente } from "@/modules/presupuesto/hooks/useFuente";
import {
  fuenteColumns,
  fuenteFormFields,
} from "@/modules/presupuesto/config/fuente.config";
import type { Fuente } from "@/modules/presupuesto/types/fuente.types";

export default function FuentePage() {
  return (
    <GenericList<Fuente>
      title="Fuentes de Financiamiento"
      useData={useFuente}
      columns={fuenteColumns}
      formFields={fuenteFormFields}
      searchKeys={["codigo", "description"]}
      searchPlaceholder="Buscar por código o descripción..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay fuentes de financiamiento registradas."
      createButtonText="Añadir Nueva Fuente"
    />
  );
}

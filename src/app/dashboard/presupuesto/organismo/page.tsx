// src/app/(main)/(presupuesto)/organismo/page.tsx
"use client";

import { useState } from "react";
import GenericList from "@/shared/components/common/GenericList";
import { useOrganismo } from "@/modules/presupuesto/hooks/useOrganismo";
import {
  organismoColumns,
  organismoFormFields,
} from "@/modules/presupuesto/config/organismo.config";
import GestionarFuentesOrganismo from "@/modules/presupuesto/components/GestionarFuentesOrganismo";
import type { Organismo } from "@/modules/presupuesto/types/organismo.types";

export default function OrganismoPage() {
  const [organismoSeleccionado, setOrganismoSeleccionado] =
    useState<Organismo | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const columnasConAcciones = [
    ...organismoColumns,
    {
      key: "acciones_fuentes" as any,
      header: "Fuentes",
      className: "text-center w-32",
      render: (organismo: Organismo) => (
        <button
          onClick={() => setOrganismoSeleccionado(organismo)}
          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          title="Gestionar fuentes"
        >
          Gestionar
        </button>
      ),
    },
  ];

  const handleCloseModal = () => {
    setOrganismoSeleccionado(null);
  };

  const handleUpdateFuentes = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <GenericList
        key={refreshKey}
        title="Organismos Financiadores"
        useData={useOrganismo}
        columns={columnasConAcciones}
        formFields={organismoFormFields}
        searchKeys={["codigo", "description"]}
        searchPlaceholder="Buscar por código o descripción..."
        enableCreate={true}
        enableEdit={true}
        enableDelete={true}
        emptyMessage="No hay organismos financiadores registrados."
        createButtonText="Añadir Nuevo Organismo"
      />

      {organismoSeleccionado && (
        <GestionarFuentesOrganismo
          organismoId={organismoSeleccionado.id}
          fuentesActuales={organismoSeleccionado.fuentes}
          onClose={handleCloseModal}
          onUpdate={() => {
            handleUpdateFuentes();
            handleCloseModal();
          }}
        />
      )}
    </>
  );
}

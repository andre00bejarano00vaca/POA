// import React from "react";
// import FormSeguimientoPOATrimestral from "@/modules/poa/components/FormSeguimientoPOATrimestral";
// const page = () => {
//   return <FormSeguimientoPOATrimestral />;
// };

// export default page;

// src/app/seguimiento-poa/page.tsx
"use client";

import { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import GenericList from "@/shared/components/common/GenericList";
import { useSeguimientoPoa } from "@/modules/poa/hooks/useSeguimientoPoa";
import {
  seguimientoPoaColumns,
  seguimientoPoaFormFields,
} from "@/modules/poa/config/seguimientoPoa.config";
import type { SeguimientoPoa } from "@/modules/poa/types/seguimientoPoa.types";

// Componente de detalle
import SeguimientoPoaDetalle from "@/modules/poa/components/seguimientoPoaDetalle";

export default function SeguimientoPoaPage() {
  const [selectedSeguimientoId, setSelectedSeguimientoId] = useState<
    number | null
  >(null);
  const [showDetalle, setShowDetalle] = useState(false);

  const handleViewDetalle = (seguimiento: SeguimientoPoa) => {
    setSelectedSeguimientoId(seguimiento.id);
    setShowDetalle(true);
  };

  const handleBackToList = () => {
    setShowDetalle(false);
    setSelectedSeguimientoId(null);
  };

  // Si estamos en vista detalle, mostrar el componente detalle
  if (showDetalle && selectedSeguimientoId) {
    return (
      <SeguimientoPoaDetalle
        seguimientoId={selectedSeguimientoId}
        onBack={handleBackToList}
      />
    );
  }

  // Agregar columna de acciones personalizadas para "Ver Actividades e Indicadores"
  const columnsWithCustomActions = [
    ...seguimientoPoaColumns,
    {
      key: "custom_actions" as keyof SeguimientoPoa,
      header: "Ver Detalle",
      className: "text-center w-32",
      render: (item: SeguimientoPoa) => (
        <div className="flex justify-center">
          <button
            onClick={() => handleViewDetalle(item)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
            title="Ver Actividades e Indicadores"
            aria-label="Ver actividades e indicadores"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <GenericList<SeguimientoPoa>
      title="Seguimiento POA"
      icon="📊"
      useData={useSeguimientoPoa}
      columns={columnsWithCustomActions}
      formFields={seguimientoPoaFormFields}
      searchKeys={["trimestre", "valoracionGlobal"]}
      searchPlaceholder="Buscar por trimestre o valoración..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay seguimientos POA registrados."
      createButtonText="Nuevo Seguimiento POA"
      mapItemToForm={(item: SeguimientoPoa) => ({
        id: item.id,
        trimestre: item.trimestre,
        fechaRegistro: item.fechaRegistro
          ? new Date(item.fechaRegistro).toISOString().split("T")[0]
          : "",
        observaciones: item.observaciones,
        poaId: item.poa?.id,
      })}
    />
  );
}

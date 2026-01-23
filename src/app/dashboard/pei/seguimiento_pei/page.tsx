// src/app/seguimiento-pei/page.tsx
"use client";

import { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import GenericList from "@/shared/components/common/GenericList";
import { useSeguimientoPei } from "@/modules/pei/hooks/useSeguimientoPei";
import {
  seguimientoPeiColumns,
  seguimientoPeiFormFields,
} from "@/modules/pei/config/seguimientoPei.config";
import type { SeguimientoPei } from "@/modules/pei/types/seguimientoPei.types";

// Componente de detalle
import SeguimientoPeiDetalle from "@/modules/pei/components/seguimientoPeiDetalle";

export default function SeguimientoPeiPage() {
  const [selectedSeguimientoId, setSelectedSeguimientoId] = useState<
    number | null
  >(null);
  const [showDetalle, setShowDetalle] = useState(false);

  const handleViewDetalle = (seguimiento: SeguimientoPei) => {
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
      <SeguimientoPeiDetalle
        seguimientoId={selectedSeguimientoId}
        onBack={handleBackToList}
      />
    );
  }

  // Agregar columna de acciones personalizadas para "Ver Objetivos e Indicadores"
  const columnsWithCustomActions = [
    ...seguimientoPeiColumns,
    {
      key: "custom_actions" as keyof SeguimientoPei,
      header: "Ver Detalle",
      className: "text-center w-32",
      render: (item: SeguimientoPei) => (
        <div className="flex justify-center">
          <button
            onClick={() => handleViewDetalle(item)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
            title="Ver Objetivos e Indicadores"
            aria-label="Ver objetivos e indicadores"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <GenericList<SeguimientoPei>
      title="Seguimiento PEI"
      icon="📊"
      useData={useSeguimientoPei}
      columns={columnsWithCustomActions}
      formFields={seguimientoPeiFormFields}
      searchKeys={["ano", "valoracion_global"]}
      searchPlaceholder="Buscar por año o valoración..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay seguimientos PEI registrados."
      createButtonText="Nuevo Seguimiento PEI"
      mapItemToForm={(item: SeguimientoPei) => ({
        id: item.id,
        ano: item.ano,
        fecha_registro: item.fecha_registro
          ? new Date(item.fecha_registro).toISOString().split("T")[0]
          : "",
        promedio_general: item.promedio_general,
        valoracion_global: item.valoracion_global,
        observaciones: item.observaciones,
        porc_alta: item.porc_alta,
        porc_media: item.porc_media,
        porc_baja: item.porc_baja,
        pei_id_pei: item.pei?.id,
      })}
    />
  );
}

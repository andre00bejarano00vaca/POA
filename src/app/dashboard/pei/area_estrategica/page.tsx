"use client";
import GenericList from "@/shared/components/common/GenericList";
import { useArea, areaColumns, areaFormFields } from "@/modules/pei";
import type { AreaEstrategica } from "@/modules/pei";

export default function AreaEstrategicaPage() {
  return (
    <GenericList<AreaEstrategica>
      title="Áreas Estratégicas"
      useData={useArea}
      columns={areaColumns}
      formFields={areaFormFields}
      searchKeys={["description", "pei"]}
      searchPlaceholder="Buscar por descripción o ID de PEI..."
      createButtonText="Añadir Nueva Área Estratégica"
      emptyMessage="No se encontraron áreas estratégicas."
      idKey="id"
      enableCreate
      enableEdit
      enableDelete
      mapItemToForm={(item: AreaEstrategica) => ({
        description: item.description,
        peiId: item.pei?.id, // ✅ SOLO el ID, sin label
      })}
    />
  );
}

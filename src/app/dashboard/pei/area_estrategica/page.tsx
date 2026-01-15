"use client";
import GenericList from "@/shared/components/common/GenericList";
import { useArea, areaColumns, areaFormFields } from "@/modules/pei";
import type { AreaEstrategica } from "@/modules/pei";

const extractYear = (dateString: string): string => {
  try {
    if (/^\d{4}$/.test(dateString)) {
      return dateString;
    }
    const yearMatch = dateString.match(/^(\d{4})/);
    if (yearMatch) {
      return yearMatch[1];
    }
    return dateString;
  } catch (error) {
    return dateString;
  }
};

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
        peiId: item.pei?.id,
        _peiLabel: item.pei
          ? `PEI ${extractYear(item.pei.anioIni)} - ${extractYear(
              item.pei.anioFin
            )}`
          : undefined,
      })}
    />
  );
}

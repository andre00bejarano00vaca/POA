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
      mapItemToForm={(item: PoliticaDesarrollo) => {
        console.log("Debug - areaId:", item.areaEstrategica?.id); // Ver qué llega

        return {
          id: item.id,
          idPd: item.idPd,
          description: item.description,
          areaEstrategicaId: item.areaEstrategica?.id, // SOLO el ID
        };
      }}
    />
  );
}

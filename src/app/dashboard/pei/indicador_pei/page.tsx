"use client";

import GenericList from "@/shared/components/common/GenericList";
import { useIndicadorPei } from "@/modules/pei";
import { indicadorPeiColumns, indicadorPeiFormFields } from "@/modules/pei";
import type { IndicadorPei } from "@/modules/pei";

export default function IndicadorPeiPage() {
  return (
    <GenericList<IndicadorPei>
      title="Indicadores PEI"
      useData={useIndicadorPei}
      columns={indicadorPeiColumns}
      formFields={indicadorPeiFormFields}
      searchKeys={["description", "formula"]}
      searchPlaceholder="Buscar por descripción o fórmula..."
      enableCreate
      enableEdit
      enableDelete
      emptyMessage="No hay indicadores PEI registrados."
      createButtonText="Añadir Indicador"
      mapItemToForm={(item: IndicadorPei) => {
        console.log("INDICADOR ITEM COMPLETO:", item);
        console.log("OBJETIVO ESTRATEGICO:", item.objetivoEstrategico);
        console.log("OBJETIVO ESTRATEGICO ID:", item.objetivoEstrategico?.id);

        return {
          id: item.id,
          description: item.description,
          formula: item.formula,
          lineaBase: item.lineaBase,
          meta: item.meta,
          unidadMedida: item.unidadMedida,

          // ✅ evita undefined al form si no viene id
          objetivoEstrategicoId: item.objetivoEstrategico?.id ?? "",
        };
      }}
    />
  );
}

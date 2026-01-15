import ProgramacionTrimestralMetaForm from "@/modules/poa/components/ProgramacionTrimestralMetaForm";
import React from "react";

const page = () => {
  const indicadores = [
    { id: 10, descripcion: "Número de beneficiarios atendidos" },
    { id: 11, descripcion: "Porcentaje de cumplimiento" },
  ];
  return <ProgramacionTrimestralMetaForm indicadores={indicadores} />;
};

export default page;

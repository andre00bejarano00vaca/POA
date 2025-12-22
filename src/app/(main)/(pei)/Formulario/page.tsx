import DetalleFormRetro from '@/components/pei/DetalleForm'
import SelectDAUERetro from '@/components/pei/SelectDAUE'
import SelectObjetivosRetro from '@/components/pei/SelectObjetivos'
import React from 'react'
import DetalleTablaRetro from "@/components/pei/DetalleTablaRetro";

const dataEjemplo = [
  {
    codigoEstrategico: "102.101",
    codigoGestion: "02",
    accionMedianoPlazo: "Desarrollar programas de Formación Profesional",
    accionCortoPlazo: "Mejorar el desempeño de las actividades académicas en la formación de los estudiantes.",
    indicador: "71/N° Sistema de seguimiento de Graduados",
    descripcion: "Ejecución del pago de la deuda pública de la Facultad Integral del Chaco.",
    unidadMedida: "Porcentaje de ejecución presupuestaria",
    tipo: "Ingreso",
    clase: "Funcionamiento",
    trim1: 1,
    trim2: 0,
    trim3: 2,
    trim4: 1,
    total: 4,
    fechaInicio: "01/10/2025",
    fechaConclusion: "24/10/2025",
  },
];

const page = () => {
  return (
    <div>
      <SelectObjetivosRetro/>
      <DetalleFormRetro/>
      <DetalleTablaRetro data={dataEjemplo} />

    </div>
  )
}

export default page
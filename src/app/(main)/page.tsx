import AREAForm from "@/components/AREAForm";
import DetalleForm from "@/components/DetalleForm";
import FormAccionEstrategica from "@/components/FormAccionEstrategica";
import FormIndicadorPEI from "@/components/FormIndicadorPEI";
import FormMatrizPEI from "@/components/FormMatrizPEI";
import FormProgramaAnualMeta from "@/components/FormProgramaAnualMeta";
import PEIListGeneric from "@/components/listas/pei/PEIListGeneric";
import Matrizpi from "@/components/Matriz/Matrizpi";
import ObjetivoEstrategicoAMPForm from "@/components/ObjetivoEstrategicoAMPForm";
import PEIForm from "@/components/PeiForm";
import ActividadForm from "@/components/poa/ActividadForm";
import BecaEstudioForm from "@/components/poa/BecaEstudioForm";
import FormBecaEstudio from "@/components/poa/FormBecaEstudio";
import FormGenerator from "@/components/poa/FormGenerator";
import FormSeguimientoPOATrimestral from "@/components/poa/FormSeguimientoPOATrimestral";
import FormSeguimientoPOATrimestralDet from "@/components/poa/FormSeguimientoPOATrimestralDet";
import IndicadorPOAForm from "@/components/poa/IndicadorPOAForm";
import ObjetivoInstitucionalACPForm from "@/components/poa/ObjetivoInstitucionalACPForm";
import ObjetoGastoForm from "@/components/poa/ObjetoGastoForm";
import PresupuestoDetalleGastosForm from "@/components/poa/PresupuestoDetalleGastosForm";
import PresupuestoForm from "@/components/poa/PresupuestoForm";
import ProductoForm from "@/components/poa/ProductoForm";
import ProgramacionTrimestralMetaForm from "@/components/poa/ProgramacionTrimestralMetaForm";
import ProgramaPOAForm from "@/components/poa/ProgramaPOAForm";
import PoliticaForm from "@/components/PoliticaForm";
import ProductoInstitucionalForm from "@/components/ProductoInstitucionalForm";
import SelectDAUE from "@/components/SelectDAUE";
import SelectObjetivos from "@/components/SelectObjetivos";
import Image from "next/image";
const data = [
  {
    areaEstrategica: "Desarrollo Social",
    politicaDesarrollo: "Mejorar la calidad de vida",
    objetivoEstrategico: "Reducir brechas sociales",
    productoInstitucional: "Capacitaciones",
    accionEstrategica: "Talleres comunitarios",
    indicadoresPEI: "Número de beneficiarios",
    programacionAnualMetas: "500 personas/año",
    programacion: "Enero - Diciembre",
    unidadesInvolucradas: "Unidad Social, RRHH",
  },
];

export default function Home() {
  const indicadores = [
  { "id": 10, "descripcion": "Número de beneficiarios atendidos" },
  { "id": 11, "descripcion": "Porcentaje de cumplimiento" }
];
  const actividades =  [
  { "id": 1, "descripcion": "Taller de capacitación" },
  { "id": 2, "descripcion": "Campaña educativa" }
]


  return (
    <div className="flex min-h-screen bg-black font-sans">
      <main className="flex min-h-screen w-full  bg-white sm:items-start">
        <Matrizpi />
      </main>
    </div>
  );
}

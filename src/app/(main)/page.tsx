import AREAForm from "@/components/pei/AREAForm";
import DetalleForm from "@/components/pei/DetalleForm";
import FormAccionEstrategica from "@/components/pei/FormAccionEstrategica";
import FormIndicadorPEI from "@/components/pei/FormIndicadorPEI";
import FormMatrizPEI from "@/components/pei/FormMatrizPEI";
import FormProgramaAnualMeta from "@/components/pei/FormProgramaAnualMeta";
import PEIListGeneric from "@/components/listas/pei/PEIListGeneric";
import Matrizpi from "@/components/Matriz/Matrizpi";
import ObjetivoEstrategicoAMPForm from "@/components/pei/ObjetivoEstrategicoAMPForm";
import PEIForm from "@/components/pei/PeiForm";
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
import PoliticaForm from "@/components/pei/PoliticaForm";
import ProductoInstitucionalForm from "@/components/pei/ProductoInstitucionalForm";
import SelectDAUE from "@/components/pei/SelectDAUE";
import SelectObjetivos from "@/components/pei/SelectObjetivos";
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


  return (
    <div className="flex min-h-screen bg-black font-sans">
      <main className="flex min-h-screen w-full  bg-white sm:items-start">
        <Matrizpi />
      </main>
    </div>
  );
}

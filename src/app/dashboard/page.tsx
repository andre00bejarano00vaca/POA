import AREAForm from "@/modules/pei/components/AREAForm";
import DetalleForm from "@/modules/pei/components/DetalleForm";
import FormAccionEstrategica from "@/modules/pei/components/FormAccionEstrategica";
import FormIndicadorPEI from "@/modules/pei/components/FormIndicadorPEI";
import FormMatrizPEI from "@/modules/pei/components/FormMatrizPEI";
import FormProgramaAnualMeta from "@/modules/pei/components/FormProgramaAnualMeta";
import PEIListGeneric from "@/shared/components/listas/pei/PEIListGeneric";
import Matrizpi from "@/modules/pei/components/Matriz/Matrizpi";
import ObjetivoEstrategicoAMPForm from "@/modules/pei/components/ObjetivoEstrategicoAMPForm";
import ActividadForm from "@/modules/poa/components/ActividadForm";
import BecaEstudioForm from "@/modules/presupuesto/components/BecaEstudioForm";
import FormBecaEstudio from "@/modules/presupuesto/components/FormBecaEstudio";
import FormGenerator from "@/modules/presupuesto/components/FormGenerator";
import FormSeguimientoPOATrimestral from "@/modules/poa/components/FormSeguimientoPOATrimestral";
import FormSeguimientoPOATrimestralDet from "@/modules/poa/components/FormSeguimientoPOATrimestralDet";
import IndicadorPOAForm from "@/modules/poa/components/IndicadorPOAForm";
import ObjetivoInstitucionalACPForm from "@/modules/poa/components/ObjetivoInstitucionalACPForm";
import ObjetoGastoForm from "@/modules/presupuesto/components/ObjetoGastoForm";
import PresupuestoDetalleGastosForm from "@/modules/presupuesto/components/PresupuestoDetalleGastosForm";
import PresupuestoForm from "@/modules/poa/components/PresupuestoForm";
import ProductoForm from "@/modules/poa/components/ProductoForm";
import ProgramacionTrimestralMetaForm from "@/modules/poa/components/ProgramacionTrimestralMetaForm";
import ProgramaPOAForm from "@/modules/poa/components/ProgramaPOAForm";
import PoliticaForm from "@/modules/pei/components/PoliticaForm";
import ProductoInstitucionalForm from "@/modules/pei/components/ProductoInstitucionalForm";
import SelectDAUE from "@/modules/pei/components/SelectDAUE";
import SelectObjetivos from "@/modules/pei/components/SelectObjetivos";
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

// // src/modules/seguimiento/components/SeguimientoPeiDetalle.tsx
// "use client";

// import { useState, useEffect } from "react";
// import Button from "@/shared/components/common/Button";
// import Alert from "@/shared/components/common/Alert";
// import { useAlert } from "@/shared/hooks/useAlert";
// import {
//   ArrowLeft,
//   RefreshCw,
//   Save,
//   X,
//   Edit2,
//   ChevronDown,
//   ChevronRight,
//   TrendingUp,
//   Target,
//   BarChart3,
// } from "lucide-react";

// import type {
//   SeguimientoPei,
//   SeguimientoPeiObjetivo,
//   SeguimientoPeiIndicador,
// } from "../types/seguimientoPei.types";

// // Servicios
// import { SeguimientoPeiService } from "../services/seguimientoPei.service";
// import { SeguimientoPeiObjetivoService } from "../services/seguimientoPeiObjetivo.service";
// import { SeguimientoPeiIndicadorService } from "../services/seguimientoPeiIndicador.service";

// interface Props {
//   seguimientoId: number;
//   onBack: () => void;
// }

// interface ObjetivoConIndicadores extends SeguimientoPeiObjetivo {
//   indicadores: SeguimientoPeiIndicador[];
//   expanded: boolean;
// }

// export default function SeguimientoPeiDetalle({
//   seguimientoId,
//   onBack,
// }: Props) {
//   const [loading, setLoading] = useState(true);
//   const [syncing, setSyncing] = useState(false);
//   const [seguimiento, setSeguimiento] = useState<SeguimientoPei | null>(null);
//   const [objetivos, setObjetivos] = useState<ObjetivoConIndicadores[]>([]);

//   // Estado de edición
//   const [editingIndicadorId, setEditingIndicadorId] = useState<number | null>(
//     null,
//   );
//   const [editEjecutado, setEditEjecutado] = useState("");
//   const [editComentarios, setEditComentarios] = useState("");
//   const [saving, setSaving] = useState(false);

//   const { isOpen, alertConfig, showAlert, hideAlert } = useAlert();

//   useEffect(() => {
//     loadData();
//   }, [seguimientoId]);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       // 1. Cargar seguimiento
//       const seguimientoData =
//         await SeguimientoPeiService.getById(seguimientoId);
//       setSeguimiento(seguimientoData);

//       // 2. Cargar objetivos
//       const objetivosData =
//         await SeguimientoPeiObjetivoService.getBySeguimientoId(seguimientoId);

//       // 3. Cargar indicadores para cada objetivo
//       const objetivosConIndicadores = await Promise.all(
//         objetivosData.map(async (objetivo) => {
//           const indicadores =
//             await SeguimientoPeiIndicadorService.getByObjetivoId(objetivo.id);
//           return {
//             ...objetivo,
//             indicadores,
//             expanded: true, // Expandir por defecto
//           };
//         }),
//       );

//       setObjetivos(objetivosConIndicadores);
//     } catch (error: any) {
//       showAlert({
//         type: "error",
//         title: "Error al cargar datos",
//         message: error.message || "No se pudo cargar el seguimiento PEI",
//         confirmText: "Aceptar",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSync = async () => {
//     if (!seguimiento) return;

//     setSyncing(true);
//     try {
//       const syncedData = await SeguimientoPeiService.sync(seguimiento.id);
//       setSeguimiento(syncedData);

//       // Recargar todo
//       await loadData();

//       showAlert({
//         type: "success",
//         title: "Sincronización exitosa",
//         message: "Los valores han sido recalculados correctamente",
//         confirmText: "Aceptar",
//       });
//     } catch (error: any) {
//       showAlert({
//         type: "error",
//         title: "Error al sincronizar",
//         message: error.message || "No se pudo sincronizar el seguimiento",
//         confirmText: "Aceptar",
//       });
//     } finally {
//       setSyncing(false);
//     }
//   };

//   const toggleObjetivo = (objetivoId: number) => {
//     setObjetivos((prev) =>
//       prev.map((obj) =>
//         obj.id === objetivoId ? { ...obj, expanded: !obj.expanded } : obj,
//       ),
//     );
//   };

//   const handleEditStart = (indicador: SeguimientoPeiIndicador) => {
//     setEditingIndicadorId(indicador.id);
//     setEditEjecutado(indicador.ejecutado.toString());
//     setEditComentarios(indicador.comentarios || "");
//   };

//   const handleEditCancel = () => {
//     setEditingIndicadorId(null);
//     setEditEjecutado("");
//     setEditComentarios("");
//   };

//   // ✅ CORRECCIÓN: Usar actualizarEjecutado en lugar de update
//   const handleEditSave = async (indicador: SeguimientoPeiIndicador) => {
//     setSaving(true);
//     try {
//       // ✅ Usar el método correcto que llama a la mutation actualizar_ejecutado
//       const updatedIndicador =
//         await SeguimientoPeiIndicadorService.actualizarEjecutado(
//           indicador.id,
//           parseInt(editEjecutado),
//           editComentarios || undefined,
//         );

//       // Actualizar el indicador en el estado local
//       setObjetivos((prev) =>
//         prev.map((obj) => ({
//           ...obj,
//           indicadores: obj.indicadores.map((ind) =>
//             ind.id === indicador.id ? updatedIndicador : ind,
//           ),
//           // ✅ Actualizar también el promedio del objetivo desde la respuesta
//           promedio_cumplimiento:
//             updatedIndicador.seguimiento_pei_objetivo?.promedio_cumplimiento ??
//             obj.promedio_cumplimiento,
//           escala_valoracion:
//             updatedIndicador.seguimiento_pei_objetivo?.escala_valoracion ??
//             obj.escala_valoracion,
//           valoracion_cualitativa:
//             updatedIndicador.seguimiento_pei_objetivo?.valoracion_cualitativa ??
//             obj.valoracion_cualitativa,
//         })),
//       );

//       // ✅ Actualizar el seguimiento PEI desde la respuesta
//       if (
//         updatedIndicador.seguimiento_pei_objetivo?.seguimiento_pei &&
//         seguimiento
//       ) {
//         const seguimientoPeiActualizado =
//           updatedIndicador.seguimiento_pei_objetivo.seguimiento_pei;

//         setSeguimiento({
//           ...seguimiento,
//           promedio_general:
//             seguimientoPeiActualizado.promedio_general ??
//             seguimiento.promedio_general,
//           valoracion_global:
//             seguimientoPeiActualizado.valoracion_global ??
//             seguimiento.valoracion_global,
//           porc_alta:
//             seguimientoPeiActualizado.porc_alta ?? seguimiento.porc_alta,
//           porc_media:
//             seguimientoPeiActualizado.porc_media ?? seguimiento.porc_media,
//           porc_baja:
//             seguimientoPeiActualizado.porc_baja ?? seguimiento.porc_baja,
//         });
//       }

//       setEditingIndicadorId(null);
//       setEditEjecutado("");
//       setEditComentarios("");

//       showAlert({
//         type: "success",
//         title: "✅ Actualización exitosa",
//         message:
//           "El ejecutado ha sido actualizado y todos los valores han sido recalculados automáticamente",
//         confirmText: "Aceptar",
//       });
//     } catch (error: any) {
//       showAlert({
//         type: "error",
//         title: "Error al actualizar",
//         message: error.message || "No se pudo actualizar el indicador",
//         confirmText: "Aceptar",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getValoracionColor = (valoracion: string) => {
//     const val = valoracion.toUpperCase();
//     if (val.includes("EXCELENTE") || val.includes("SATISFACTORIO")) {
//       return "bg-green-100 text-green-800 border-green-300";
//     }
//     if (val.includes("BUENO") || val.includes("ACEPTABLE")) {
//       return "bg-blue-100 text-blue-800 border-blue-300";
//     }
//     if (val.includes("REGULAR") || val.includes("MODERADO")) {
//       return "bg-yellow-100 text-yellow-800 border-yellow-300";
//     }
//     return "bg-red-100 text-red-800 border-red-300";
//   };

//   const getEscalaColor = (escala: string) => {
//     const esc = escala.toUpperCase();
//     if (esc === "ALTA") return "bg-green-100 text-green-800 border-green-300";
//     if (esc === "MEDIA")
//       return "bg-yellow-100 text-yellow-800 border-yellow-300";
//     return "bg-red-100 text-red-800 border-red-300";
//   };

//   const getCumplimientoColor = (porcentaje: number) => {
//     if (porcentaje >= 90) return "text-green-600";
//     if (porcentaje >= 75) return "text-blue-600";
//     if (porcentaje >= 60) return "text-yellow-600";
//     return "text-red-600";
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <div className="flex items-center justify-center h-64">
//               <div className="flex flex-col items-center gap-4">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//                 <p className="text-gray-600">Cargando seguimiento PEI...</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!seguimiento) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
//               <p className="text-red-600 mb-4">
//                 No se pudo cargar el seguimiento PEI
//               </p>
//               <Button variant="secondary" onClick={onBack}>
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Volver al Listado
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-lg mb-6 p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-4">
//               <Button variant="secondary" onClick={onBack} size="sm">
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Volver
//               </Button>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   Seguimiento PEI {seguimiento.ano}
//                 </h1>
//                 <p className="text-gray-600 mt-1">
//                   {seguimiento.pei
//                     ? `PEI ${seguimiento.pei.anioIni} - ${seguimiento.pei.anioFin}`
//                     : "Sin PEI"}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <span
//                 className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getValoracionColor(seguimiento.valoracion_global)}`}
//               >
//                 {seguimiento.valoracion_global}
//               </span>
//               <Button
//                 variant="primary"
//                 onClick={handleSync}
//                 disabled={syncing}
//                 size="sm"
//               >
//                 <RefreshCw
//                   className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`}
//                 />
//                 {syncing ? "Recalculando..." : "Recalcular"}
//               </Button>
//             </div>
//           </div>

//           {/* Métricas principales */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
//               <p className="text-3xl font-bold text-blue-600">
//                 {seguimiento.promedio_general.toFixed(1)}%
//               </p>
//               <p className="text-sm text-gray-600 mt-1 font-medium">
//                 Promedio General
//               </p>
//             </div>
//             <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
//               <p className="text-3xl font-bold text-green-600">
//                 {seguimiento.porc_alta.toFixed(1)}%
//               </p>
//               <p className="text-sm text-gray-600 mt-1 font-medium">Alta</p>
//             </div>
//             <div className="text-center p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
//               <p className="text-3xl font-bold text-yellow-600">
//                 {seguimiento.porc_media.toFixed(1)}%
//               </p>
//               <p className="text-sm text-gray-600 mt-1 font-medium">Media</p>
//             </div>
//             <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
//               <p className="text-3xl font-bold text-red-600">
//                 {seguimiento.porc_baja.toFixed(1)}%
//               </p>
//               <p className="text-sm text-gray-600 mt-1 font-medium">Baja</p>
//             </div>
//           </div>

//           {seguimiento.observaciones && (
//             <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
//               <h4 className="font-semibold text-blue-900 mb-2">
//                 Observaciones:
//               </h4>
//               <p className="text-blue-800">{seguimiento.observaciones}</p>
//             </div>
//           )}
//         </div>

//         {/* Objetivos e Indicadores */}
//         <div className="space-y-4">
//           {objetivos.length === 0 ? (
//             <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//               <Target className="w-16 h-16 mx-auto text-gray-300 mb-4" />
//               <p className="text-gray-500 text-lg font-medium">
//                 No hay objetivos estratégicos registrados
//               </p>
//               <p className="text-gray-400 text-sm mt-2">
//                 Sincroniza el seguimiento para crear objetivos e indicadores
//               </p>
//             </div>
//           ) : (
//             objetivos.map((objetivo) => (
//               <div
//                 key={objetivo.id}
//                 className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-blue-500"
//               >
//                 {/* Header del Objetivo */}
//                 <div
//                   className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-colors"
//                   onClick={() => toggleObjetivo(objetivo.id)}
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-3">
//                         {objetivo.expanded ? (
//                           <ChevronDown className="w-5 h-5 text-blue-600" />
//                         ) : (
//                           <ChevronRight className="w-5 h-5 text-blue-600" />
//                         )}
//                         <Target className="w-5 h-5 text-blue-600" />
//                         <h3 className="text-xl font-bold text-gray-900">
//                           {objetivo.objetivo_estrategico?.description ||
//                             `Objetivo #${objetivo.id}`}
//                         </h3>
//                       </div>

//                       <div className="flex items-center gap-4 ml-8">
//                         <div className="flex items-center gap-2">
//                           <TrendingUp className="w-4 h-4 text-gray-500" />
//                           <span
//                             className={`text-2xl font-bold ${getCumplimientoColor(objetivo.promedio_cumplimiento)}`}
//                           >
//                             {objetivo.promedio_cumplimiento.toFixed(1)}%
//                           </span>
//                         </div>
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getEscalaColor(objetivo.escala_valoracion)}`}
//                         >
//                           {objetivo.escala_valoracion}
//                         </span>
//                         <span className="text-sm text-gray-600">
//                           {objetivo.indicadores.length} indicador(es)
//                         </span>
//                       </div>

//                       {objetivo.valoracion_cualitativa && (
//                         <p className="text-sm text-gray-600 mt-2 ml-8">
//                           {objetivo.valoracion_cualitativa}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Indicadores */}
//                 {objetivo.expanded && (
//                   <div className="p-6 bg-gray-50">
//                     {objetivo.indicadores.length === 0 ? (
//                       <div className="text-center py-8 text-gray-500">
//                         <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
//                         <p className="font-medium">
//                           No hay indicadores para este objetivo
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="space-y-3">
//                         {objetivo.indicadores.map((indicador) => (
//                           <div
//                             key={indicador.id}
//                             className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//                           >
//                             <div className="flex items-start justify-between mb-3">
//                               <div className="flex-1">
//                                 <div className="flex items-center gap-2 mb-2">
//                                   <BarChart3 className="w-4 h-4 text-blue-600" />
//                                   <h4 className="font-semibold text-gray-900">
//                                     {indicador.programa_anual_meta
//                                       ?.idIndicadorPeiImp?.description ||
//                                       `Indicador #${indicador.id}`}
//                                   </h4>
//                                 </div>
//                                 {indicador.programa_anual_meta
//                                   ?.idIndicadorPeiImp?.unidadMedida && (
//                                   <p className="text-xs text-gray-500 ml-6">
//                                     Unidad:{" "}
//                                     {
//                                       indicador.programa_anual_meta
//                                         .idIndicadorPeiImp.unidadMedida
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                               <span
//                                 className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getEscalaColor(indicador.escala_valoracion)}`}
//                               >
//                                 {indicador.escala_valoracion}
//                               </span>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
//                               <div className="text-center p-3 bg-blue-50 rounded border border-blue-200">
//                                 <p className="text-lg font-bold text-blue-600">
//                                   {indicador.programado}
//                                 </p>
//                                 <p className="text-xs text-gray-600 mt-1">
//                                   Programado
//                                 </p>
//                               </div>

//                               <div className="text-center p-3 bg-green-50 rounded border border-green-200">
//                                 {editingIndicadorId === indicador.id ? (
//                                   <input
//                                     type="number"
//                                     value={editEjecutado}
//                                     onChange={(e) =>
//                                       setEditEjecutado(e.target.value)
//                                     }
//                                     className="w-full text-lg font-bold text-green-600 bg-transparent border-b-2 border-green-400 focus:outline-none focus:border-green-600 text-center"
//                                     autoFocus
//                                     disabled={saving}
//                                     min="0"
//                                   />
//                                 ) : (
//                                   <p className="text-lg font-bold text-green-600">
//                                     {indicador.ejecutado}
//                                   </p>
//                                 )}
//                                 <p className="text-xs text-gray-600 mt-1">
//                                   Ejecutado
//                                 </p>
//                               </div>

//                               <div className="text-center p-3 bg-purple-50 rounded border border-purple-200">
//                                 <p
//                                   className={`text-lg font-bold ${getCumplimientoColor(indicador.grado_cumplimiento)}`}
//                                 >
//                                   {indicador.grado_cumplimiento.toFixed(1)}%
//                                 </p>
//                                 <p className="text-xs text-gray-600 mt-1">
//                                   Cumplimiento
//                                 </p>
//                               </div>

//                               <div className="flex items-center justify-center">
//                                 {editingIndicadorId === indicador.id ? (
//                                   <div className="flex gap-2">
//                                     <button
//                                       onClick={() => handleEditSave(indicador)}
//                                       disabled={saving}
//                                       className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                       title="Guardar y recalcular"
//                                     >
//                                       {saving ? (
//                                         <RefreshCw className="w-4 h-4 animate-spin" />
//                                       ) : (
//                                         <Save className="w-4 h-4" />
//                                       )}
//                                     </button>
//                                     <button
//                                       onClick={handleEditCancel}
//                                       disabled={saving}
//                                       className="p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50"
//                                       title="Cancelar"
//                                     >
//                                       <X className="w-4 h-4" />
//                                     </button>
//                                   </div>
//                                 ) : (
//                                   <button
//                                     onClick={() => handleEditStart(indicador)}
//                                     className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                                     title="Editar ejecutado"
//                                   >
//                                     <Edit2 className="w-4 h-4" />
//                                   </button>
//                                 )}
//                               </div>
//                             </div>

//                             {editingIndicadorId === indicador.id ? (
//                               <div className="mt-3">
//                                 <label className="block text-xs font-medium text-gray-700 mb-1">
//                                   Comentarios:
//                                 </label>
//                                 <textarea
//                                   value={editComentarios}
//                                   onChange={(e) =>
//                                     setEditComentarios(e.target.value)
//                                   }
//                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                                   rows={2}
//                                   disabled={saving}
//                                   placeholder="Ingrese comentarios sobre el avance..."
//                                 />
//                               </div>
//                             ) : (
//                               indicador.comentarios && (
//                                 <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
//                                   <p className="text-xs font-semibold text-gray-700 mb-1">
//                                     Comentarios:
//                                   </p>
//                                   <p className="text-sm text-gray-600">
//                                     {indicador.comentarios}
//                                   </p>
//                                 </div>
//                               )
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Alert */}
//       <Alert
//         isOpen={isOpen}
//         type={alertConfig.type}
//         title={alertConfig.title}
//         message={alertConfig.message}
//         confirmText={alertConfig.confirmText}
//         onClose={hideAlert}
//       />
//     </div>
//   );
// }



// src/modules/seguimiento/components/SeguimientoPeiDetalle.tsx
"use client";

import { useState, useEffect } from "react";
import Button from "@/shared/components/common/Button";
import Alert from "@/shared/components/common/Alert";
import { useAlert } from "@/shared/hooks/useAlert";
import {
  ArrowLeft,
  Save,
  X,
  Edit2,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Target,
  BarChart3,
} from "lucide-react";

import type {
  SeguimientoPei,
  SeguimientoPeiObjetivo,
  SeguimientoPeiIndicador,
} from "../types/seguimientoPei.types";

// Servicios
import { SeguimientoPeiService } from "../services/seguimientoPei.service";
import { SeguimientoPeiObjetivoService } from "../services/seguimientoPeiObjetivo.service";
import { SeguimientoPeiIndicadorService } from "../services/seguimientoPeiIndicador.service";

interface Props {
  seguimientoId: number;
  onBack: () => void;
}

interface ObjetivoConIndicadores extends SeguimientoPeiObjetivo {
  indicadores: SeguimientoPeiIndicador[];
  expanded: boolean;
}

export default function SeguimientoPeiDetalle({
  seguimientoId,
  onBack,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [seguimiento, setSeguimiento] = useState<SeguimientoPei | null>(null);
  const [objetivos, setObjetivos] = useState<ObjetivoConIndicadores[]>([]);

  // Estado de edición
  const [editingIndicadorId, setEditingIndicadorId] = useState<number | null>(
    null,
  );
  const [editEjecutado, setEditEjecutado] = useState("");
  const [editComentarios, setEditComentarios] = useState("");
  const [saving, setSaving] = useState(false);

  const { isOpen, alertConfig, showAlert, hideAlert } = useAlert();

  useEffect(() => {
    loadData();
  }, [seguimientoId]);

  const loadData = async () => {
    setLoading(true);
    try {
      // 1. Primero sincronizar automáticamente para recalcular todos los valores
      await SeguimientoPeiService.sync(seguimientoId);

      // 2. Cargar seguimiento con datos actualizados
      const seguimientoData =
        await SeguimientoPeiService.getById(seguimientoId);
      setSeguimiento(seguimientoData);

      // 3. Cargar objetivos
      const objetivosData =
        await SeguimientoPeiObjetivoService.getBySeguimientoId(seguimientoId);

      // 4. Cargar indicadores para cada objetivo
      const objetivosConIndicadores = await Promise.all(
        objetivosData.map(async (objetivo) => {
          const indicadores =
            await SeguimientoPeiIndicadorService.getByObjetivoId(objetivo.id);
          return {
            ...objetivo,
            indicadores,
            expanded: true, // Expandir por defecto
          };
        }),
      );

      setObjetivos(objetivosConIndicadores);
    } catch (error: any) {
      showAlert({
        type: "error",
        title: "Error al cargar datos",
        message: error.message || "No se pudo cargar el seguimiento PEI",
        confirmText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleObjetivo = (objetivoId: number) => {
    setObjetivos((prev) =>
      prev.map((obj) =>
        obj.id === objetivoId ? { ...obj, expanded: !obj.expanded } : obj,
      ),
    );
  };

  const handleEditStart = (indicador: SeguimientoPeiIndicador) => {
    setEditingIndicadorId(indicador.id);
    setEditEjecutado(indicador.ejecutado.toString());
    setEditComentarios(indicador.comentarios || "");
  };

  const handleEditCancel = () => {
    setEditingIndicadorId(null);
    setEditEjecutado("");
    setEditComentarios("");
  };

  // ✅ CORRECCIÓN: Usar actualizarEjecutado en lugar de update
  const handleEditSave = async (indicador: SeguimientoPeiIndicador) => {
    setSaving(true);
    try {
      // ✅ Usar el método correcto que llama a la mutation actualizar_ejecutado
      const updatedIndicador =
        await SeguimientoPeiIndicadorService.actualizarEjecutado(
          indicador.id,
          parseInt(editEjecutado),
          editComentarios || undefined,
        );

      // Actualizar el indicador en el estado local
      setObjetivos((prev) =>
        prev.map((obj) => ({
          ...obj,
          indicadores: obj.indicadores.map((ind) =>
            ind.id === indicador.id ? updatedIndicador : ind,
          ),
          // ✅ Actualizar también el promedio del objetivo desde la respuesta
          promedio_cumplimiento:
            updatedIndicador.seguimiento_pei_objetivo?.promedio_cumplimiento ??
            obj.promedio_cumplimiento,
          escala_valoracion:
            updatedIndicador.seguimiento_pei_objetivo?.escala_valoracion ??
            obj.escala_valoracion,
          valoracion_cualitativa:
            updatedIndicador.seguimiento_pei_objetivo?.valoracion_cualitativa ??
            obj.valoracion_cualitativa,
        })),
      );

      // ✅ Actualizar el seguimiento PEI desde la respuesta
      if (
        updatedIndicador.seguimiento_pei_objetivo?.seguimiento_pei &&
        seguimiento
      ) {
        const seguimientoPeiActualizado =
          updatedIndicador.seguimiento_pei_objetivo.seguimiento_pei;

        setSeguimiento({
          ...seguimiento,
          promedio_general:
            seguimientoPeiActualizado.promedio_general ??
            seguimiento.promedio_general,
          valoracion_global:
            seguimientoPeiActualizado.valoracion_global ??
            seguimiento.valoracion_global,
          porc_alta:
            seguimientoPeiActualizado.porc_alta ?? seguimiento.porc_alta,
          porc_media:
            seguimientoPeiActualizado.porc_media ?? seguimiento.porc_media,
          porc_baja:
            seguimientoPeiActualizado.porc_baja ?? seguimiento.porc_baja,
        });
      }

      setEditingIndicadorId(null);
      setEditEjecutado("");
      setEditComentarios("");

      showAlert({
        type: "success",
        title: "✅ Actualización exitosa",
        message:
          "El ejecutado ha sido actualizado y todos los valores han sido recalculados automáticamente",
        confirmText: "Aceptar",
      });
    } catch (error: any) {
      showAlert({
        type: "error",
        title: "Error al actualizar",
        message: error.message || "No se pudo actualizar el indicador",
        confirmText: "Aceptar",
      });
    } finally {
      setSaving(false);
    }
  };

  const getValoracionColor = (valoracion: string) => {
    const val = valoracion.toUpperCase();
    if (val.includes("EXCELENTE") || val.includes("SATISFACTORIO")) {
      return "bg-green-100 text-green-800 border-green-300";
    }
    if (val.includes("BUENO") || val.includes("ACEPTABLE")) {
      return "bg-blue-100 text-blue-800 border-blue-300";
    }
    if (val.includes("REGULAR") || val.includes("MODERADO")) {
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    }
    return "bg-red-100 text-red-800 border-red-300";
  };

  const getEscalaColor = (escala: string) => {
    const esc = escala.toUpperCase();
    if (esc === "ALTA") return "bg-green-100 text-green-800 border-green-300";
    if (esc === "MEDIA")
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  const getCumplimientoColor = (porcentaje: number) => {
    if (porcentaje >= 90) return "text-green-600";
    if (porcentaje >= 75) return "text-blue-600";
    if (porcentaje >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-600">Cargando seguimiento PEI...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!seguimiento) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-red-600 mb-4">
                No se pudo cargar el seguimiento PEI
              </p>
              <Button variant="secondary" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Listado
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg mb-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="secondary" onClick={onBack} size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Seguimiento PEI {seguimiento.ano}
                </h1>
                <p className="text-gray-600 mt-1">
                  {seguimiento.pei
                    ? `PEI ${seguimiento.pei.anioIni} - ${seguimiento.pei.anioFin}`
                    : "Sin PEI"}
                </p>
              </div>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getValoracionColor(seguimiento.valoracion_global)}`}
            >
              {seguimiento.valoracion_global}
            </span>
          </div>

          {/* Métricas principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <p className="text-3xl font-bold text-blue-600">
                {seguimiento.promedio_general.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600 mt-1 font-medium">
                Promedio General
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <p className="text-3xl font-bold text-green-600">
                {seguimiento.porc_alta.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600 mt-1 font-medium">Alta</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <p className="text-3xl font-bold text-yellow-600">
                {seguimiento.porc_media.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600 mt-1 font-medium">Media</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <p className="text-3xl font-bold text-red-600">
                {seguimiento.porc_baja.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600 mt-1 font-medium">Baja</p>
            </div>
          </div>

          {seguimiento.observaciones && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">
                Observaciones:
              </h4>
              <p className="text-blue-800">{seguimiento.observaciones}</p>
            </div>
          )}
        </div>

        {/* Objetivos e Indicadores */}
        <div className="space-y-4">
          {objetivos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <Target className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                No hay objetivos estratégicos registrados
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Sincroniza el seguimiento para crear objetivos e indicadores
              </p>
            </div>
          ) : (
            objetivos.map((objetivo) => (
              <div
                key={objetivo.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-blue-500"
              >
                {/* Header del Objetivo */}
                <div
                  className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-colors"
                  onClick={() => toggleObjetivo(objetivo.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {objetivo.expanded ? (
                          <ChevronDown className="w-5 h-5 text-blue-600" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-blue-600" />
                        )}
                        <Target className="w-5 h-5 text-blue-600" />
                        <h3 className="text-xl font-bold text-gray-900">
                          {objetivo.objetivo_estrategico?.description ||
                            `Objetivo #${objetivo.id}`}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4 ml-8">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-gray-500" />
                          <span
                            className={`text-2xl font-bold ${getCumplimientoColor(objetivo.promedio_cumplimiento)}`}
                          >
                            {objetivo.promedio_cumplimiento.toFixed(1)}%
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getEscalaColor(objetivo.escala_valoracion)}`}
                        >
                          {objetivo.escala_valoracion}
                        </span>
                        <span className="text-sm text-gray-600">
                          {objetivo.indicadores.length} indicador(es)
                        </span>
                      </div>

                      {objetivo.valoracion_cualitativa && (
                        <p className="text-sm text-gray-600 mt-2 ml-8">
                          {objetivo.valoracion_cualitativa}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Indicadores */}
                {objetivo.expanded && (
                  <div className="p-6 bg-gray-50">
                    {objetivo.indicadores.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="font-medium">
                          No hay indicadores para este objetivo
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {objetivo.indicadores.map((indicador) => (
                          <div
                            key={indicador.id}
                            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <BarChart3 className="w-4 h-4 text-blue-600" />
                                  <h4 className="font-semibold text-gray-900">
                                    {indicador.programa_anual_meta
                                      ?.idIndicadorPeiImp?.description ||
                                      `Indicador #${indicador.id}`}
                                  </h4>
                                </div>
                                {indicador.programa_anual_meta
                                  ?.idIndicadorPeiImp?.unidadMedida && (
                                  <p className="text-xs text-gray-500 ml-6">
                                    Unidad:{" "}
                                    {
                                      indicador.programa_anual_meta
                                        .idIndicadorPeiImp.unidadMedida
                                    }
                                  </p>
                                )}
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getEscalaColor(indicador.escala_valoracion)}`}
                              >
                                {indicador.escala_valoracion}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                              <div className="text-center p-3 bg-blue-50 rounded border border-blue-200">
                                <p className="text-lg font-bold text-blue-600">
                                  {indicador.programado}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                  Programado
                                </p>
                              </div>

                              <div className="text-center p-3 bg-green-50 rounded border border-green-200">
                                {editingIndicadorId === indicador.id ? (
                                  <input
                                    type="number"
                                    value={editEjecutado}
                                    onChange={(e) =>
                                      setEditEjecutado(e.target.value)
                                    }
                                    className="w-full text-lg font-bold text-green-600 bg-transparent border-b-2 border-green-400 focus:outline-none focus:border-green-600 text-center"
                                    autoFocus
                                    disabled={saving}
                                    min="0"
                                  />
                                ) : (
                                  <p className="text-lg font-bold text-green-600">
                                    {indicador.ejecutado}
                                  </p>
                                )}
                                <p className="text-xs text-gray-600 mt-1">
                                  Ejecutado
                                </p>
                              </div>

                              <div className="text-center p-3 bg-purple-50 rounded border border-purple-200">
                                <p
                                  className={`text-lg font-bold ${getCumplimientoColor(indicador.grado_cumplimiento)}`}
                                >
                                  {indicador.grado_cumplimiento.toFixed(1)}%
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                  Cumplimiento
                                </p>
                              </div>

                              <div className="flex items-center justify-center">
                                {editingIndicadorId === indicador.id ? (
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleEditSave(indicador)}
                                      disabled={saving}
                                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                      title="Guardar y recalcular"
                                    >
                                      {saving ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                      ) : (
                                        <Save className="w-4 h-4" />
                                      )}
                                    </button>
                                    <button
                                      onClick={handleEditCancel}
                                      disabled={saving}
                                      className="p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50"
                                      title="Cancelar"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleEditStart(indicador)}
                                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    title="Editar ejecutado"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {editingIndicadorId === indicador.id ? (
                              <div className="mt-3">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Comentarios:
                                </label>
                                <textarea
                                  value={editComentarios}
                                  onChange={(e) =>
                                    setEditComentarios(e.target.value)
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                  rows={2}
                                  disabled={saving}
                                  placeholder="Ingrese comentarios sobre el avance..."
                                />
                              </div>
                            ) : (
                              indicador.comentarios && (
                                <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
                                  <p className="text-xs font-semibold text-gray-700 mb-1">
                                    Comentarios:
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {indicador.comentarios}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Alert */}
      <Alert
        isOpen={isOpen}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        confirmText={alertConfig.confirmText}
        onClose={hideAlert}
      />
    </div>
  );
}
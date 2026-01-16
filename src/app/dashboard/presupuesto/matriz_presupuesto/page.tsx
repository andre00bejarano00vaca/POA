// // src/app/(main)/presupuesto/matriz/page.tsx
// "use client";

// import GenericList from "@/shared/components/common/GenericList";
// import { useMatrizPresupuesto } from "@/modules/presupuesto/hooks/useMatrizPresupuesto";
// import {
//   matrizPresupuestoColumns,
//   matrizPresupuestoFormFields,
// } from "@/modules/presupuesto/config/matrizPresupuesto.config";
// import type { MatrizPresupuestoRecord } from "@/modules/presupuesto/types/matrizPresupuesto.types";

// export default function MatrizPresupuestoPage() {
//   return (
//     <div className="space-y-4">
//       {/* Header personalizado */}
//       <div className="bg-white rounded-lg shadow-sm p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">
//               Matriz Presupuestaria
//             </h1>
//             <p className="text-sm text-gray-600 mt-1">
//               UAGRM - Entidad 146 | Gestión 2025
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Lista genérica */}
//       <GenericList<MatrizPresupuestoRecord>
//         title="" // Sin título porque ya tenemos el header arriba
//         useData={useMatrizPresupuesto}
//         columns={matrizPresupuestoColumns}
//         formFields={matrizPresupuestoFormFields}
//         searchKeys={["codigo", "descripcionActividad", "descripcionGasto"]}
//         searchPlaceholder="Buscar por código, descripción de actividad o gasto..."
//         enableCreate
//         enableEdit
//         enableDelete
//         emptyMessage="No hay partidas presupuestarias registradas"
//         createButtonText="Añadir Partida"
//         mapItemToForm={(item: MatrizPresupuestoRecord) => ({
//           id: item.id,
//           codigo: item.codigo,
//           codPpto: item.codPpto,
//           entidad: item.entidad,
//           da: item.da,
//           ue: item.ue,
//           prog: item.prog,
//           nroAct: item.nroAct,
//           descripcionActividad: item.descripcionActividad,
//           objetoGastoId: item.objetoGastoId,
//           partida: item.partida,
//           org: item.org,
//           fuente: item.fuente,
//           entidadTransf: item.entidadTransf,
//           importe: item.importe,
//         })}
//         // Mostrar total en el footer
//         customFooter={(filteredItems) => {
//           const total = filteredItems.reduce(
//             (sum, item) => sum + item.importe,
//             0
//           );
//           return (
//             <div className="bg-blue-50 px-6 py-4 border-t-2 border-blue-200">
//               <div className="flex justify-end items-center gap-4">
//                 <span className="text-sm font-medium text-gray-700">
//                   TOTAL PRESUPUESTARIO:
//                 </span>
//                 <span className="text-lg font-bold text-blue-700">
//                   Bs.{" "}
//                   {total.toLocaleString("es-BO", { minimumFractionDigits: 2 })}
//                 </span>
//               </div>
//             </div>
//           );
//         }}
//       />
//     </div>
//   );
// }

// src/app/(main)/presupuesto/matriz/page.tsx
import MatrizPresupuesto from "@/shared/components/common/MatrizPresupuesto";

export default function Page() {
  return <MatrizPresupuesto />;
}

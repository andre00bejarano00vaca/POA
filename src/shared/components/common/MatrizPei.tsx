// "use client";

// import React, { useState } from "react";
// import { Plus, Search, Edit2, Trash2, X, Save } from "lucide-react";

// interface Record {
//   id: number;
//   areaEstrategica: string;
//   politicaDesarrollo: string;
//   objetivoEstrategico: string;
//   productoInstitucional: string;
//   accionEstrategica: string;
//   indicador: string;
//   meta: string;
//   unidadResponsable: string;
// }

// const Matriz = () => {
//   const [showForm, setShowForm] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const [records, setRecords] = useState<Record[]>([
//     {
//       id: 1,
//       areaEstrategica: "Gestión Administrativa",
//       politicaDesarrollo: "Modernización Institucional",
//       objetivoEstrategico: "Mejorar la eficiencia administrativa",
//       productoInstitucional: "Sistemas digitalizados",
//       accionEstrategica: "Implementar ERP",
//       indicador: "Procesos automatizados",
//       meta: "80% de procesos",
//       unidadResponsable: "TI",
//     },
//   ]);

//   const [formData, setFormData] = useState<Omit<Record, "id">>({
//     areaEstrategica: "",
//     politicaDesarrollo: "",
//     objetivoEstrategico: "",
//     productoInstitucional: "",
//     accionEstrategica: "",
//     indicador: "",
//     meta: "",
//     unidadResponsable: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (editingId) {
//       setRecords(
//         records.map((r) =>
//           r.id === editingId ? { ...formData, id: editingId } : r,
//         ),
//       );
//       setEditingId(null);
//     } else {
//       setRecords([...records, { ...formData, id: Date.now() }]);
//     }
//     resetForm();
//   };

//   const resetForm = () => {
//     setFormData({
//       areaEstrategica: "",
//       politicaDesarrollo: "",
//       objetivoEstrategico: "",
//       productoInstitucional: "",
//       accionEstrategica: "",
//       indicador: "",
//       meta: "",
//       unidadResponsable: "",
//     });
//     setShowForm(false);
//     setEditingId(null);
//   };

//   const handleEdit = (record: Record) => {
//     setFormData(record);
//     setEditingId(record.id);
//     setShowForm(true);
//   };

//   const handleDelete = (id: number) => {
//     if (confirm("¿Está seguro de eliminar este registro?")) {
//       setRecords(records.filter((r) => r.id !== id));
//     }
//   };

//   const filteredRecords = records.filter((record) =>
//     Object.values(record).some((value) =>
//       value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
//     ),
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       {/* Header */}
//       <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">
//             Plan Estratégico Institucional (PEI)
//           </h1>
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
//           >
//             {showForm ? <X size={18} /> : <Plus size={18} />}
//             {showForm ? "Cancelar" : "Añadir Nuevo PEI"}
//           </button>
//         </div>

//         {/* Barra de búsqueda */}
//         <div className="relative">
//           <Search
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//             size={18}
//           />
//           <input
//             type="text"
//             placeholder="Buscar por año inicial, año final u observaciones..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
//       </div>

//       {/* Formulario Horizontal */}
//       {showForm && (
//         <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
//           <form onSubmit={handleSubmit}>
//             {/* Fila 1: Planificación Estratégica */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Área Estratégica <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="areaEstrategica"
//                   value={formData.areaEstrategica}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Ej: Gestión Administrativa"
//                   className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Política de Desarrollo <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="politicaDesarrollo"
//                   value={formData.politicaDesarrollo}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Ej: Modernización"
//                   className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Objetivo Estratégico <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="objetivoEstrategico"
//                   value={formData.objetivoEstrategico}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Describir objetivo..."
//                   className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Fila 2: Productos y Acciones */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Producto Institucional <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="productoInstitucional"
//                   value={formData.productoInstitucional}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Ej: Sistemas digitales"
//                   className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Acción Estratégica <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="accionEstrategica"
//                   value={formData.accionEstrategica}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Ej: Implementar ERP"
//                   className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Indicador PEI <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="indicador"
//                   value={formData.indicador}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Ej: % Automatización"
//                   className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Fila 3: Metas y Responsables */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Programación Anual de Metas{" "}
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="meta"
//                   value={formData.meta}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Ej: 80% de procesos"
//                   className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Unidad Responsable <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="unidadResponsable"
//                   value={formData.unidadResponsable}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Ej: TI"
//                   className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Botones */}
//             <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded font-medium transition-colors"
//               >
//                 Cancelar
//               </button>
//               <button
//                 type="submit"
//                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
//               >
//                 <Save size={18} />
//                 {editingId ? "Actualizar" : "Guardar"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Tabla */}
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Área Estratégica
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Política de Desarrollo
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Objetivo Estratégico
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Producto Institucional
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Acción Estratégica
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Indicador PEI
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Programación Anual
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Unidad Responsable
//                 </th>
//                 <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Acciones
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100 bg-white">
//               {filteredRecords.length > 0 ? (
//                 filteredRecords.map((record) => (
//                   <tr
//                     key={record.id}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="px-4 py-3 text-sm text-gray-700">
//                       {record.areaEstrategica}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-700">
//                       {record.politicaDesarrollo}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-700">
//                       {record.objetivoEstrategico}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-700">
//                       {record.productoInstitucional}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-700">
//                       {record.accionEstrategica}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-700">
//                       {record.indicador}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-700">
//                       {record.meta}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-700">
//                       {record.unidadResponsable}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex gap-2 justify-center">
//                         <button
//                           onClick={() => handleEdit(record)}
//                           className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
//                           title="Editar"
//                         >
//                           <Edit2 size={16} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(record.id)}
//                           className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
//                           title="Eliminar"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="9"
//                     className="px-4 py-12 text-center text-gray-500 italic"
//                   >
//                     Sin observaciones
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Matriz;

// "use client";

// import MatrizCrud from "@/shared/components/common/MatrizCrud";
// import { useMatrizPei } from "@/modules/pei/hooks/useMatrizPei";
// import {
//   matrizPeiColumns,
//   matrizPeiFormFields,
// } from "@/modules/pei/config/matrizPei.config";
// import type {
//   MatrizPei,
//   CreateMatrizPeiInput,
//   UpdateMatrizPeiInput,
// } from "@/modules/pei/types/matrizPei.types";

// export default function MatrizPei() {
//   return (
//     <MatrizCrud<MatrizPei, CreateMatrizPeiInput, UpdateMatrizPeiInput>
//       title="Matriz PEI - Plan Estratégico Institucional"
//       useData={useMatrizPei}
//       columns={matrizPeiColumns}
//       formFields={matrizPeiFormFields}
//       idKey="id"
//       createButtonText="Añadir Registro a Matriz"
//       searchPlaceholder="Buscar en la matriz..."
//       emptyMessage="No hay registros en la matriz PEI."
//       mapItemToForm={(item: MatrizPei) => ({
//         id: item.id,
//         anioBase: item.anioBase,
//         metaMedianoPlazo: item.metaMedianoPlazo,
//         peiId: item.pei?.id,
//         objetivoEstrategicoId: item.objetivoEstrategico?.id,
//         productoInstitucionalId: item.productoInstitucional?.id,
//         accionEstrategicaId: item.accionEstrategica?.id,
//         indicadorPeiId: item.indicadorPei?.id,
//         unidadEjecutoraId: item.unidadEjecutora?.id,
//       })}
//     />
//   );
// }

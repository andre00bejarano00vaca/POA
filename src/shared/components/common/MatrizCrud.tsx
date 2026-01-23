// "use client";

// import React, { useMemo, useState } from "react";
// import { Plus, Search, Edit2, Trash2, X, Save } from "lucide-react";

// import type { ColumnConfig } from "@/shared/components/common/DynamicTable";
// import type { FieldConfig } from "@/shared/components/common/DynamicForm";
// import { DynamicForm } from "@/shared/components/common/DynamicForm";

// type Id = number | string;

// type UseCrudLike<T, CreateInput, UpdateInput> = () => {
//   items: T[];
//   loading: boolean;
//   error: string | null;

//   // paginación (según tu useCrud)
//   currentPage: number;
//   itemsPerPage: number;
//   totalItems: number;
//   totalPages: number;
//   setCurrentPage: (p: number) => void;
//   setItemsPerPage: (n: number) => void;

//   // búsqueda (según tu useCrud)
//   searchTerm: string;
//   setSearchTerm: (s: string) => void;

//   // acciones
//   refresh: () => Promise<void>;
//   createItem: (data: CreateInput) => Promise<void>;
//   updateItem: (id: Id, data: UpdateInput) => Promise<void>;
//   deleteItem: (id: Id) => Promise<void>;
// };

// interface MatrizCrudProps<T, CreateInput, UpdateInput> {
//   title: string;

//   useData: UseCrudLike<T, CreateInput, UpdateInput>;
//   columns: ColumnConfig<T>[];

//   formFields: FieldConfig<any>[];

//   idKey: keyof T;

//   createButtonText?: string;
//   searchPlaceholder?: string;
//   emptyMessage?: string;

//   // para editar: convierte tu item (T) al shape del formulario (ids, etc)
//   mapItemToForm: (item: T) => Record<string, any>;
// }

// export default function MatrizCrud<T, CreateInput, UpdateInput>({
//   title,
//   useData,
//   columns,
//   formFields,
//   idKey,
//   createButtonText = "Añadir",
//   searchPlaceholder = "Buscar...",
//   emptyMessage = "No hay registros.",
//   mapItemToForm,
// }: MatrizCrudProps<T, CreateInput, UpdateInput>) {
//   const crud = useData();

//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState<Id | null>(null);

//   // búsqueda local “visual” para la tabla (además de la del backend si usas)
//   const [clientSearch, setClientSearch] = useState("");

//   const filteredItems = useMemo(() => {
//     const term = clientSearch.trim().toLowerCase();
//     if (!term) return crud.items;

//     return crud.items.filter((item: any) =>
//       Object.values(item).some((v) =>
//         String(v ?? "")
//           .toLowerCase()
//           .includes(term),
//       ),
//     );
//   }, [crud.items, clientSearch]);

//   const [formValues, setFormValues] = useState<Record<string, any>>({});

//   const openCreate = () => {
//     setEditingId(null);
//     setFormValues({});
//     setShowForm(true);
//   };

//   const openEdit = (item: T) => {
//     const id = (item as any)[idKey] as Id;
//     setEditingId(id);
//     setFormValues(mapItemToForm(item));
//     setShowForm(true);
//   };

//   const closeForm = () => {
//     setShowForm(false);
//     setEditingId(null);
//     setFormValues({});
//   };

//   const handleSubmit = async () => {
//     // DynamicForm normalmente ya valida required; si no, aquí puedes validar extra

//     if (editingId !== null) {
//       // Update
//       await crud.updateItem(editingId, formValues as UpdateInput);
//     } else {
//       // Create
//       await crud.createItem(formValues as CreateInput);
//     }

//     await crud.refresh();
//     closeForm();
//   };

//   const handleDelete = async (item: T) => {
//     const id = (item as any)[idKey] as Id;
//     if (!confirm("¿Está seguro de eliminar este registro?")) return;

//     await crud.deleteItem(id);
//     await crud.refresh();
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       {/* Header */}
//       <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

//           <button
//             onClick={() => (showForm ? closeForm() : openCreate())}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
//           >
//             {showForm ? <X size={18} /> : <Plus size={18} />}
//             {showForm ? "Cancelar" : createButtonText}
//           </button>
//         </div>

//         {/* Búsqueda UI (cliente) */}
//         <div className="relative">
//           <Search
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             size={18}
//           />
//           <input
//             type="text"
//             placeholder={searchPlaceholder}
//             value={clientSearch}
//             onChange={(e) => setClientSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>

//         {crud.error ? (
//           <div className="mt-4 text-sm text-red-600">{crud.error}</div>
//         ) : null}
//       </div>

//       {/* Form (usa tu DynamicForm para que funcione remote-search-select) */}
//       {showForm && (
//         <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
//           <div className="mb-4">
//             <div className="text-sm font-semibold text-gray-800">
//               {editingId !== null ? "Editar registro" : "Nuevo registro"}
//             </div>
//             <div className="text-xs text-gray-500">
//               Complete los campos y guarde.
//             </div>
//           </div>

//           <DynamicForm
//             fields={formFields}
//             values={formValues}
//             onChange={(key: string, value: any) =>
//               setFormValues((prev) => ({ ...prev, [key]: value }))
//             }
//           />

//           <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
//             <button
//               type="button"
//               onClick={closeForm}
//               className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded font-medium transition-colors"
//             >
//               Cancelar
//             </button>

//             <button
//               type="button"
//               onClick={handleSubmit}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors disabled:opacity-60"
//               disabled={crud.loading}
//             >
//               <Save size={18} />
//               {editingId !== null ? "Actualizar" : "Guardar"}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Tabla */}
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 {columns.map((c) => (
//                   <th
//                     key={String(c.key)}
//                     className={`px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${c.className ?? ""}`}
//                   >
//                     {c.header}
//                   </th>
//                 ))}
//                 <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Acciones
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-100 bg-white">
//               {filteredItems.length > 0 ? (
//                 filteredItems.map((item) => (
//                   <tr
//                     key={String((item as any)[idKey])}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     {columns.map((c) => (
//                       <td
//                         key={String(c.key)}
//                         className="px-4 py-3 text-sm text-gray-700"
//                       >
//                         {c.render
//                           ? c.render(item)
//                           : String((item as any)[c.key])}
//                       </td>
//                     ))}

//                     <td className="px-4 py-3">
//                       <div className="flex gap-2 justify-center">
//                         <button
//                           onClick={() => openEdit(item)}
//                           className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
//                           title="Editar"
//                         >
//                           <Edit2 size={16} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item)}
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
//                     colSpan={columns.length + 1}
//                     className="px-4 py-12 text-center text-gray-500 italic"
//                   >
//                     {emptyMessage}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useMemo, useState } from "react";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";

import type { ColumnConfig } from "@/shared/components/common/DynamicTable";
import type { FieldConfig } from "@/shared/components/common/DynamicForm";
import { DynamicForm } from "@/shared/components/common/DynamicForm";

type Id = number | string;

/**
 * ✅ Compatible con tus hooks actuales:
 * - puede tener refresh o refetch
 * - create/update/delete pueden devolver T o void
 */
type UseCrudLike<T, CreateInput, UpdateInput> = () => {
  items: T[];
  loading: boolean;
  error: string | null;

  // paginación (según tu useCrud)
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  setCurrentPage: (p: number) => void;
  setItemsPerPage: (n: number) => void;

  // búsqueda (según tu useCrud)
  searchTerm: string;
  setSearchTerm: (s: string) => void;

  // ✅ cualquiera de los dos
  refresh?: () => Promise<void> | void;
  refetch?: () => Promise<void> | void;

  // ✅ tu hook puede devolver T o void
  createItem: (data: CreateInput) => Promise<any>;
  updateItem: (id: Id, data: UpdateInput) => Promise<any>;
  deleteItem: (id: Id) => Promise<any>;
};

interface MatrizCrudProps<T, CreateInput, UpdateInput> {
  title: string;

  useData: UseCrudLike<T, CreateInput, UpdateInput>;
  columns: ColumnConfig<T>[];

  // DynamicForm trabaja con Record<string, any> sin problema
  formFields: FieldConfig<Record<string, any>>[];

  idKey: keyof T;

  createButtonText?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;

  // para editar: convierte tu item (T) al shape del formulario (ids, etc)
  mapItemToForm: (item: T) => Record<string, any>;
}

export default function MatrizCrud<T, CreateInput, UpdateInput>({
  title,
  useData,
  columns,
  formFields,
  idKey,
  createButtonText = "Añadir",
  searchPlaceholder = "Buscar...",
  emptyMessage = "No hay registros.",
  mapItemToForm,
}: MatrizCrudProps<T, CreateInput, UpdateInput>) {
  const crud = useData();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<Id | null>(null);

  // búsqueda local “visual” para la tabla
  const [clientSearch, setClientSearch] = useState("");

  // datos para initialData del DynamicForm
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const doReload = async () => {
    const fn = crud.refresh ?? crud.refetch;
    await fn?.();
  };

  const filteredItems = useMemo(() => {
    const term = clientSearch.trim().toLowerCase();
    if (!term) return crud.items;

    return crud.items.filter((item: any) =>
      Object.values(item).some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(term),
      ),
    );
  }, [crud.items, clientSearch]);

  const openCreate = () => {
    setEditingId(null);
    setFormValues({});
    setShowForm(true);
  };

  const openEdit = (item: T) => {
    const id = (item as any)[idKey] as Id;
    setEditingId(id);
    setFormValues(mapItemToForm(item));
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormValues({});
  };

  const handleDelete = async (item: T) => {
    const id = (item as any)[idKey] as Id;
    if (!confirm("¿Está seguro de eliminar este registro?")) return;

    await crud.deleteItem(id);
    await doReload();
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

          <button
            onClick={() => (showForm ? closeForm() : openCreate())}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? "Cancelar" : createButtonText}
          </button>
        </div>

        {/* Búsqueda UI (cliente) */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={clientSearch}
            onChange={(e) => setClientSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {crud.error ? (
          <div className="mt-4 text-sm text-red-600">{crud.error}</div>
        ) : null}
      </div>

      {/* Form (usa tu DynamicForm: initialData + onSubmit + onCancel) */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <div className="mb-4">
            <div className="text-sm font-semibold text-gray-800">
              {editingId !== null ? "Editar registro" : "Nuevo registro"}
            </div>
            <div className="text-xs text-gray-500">
              Complete los campos y guarde.
            </div>
          </div>

          <DynamicForm
            fields={formFields}
            initialData={formValues}
            onSubmit={async (data) => {
              setFormValues(data);

              if (editingId !== null) {
                await crud.updateItem(editingId, data as UpdateInput);
              } else {
                await crud.createItem(data as CreateInput);
              }

              await doReload();
              closeForm();
            }}
            onCancel={closeForm}
            submitButtonText={editingId !== null ? "Actualizar" : "Guardar"}
            cancelButtonText="Cancelar"
          />
        </div>
      )}

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {columns.map((c) => (
                  <th
                    key={String(c.key)}
                    className={`px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${c.className ?? ""}`}
                  >
                    {c.header}
                  </th>
                ))}
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr
                    key={String((item as any)[idKey])}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {columns.map((c) => (
                      <td
                        key={String(c.key)}
                        className="px-4 py-3 text-sm text-gray-700"
                      >
                        {c.render
                          ? c.render(item)
                          : String((item as any)[c.key] ?? "")}
                      </td>
                    ))}

                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(item)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-4 py-12 text-center text-gray-500 italic"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

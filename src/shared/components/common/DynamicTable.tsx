// // components/DynamicTable.tsx
// import React from 'react';

// // Interfaz para definir una columna
// export interface ColumnConfig<T> {
//   // La clave (key) en el objeto de datos (por ejemplo, 'anio_ini')
//   key: keyof T | 'actions';
//   // La etiqueta que se mostrará en el encabezado de la tabla (por ejemplo, 'Año Inicial')
//   header: string;
//   // Opcional: una función para formatear o renderizar el valor de la celda
//   render?: (item: T) => React.ReactNode;
//   // Opcional: clases Tailwind CSS para alinear el contenido de la celda
//   className?: string;
// }

// // Interfaz para las props del componente
// interface DynamicTableProps<T> {
//   data: T[]; // El array de datos (ej: PEI[])
//   columns: ColumnConfig<T>[]; // La configuración de las columnas
//   // Opcional: un mensaje para mostrar cuando no hay datos
//   emptyMessage?: string;
// }

// // Componente DynamicTable
// export function DynamicTable<T>({ data, columns, emptyMessage = "No hay datos para mostrar." }: DynamicTableProps<T>) {
//   // Si no hay datos, muestra el mensaje de vacío
//   if (!data || data.length === 0) {
//     return (
//       <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-500">
//         <p className="font-medium">📋 {emptyMessage}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
//       <table className="min-w-full divide-y divide-gray-200">
//         {/* Encabezado */}
//         <thead className="bg-gray-50">
//           <tr>
//             {columns.map((col, index) => (
//               <th
//                 key={index}
//                 className={`px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${col.className || ''}`}
//               >
//                 {col.header}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         {/* Cuerpo de la tabla */}
//         <tbody className="bg-white divide-y divide-gray-100">
//           {data.map((item, rowIndex) => (
//             <tr key={rowIndex} className="hover:bg-blue-50/50 transition duration-150">
//               {columns.map((col, colIndex) => {
//                 const cellContent = col.render
//                   ? col.render(item) // Usa la función render si existe
//                   : item[col.key as keyof T] as React.ReactNode; // Si no, usa el valor de la clave

//                 return (
//                   <td
//                     key={colIndex}
//                     className={`px-6 py-4 whitespace-nowrap text-sm text-gray-800 ${col.className || ''}`}
//                   >
//                     {cellContent}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// components/DynamicTable.tsx
import React from "react";

// Interfaz para definir una columna
export interface ColumnConfig<T> {
  key: keyof T | "actions";
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

// Interfaz para las props del componente
interface DynamicTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  emptyMessage?: string;
}

// Componente DynamicTable
export function DynamicTable<T>({
  data,
  columns,
  emptyMessage = "No hay datos para mostrar.",
}: DynamicTableProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-500">
        <p className="font-medium">📋 {emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Encabezado */}
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                  col.className || ""
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-blue-50/50 transition duration-150"
            >
              {columns.map((col, colIndex) => {
                const cellContent = col.render
                  ? col.render(item)
                  : (item[col.key as keyof T] as React.ReactNode);

                return (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 text-sm text-gray-800 ${
                      col.className || ""
                    }`}
                  >
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

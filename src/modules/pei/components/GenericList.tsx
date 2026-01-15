"use client";
import React, { useState, useMemo } from "react";
import { DynamicTable, ColumnConfig } from "../common/DynamicTable";

interface GenericListProps<T> {
  title: string;
  data: T[];
  columns: ColumnConfig<T>[];
  searchFields: (keyof T)[];
  searchPlaceholder?: string;
}

export default function PEIList<T>({ 
  title, 
  data, 
  columns, 
  searchFields, 
  searchPlaceholder = "Buscar..." 
}: GenericListProps<T>) {
  const [search, setSearch] = useState("");

  // Lógica de filtrado genérica
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        return value?.toString().toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, data, searchFields]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">{title}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="mb-6">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2 w-full shadow-sm transition duration-150"
          />
        </div>

        <DynamicTable 
          data={filteredData} 
          columns={columns} 
          emptyMessage={`No se encontraron registros en ${title}.`}
        />
      </div>
    </div>
  );
}
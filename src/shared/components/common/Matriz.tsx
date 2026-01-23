// src/shared/components/common/DynamicMatrix.tsx
"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Save,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface MatrixColumn<T> {
  key: keyof T;
  header: string;
  width?: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
  editable?: boolean;
  required?: boolean;
  placeholder?: string;
  type?: "text" | "number" | "date" | "select" | "textarea";
  options?: Array<{ value: string | number; label: string }>;
  min?: number;
  max?: number;
  step?: number;
}

interface DynamicMatrixProps<T extends { id: number }> {
  title: string;
  columns: MatrixColumn<T>[];
  data: T[];
  loading?: boolean;
  error?: string | null;
  onSave?: (data: T) => Promise<void>;
  onUpdate?: (id: number, data: Partial<T>) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
  searchPlaceholder?: string;
  addButtonText?: string;
  emptyMessage?: string;
  enableCreate?: boolean;
  enableEdit?: boolean;
  enableDelete?: boolean;
  enableSearch?: boolean;
  enablePagination?: boolean;
  itemsPerPage?: number;
}

export function DynamicMatrix<T extends { id: number }>({
  title,
  columns,
  data,
  loading = false,
  error = null,
  onSave,
  onUpdate,
  onDelete,
  searchPlaceholder = "Buscar...",
  addButtonText = "Añadir Nuevo",
  emptyMessage = "No hay registros",
  enableCreate = true,
  enableEdit = true,
  enableDelete = true,
  enableSearch = true,
  enablePagination = false,
  itemsPerPage = 10,
}: DynamicMatrixProps<T>) {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Crear objeto vacío basado en las columnas
  const createEmptyRecord = (): Omit<T, "id"> => {
    const empty = {} as Omit<T, "id">;
    columns.forEach((col) => {
      if (col.key !== "id") {
        (empty as any)[col.key] = col.type === "number" ? 0 : "";
      }
    });
    return empty;
  };

  const [formData, setFormData] = useState<Omit<T, "id">>(createEmptyRecord());

  const handleInputChange = (key: keyof T, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingId && onUpdate) {
        await onUpdate(editingId, formData);
      } else if (onSave) {
        await onSave({ ...formData, id: Date.now() } as T);
      }
      resetForm();
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(createEmptyRecord());
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (record: T) => {
    const { id, ...rest } = record;
    setFormData(rest as Omit<T, "id">);
    setEditingId(record.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Está seguro de eliminar este registro?")) {
      setIsSubmitting(true);
      try {
        if (onDelete) {
          await onDelete(id);
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Filtrado
  const filteredRecords = useMemo(() => {
    if (!enableSearch || !searchTerm.trim()) return data;

    return data.filter((record) =>
      Object.values(record).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [data, searchTerm, enableSearch]);

  // Paginación
  const paginatedRecords = useMemo(() => {
    if (!enablePagination) return filteredRecords;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredRecords.slice(startIndex, endIndex);
  }, [filteredRecords, currentPage, itemsPerPage, enablePagination]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  const renderInput = (column: MatrixColumn<T>) => {
    const value = (formData[column.key] ?? "") as any;
    const inputClasses =
      "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500";

    if (column.type === "textarea") {
      return (
        <textarea
          value={value}
          onChange={(e) => handleInputChange(column.key, e.target.value)}
          required={column.required}
          placeholder={column.placeholder}
          rows={4}
          className={inputClasses}
        />
      );
    }

    if (column.type === "select" && column.options) {
      return (
        <select
          value={value}
          onChange={(e) => handleInputChange(column.key, e.target.value)}
          required={column.required}
          className={inputClasses}
        >
          <option value="">Seleccionar...</option>
          {column.options.map((opt) => (
            <option key={String(opt.value)} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (column.type === "number") {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) =>
            handleInputChange(column.key, Number(e.target.value))
          }
          required={column.required}
          placeholder={column.placeholder}
          min={column.min}
          max={column.max}
          step={column.step}
          className={inputClasses}
        />
      );
    }

    return (
      <input
        type={column.type || "text"}
        value={value}
        onChange={(e) => handleInputChange(column.key, e.target.value)}
        required={column.required}
        placeholder={column.placeholder}
        className={inputClasses}
      />
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {enableCreate && (
            <button
              onClick={() => setShowForm(!showForm)}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {showForm ? <X size={18} /> : <Plus size={18} />}
              {showForm ? "Cancelar" : addButtonText}
            </button>
          )}
        </div>

        {/* Barra de búsqueda */}
        {enableSearch && (
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Formulario */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {columns
                .filter((col) => col.editable !== false && col.key !== "id")
                .map((column) => (
                  <div key={String(column.key)}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {column.header}
                      {column.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    {renderInput(column)}
                  </div>
                ))}
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={resetForm}
                disabled={isSubmitting}
                className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded font-medium transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors disabled:opacity-50"
              >
                <Save size={18} />
                {isSubmitting
                  ? "Guardando..."
                  : editingId
                    ? "Actualizar"
                    : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${
                      column.className || ""
                    }`}
                    style={{ width: column.width }}
                  >
                    {column.header}
                  </th>
                ))}
                {(enableEdit || enableDelete) && (
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-4 py-12 text-center text-gray-500"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Cargando...
                    </div>
                  </td>
                </tr>
              ) : paginatedRecords.length > 0 ? (
                paginatedRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className={`px-4 py-3 text-sm text-gray-700 ${
                          column.className || ""
                        }`}
                      >
                        {column.render
                          ? column.render(record)
                          : String(record[column.key] ?? "")}
                      </td>
                    ))}
                    {(enableEdit || enableDelete) && (
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-center">
                          {enableEdit && (
                            <button
                              onClick={() => handleEdit(record)}
                              disabled={isSubmitting}
                              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
                              title="Editar"
                            >
                              <Edit2 size={16} />
                            </button>
                          )}
                          {enableDelete && (
                            <button
                              onClick={() => handleDelete(record.id)}
                              disabled={isSubmitting}
                              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
                              title="Eliminar"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
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

        {/* Paginación */}
        {enablePagination && totalPages > 1 && (
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Mostrando{" "}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              a{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredRecords.length)}
              </span>{" "}
              de <span className="font-medium">{filteredRecords.length}</span>{" "}
              resultados
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="px-4 py-2 border border-gray-300 rounded bg-white">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

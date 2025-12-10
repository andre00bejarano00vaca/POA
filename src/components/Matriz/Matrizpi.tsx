// Matrizpi.tsx (Container)

"use client";
import React, { useState } from "react";
import { Plus, FileText } from 'lucide-react'; 
// Importamos los nuevos componentes presentacionales
import MatrizTable from './MatrizTable';
import MatrizModal from './MatrizModal';

// --- Definiciones Compartidas (Mover a un archivo types.ts si el proyecto crece) ---
export interface Header {
  key: string;
  label: string;
  color: string;
  options?: string[];
}

export interface RowData {
  [key: string]: string;
}

const headers: Header[] = [
  { key: "area_estrategica", label: "Área Estratégica", color: "bg-amber-200" }, 
  { key: "politica_desarrollo", label: "Política de Desarrollo", color: "bg-neutral-200" }, 
  { key: "objetivo_estrategico", label: "Objetivo Estratégico", color: "bg-cyan-200" }, 
  { key: "producto_institucional", label: "Producto Institucional", color: "bg-blue-200" }, 
  { key: "accion_estrategica", label: "Acción Estratégica", color: "bg-orange-200" }, 
  { 
    key: "indicadores_pei", 
    label: "Indicadores PEI", 
    color: "bg-lime-200",
    options: ["Indicador 1: Eficiencia", "Indicador 2: Calidad", "Indicador 3: Cobertura", "Indicador 4: Impacto"] 
  },
  { key: "programacion_anual", label: "Programación Anual de Metas", color: "bg-yellow-200" }, 
  { 
    key: "unidades_involucradas", 
    label: "Unidades Involucradas", 
    color: "bg-purple-200",
    options: ["Unidad A: Desarrollo", "Unidad B: Finanzas", "Unidad C: Marketing", "Unidad D: RRHH"] 
  },
  { key: "programacion", label: "Programación", color: "bg-sky-300" }, 
];
// ----------------------------------------------------------------------------------

export default function Matrizpi() {
  const [data, setData] = useState<RowData[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<RowData>({});

  // Funciones de Lógica
  const openModal = (index: number | null = null) => {
    setEditIndex(index);
    const initialForm = headers.reduce((acc, h) => ({ ...acc, [h.key]: "" }), {});
    setForm(index !== null ? data[index] : initialForm);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = () => {
    const requiredKeys = headers.map(h => h.key);
    const completeForm = requiredKeys.reduce((acc, key) => ({
      ...acc,
      [key]: form[key] || ""
    }), {});

    const updated = [...data];
    if (editIndex !== null) updated[editIndex] = completeForm;
    else updated.push(completeForm);
    setData(updated);
    setModalOpen(false);
  };

  const handleDelete = (index: number) => {
    if(window.confirm("¿Estás seguro de que quieres eliminar este registro?")) {
        setData(data.filter((_, i) => i !== index));
    }
  };

  const baseButtonClass = "flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg";

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      
      {/* Encabezado y Botones */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white p-4 rounded-xl shadow-lg border">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-3 md:mb-0">📊 Gestión PEI: Matriz de Planificación</h2>
        <div className="flex gap-3">
          <button 
            className={`${baseButtonClass} bg-green-600 text-white hover:bg-green-700`} 
            onClick={() => openModal()}
          >
            <Plus className="w-5 h-5" />
            Agregar Registro
          </button>
          <button 
            className={`${baseButtonClass} bg-blue-600 text-white hover:bg-blue-700`}
            // Lógica de exportación
          >
            <FileText className="w-5 h-5" />
            Exportar Excel
          </button>
        </div>
      </div>

      {/* 🟢 Renderizado del Componente de Presentación (Tabla) */}
      <MatrizTable 
        headers={headers}
        data={data}
        openModal={openModal}
        handleDelete={handleDelete}
      />

      {/* 🟢 Renderizado del Componente de Presentación (Modal) */}
      {modalOpen && (
        <MatrizModal
            modalOpen={modalOpen}
            editIndex={editIndex}
            form={form}
            headers={headers}
            handleChange={handleChange}
            handleSave={handleSave}
            closeModal={closeModal}
        />
      )}
    </div>
  );
}
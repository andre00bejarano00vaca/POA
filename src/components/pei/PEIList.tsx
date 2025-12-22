"use client";
import React, { useState, useMemo } from "react";
// Importamos la DynamicTable y el tipo de configuración
import { DynamicTable, ColumnConfig } from "@/components/pei/DynamicTable";
import PEIForm from "@/components/pei/PeiForm"; // Asumo que el formulario sigue existiendo

// 1. Definición de la interfaz de datos
interface PEI {
  id_pei: number;
  anio_ini: string;
  anio_fin: string;
  observaciones: string;
  meta_total: number;
  ejecucion: number;
  activo: boolean;
}

// Formateador de moneda (opcional, pero profesional)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB', minimumFractionDigits: 2 }).format(amount);
};


export default function PEIList() {
  // 2. Estado de datos
  const [peis, setPeis] = useState<PEI[]>([
    {
      id_pei: 2,
      anio_ini: "1 de enero de 2025",
      anio_fin: "31 de diciembre de 2025",
      observaciones: "",
      meta_total: 1000000,
      ejecucion: 750000,
      activo: true,
    },
    {
      id_pei: 1,
      anio_ini: "1 de enero de 2026",
      anio_fin: "31 de diciembre de 2030",
      observaciones: "PEI a largo plazo",
      meta_total: 0,
      ejecucion: 0,
      activo: true,
    },
    {
        id_pei: 3,
        anio_ini: "1 de enero de 2020",
        anio_fin: "31 de diciembre de 2024",
        observaciones: "PEI anterior, inactivo",
        meta_total: 2500000,
        ejecucion: 2500000,
        activo: false,
      },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // 3. Lógica de Filtrado (usando useMemo para optimización)
  const filteredPEIs = useMemo(() => {
    return peis.filter(
      (p) =>
        p.anio_ini.toLowerCase().includes(search.toLowerCase()) ||
        p.anio_fin.toLowerCase().includes(search.toLowerCase()) ||
        String(p.id_pei).includes(search)
    );
  }, [peis, search]);

  const handleAddPEI = (newPEI: PEI) => {
    setPeis([newPEI, ...peis]);
    setShowModal(false);
  };
  
  // 4. Configuración de Columnas DINÁMICA (Aquí se adapta al JSON)
  // Esta configuración es lo que se pasaría al componente de tabla
  const peiColumns: ColumnConfig<PEI>[] = [
    { 
      key: "id_pei", 
      header: "ID", 
      className: "text-center font-medium w-16" 
    },
    { 
      key: "anio_ini", 
      header: "Año Inicio",
      className: "font-mono" // Estilo para fechas/años
    },
    { 
      key: "anio_fin", 
      header: "Año Fin",
      className: "font-mono" 
    },
    { 
      key: "meta_total", 
      header: "Meta Total", 
      className: "text-right font-semibold", 
      // Usamos la función render para formatear la moneda
      render: (item) => formatCurrency(item.meta_total), 
    },
    { 
      key: "ejecucion", 
      header: "Ejecución", 
      className: "text-right text-green-700",
      // Renderizado condicional
      render: (item) => (
        <span className={item.ejecucion > 0 ? 'text-green-600 font-medium' : 'text-gray-400'}>
            {formatCurrency(item.ejecucion)}
        </span>
      ),
    },
    { 
      key: "activo", 
      header: "Estado", 
      className: "text-center",
      // Renderizado con iconos profesionales
      render: (item) => (
        <span 
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
            {item.activo ? "✅ Activo" : "❌ Inactivo"}
        </span>
      ),
    },
    // Columna de Acciones (dinámica)
    {
      key: "actions",
      header: "Acciones",
      className: "text-center w-32",
      render: (item) => (
        <div className="flex justify-center space-x-2">
            <button
                title="Editar"
                className="text-blue-600 hover:text-blue-800 transition duration-150"
                onClick={() => alert(`Editar PEI: ${item.id_pei}`)}
            >
                ⚙️
            </button>
            <button
                title="Ver Detalle"
                className="text-gray-600 hover:text-gray-800 transition duration-150"
                onClick={() => alert(`Detalle de PEI: ${item.id_pei}`)}
            >
                🔎
            </button>
        </div>
      )
    }
  ];

  // 5. Renderizado con estilo empresarial
  return (
    <div className="w-full mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6 lg:p-10">
        
        {/* Cabecera y Botón */}
        <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            📊 Plan Estratégico Institucional (PEI)
          </h1>
          <button
            onClick={() => setShowModal(true)}
            // Botón con color primario empresarial (ej: azul)
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition duration-150 flex items-center gap-2 font-semibold"
          >
            <span>➕</span> Añadir Nuevo PEI
          </button>
        </div>

        {/* Barra de Búsqueda y Herramientas */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar por ID, año inicial o final..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // Estilo de input profesional
            className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2 flex-1 shadow-sm transition duration-150"
          />
          {/* Aquí podrías añadir un botón de Filtro Avanzado */}
        </div>

        {/* Tabla Dinámica */}
        <DynamicTable 
            data={filteredPEIs} 
            columns={peiColumns} 
            emptyMessage="No se encontraron Planes Estratégicos Institucionales que coincidan con la búsqueda."
        />

        {/* Modal de Adición */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 w-full max-w-2xl relative shadow-xl">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Crear Nuevo PEI</h2>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                <span className="text-2xl font-light">✕</span>
              </button>
              {/* Asume que PEIForm tiene la lógica para manejar la adición */}
              <PEIForm onAdd={handleAddPEI} /> 
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import React, { useEffect, useRef, useState } from "react";

interface AccionEstrategica {
  id: number;
  descripcion: string;
}

// ⭐ Datos MOCK
const ACCIONES_MOCK: AccionEstrategica[] = [
  { id: 1, descripcion: "Optimizar sistemas institucionales" },
  { id: 2, descripcion: "Mejorar procesos de gestión académica" },
  { id: 3, descripcion: "Fortalecer el desarrollo organizacional" },
];

export default function FormIndicadorPEI() {
  // Estados del formulario
  const [descripcion, setDescripcion] = useState("");
  const [formula, setFormula] = useState("");
  const [lineaBase, setLineaBase] = useState("");
  const [meta, setMeta] = useState("");

  // Estados del select buscable
  const [searchAccion, setSearchAccion] = useState("");
  const [selectedAccion, setSelectedAccion] = useState<AccionEstrategica | null>(null);
  const [openAccion, setOpenAccion] = useState(false);

  const wrapperAccionRef = useRef<HTMLDivElement | null>(null);

  const acciones = ACCIONES_MOCK;

  const filteredAcciones = acciones.filter((a) =>
    a.descripcion.toLowerCase().includes(searchAccion.toLowerCase())
  );

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperAccionRef.current && !wrapperAccionRef.current.contains(e.target as Node)) {
        setOpenAccion(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelectAccion = (accion: AccionEstrategica) => {
    setSelectedAccion(accion);
    setSearchAccion(accion.descripcion);
    setOpenAccion(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAccion) {
      alert("Debes seleccionar una Acción Estratégica.");
      return;
    }

    const payload = {
      descripcion,
      formula,
      linea_base: Number(lineaBase),
      meta: Number(meta),
      ACCION_ESTRATEGICA_INS_id_pei: selectedAccion.id,
    };

    console.log("Payload enviado:", payload);
  };

  // Estilos comunes para inputs para evitar repetición y errores de formato
  const inputClass = "w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        Formulario de Indicador PEI
      </h2>

      {/* DESCRIPCIÓN */}
      <div>
        <label className="block font-medium mb-1">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows={3}
          placeholder="Descripción del producto institucional..."
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* FORMULA */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Fórmula</label>
        <input
          type="text"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          placeholder="Ej: (valor_actual / total) * 100"
          className={inputClass}
          required
        />
      </div>

      {/* LÍNEA BASE */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Línea Base</label>
        <input
          type="number"
          value={lineaBase}
          onChange={(e) => setLineaBase(e.target.value)}
          placeholder="Valor inicial..."
          className={inputClass}
          required
        />
      </div>

      {/* META */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Meta</label>
        <input
          type="number"
          value={meta}
          onChange={(e) => setMeta(e.target.value)}
          placeholder="Meta propuesta..."
          className={inputClass}
          required
        />
      </div>

      {/* SELECT ACCIÓN ESTRATÉGICA */}
      <div ref={wrapperAccionRef} className="relative">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Acción Estratégica
        </label>

        <input
          type="text"
          placeholder="Buscar acción..."
          value={searchAccion}
          onChange={(e) => {
            setSearchAccion(e.target.value);
            setOpenAccion(true);
          }}
          onFocus={() => setOpenAccion(true)}
          aria-haspopup="listbox"
          aria-expanded={openAccion}
          className={inputClass}
          required={!selectedAccion} // Solo requerido si no hay nada seleccionado
        />

        {openAccion && (
          <ul
            role="listbox"
            className="absolute z-30 left-0 right-0 mt-2 max-h-56 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm"
          >
            {filteredAcciones.length > 0 ? (
              filteredAcciones.map((accion) => (
                <li
                  key={accion.id}
                  role="option"
                  aria-selected={selectedAccion?.id === accion.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedAccion?.id === accion.id ? "bg-blue-100 font-medium" : ""
                  }`}
                  onClick={() => handleSelectAccion(accion)}
                >
                  {accion.descripcion}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No se encontraron resultados</li>
            )}
          </ul>
        )}
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-3 rounded-md shadow-sm transition-all"
      >
        Guardar Indicador PEI
      </button>
    </form>
  );
}
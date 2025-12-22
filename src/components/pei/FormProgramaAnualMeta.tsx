"use client";

import React, { useEffect, useRef, useState } from "react";

interface UnidadEjecutora {
  id: number;
  nombre: string;
}

interface IndicadorPEI {
  id: number;
  descripcion: string;
}

// Mock de datos
const UNIDADES_MOCK: UnidadEjecutora[] = [
  { id: 1, nombre: "Unidad Administrativa 1" },
  { id: 2, nombre: "Unidad Administrativa 2" },
  { id: 3, nombre: "Unidad Administrativa 3" },
];

const INDICADORES_MOCK: IndicadorPEI[] = [
  { id: 1, descripcion: "Indicador 1" },
  { id: 2, descripcion: "Indicador 2" },
  { id: 3, descripcion: "Indicador 3" },
];

export default function FormProgramaAnualMeta() {
  // Estados de inputs
  const [anio, setAnio] = useState("");
  const [programado, setProgramado] = useState("");
  const [ejecutado, setEjecutado] = useState("");

  // Select UNIDAD EJECUTORA
  const [searchUE, setSearchUE] = useState("");
  const [selectedUE, setSelectedUE] = useState<UnidadEjecutora | null>(null);
  const [openUE, setOpenUE] = useState(false);
  const wrapperUERef = useRef<HTMLDivElement | null>(null);

  // Select INDICADOR PEI
  const [searchIPEI, setSearchIPEI] = useState("");
  const [selectedIPEI, setSelectedIPEI] = useState<IndicadorPEI | null>(null);
  const [openIPEI, setOpenIPEI] = useState(false);
  const wrapperIPEIRef = useRef<HTMLDivElement | null>(null);

  // Filtrado dinámico
  const filteredUE = UNIDADES_MOCK.filter((u) =>
    u.nombre.toLowerCase().includes(searchUE.toLowerCase())
  );
  const filteredIPEI = INDICADORES_MOCK.filter((i) =>
    i.descripcion.toLowerCase().includes(searchIPEI.toLowerCase())
  );

  // Click fuera para cerrar dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperUERef.current && !wrapperUERef.current.contains(e.target as Node)) {
        setOpenUE(false);
      }
      if (wrapperIPEIRef.current && !wrapperIPEIRef.current.contains(e.target as Node)) {
        setOpenIPEI(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Selección
  const handleSelectUE = (ue: UnidadEjecutora) => {
    setSelectedUE(ue);
    setSearchUE(ue.nombre);
    setOpenUE(false);
  };

  const handleSelectIPEI = (i: IndicadorPEI) => {
    setSelectedIPEI(i);
    setSearchIPEI(i.descripcion);
    setOpenIPEI(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUE || !selectedIPEI) {
      alert("Debes seleccionar Unidad Ejecutora y Indicador PEI.");
      return;
    }

    const payload = {
      anio: Number(anio),
      programado: Number(programado),
      ejecutado: Number(ejecutado),
      UNIDAD_EJECUTORA_id_ue: selectedUE.id,
      INDICADOR_PEI_id_ipei: selectedIPEI.id,
    };

    console.log("Payload enviado:", payload);
    // aquí iría la petición a la API
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Formulario Programa Anual Meta
      </h2>

      {/* Año */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Año</label>
        <input
          type="number"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          placeholder="Ingrese el año"
          className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
        />
      </div>

      {/* Programado */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Programado</label>
        <input
          type="number"
          value={programado}
          onChange={(e) => setProgramado(e.target.value)}
          placeholder="Cantidad programada"
          className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
        />
      </div>

      {/* Ejecutado */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Ejecutado</label>
        <input
          type="number"
          value={ejecutado}
          onChange={(e) => setEjecutado(e.target.value)}
          placeholder="Cantidad ejecutada"
          className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
        />
      </div>

      {/* SELECT UNIDAD EJECUTORA */}
      <div ref={wrapperUERef} className="relative">
        <label className="block text-sm font-medium mb-1 text-gray-700">Unidad Ejecutora</label>
        <input
          type="text"
          placeholder="Buscar unidad ejecutora..."
          value={searchUE}
          onChange={(e) => {
            setSearchUE(e.target.value);
            setOpenUE(true);
          }}
          onFocus={() => setOpenUE(true)}
          aria-haspopup="listbox"
          aria-expanded={openUE}
          className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
        />
        {openUE && (
          <ul
            role="listbox"
            className="absolute z-30 left-0 right-0 mt-2 max-h-56 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm"
          >
            {filteredUE.length > 0 ? (
              filteredUE.map((ue) => (
                <li
                  key={ue.id}
                  role="option"
                  aria-selected={selectedUE?.id === ue.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedUE?.id === ue.id ? "bg-blue-100 font-medium" : ""
                  }`}
                  onClick={() => handleSelectUE(ue)}
                >
                  {ue.nombre}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No se encontraron resultados</li>
            )}
          </ul>
        )}
      </div>

      {/* SELECT INDICADOR PEI */}
      <div ref={wrapperIPEIRef} className="relative">
        <label className="block text-sm font-medium mb-1 text-gray-700">Indicador PEI</label>
        <input
          type="text"
          placeholder="Buscar indicador..."
          value={searchIPEI}
          onChange={(e) => {
            setSearchIPEI(e.target.value);
            setOpenIPEI(true);
          }}
          onFocus={() => setOpenIPEI(true)}
          aria-haspopup="listbox"
          aria-expanded={openIPEI}
          className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
        />
        {openIPEI && (
          <ul
            role="listbox"
            className="absolute z-30 left-0 right-0 mt-2 max-h-56 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm"
          >
            {filteredIPEI.length > 0 ? (
              filteredIPEI.map((i) => (
                <li
                  key={i.id}
                  role="option"
                  aria-selected={selectedIPEI?.id === i.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedIPEI?.id === i.id ? "bg-blue-100 font-medium" : ""
                  }`}
                  onClick={() => handleSelectIPEI(i)}
                >
                  {i.descripcion}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No se encontraron resultados</li>
            )}
          </ul>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-3 rounded-md shadow-sm transition-all"
      >
        Guardar Programa Anual Meta
      </button>
    </form>
  );
}

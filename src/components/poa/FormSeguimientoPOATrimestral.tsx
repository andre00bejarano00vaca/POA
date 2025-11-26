"use client";
import React, { useState, useRef, useEffect } from "react";

interface POA {
  id: number;
  descripcion: string;
}

const FormSeguimientoPOATrimestral = () => {
  // Opciones simuladas de POA
  const poaOptions: POA[] = [
    { id: 1, descripcion: "POA Gestión 2024" },
    { id: 2, descripcion: "POA Gestión 2025" },
    { id: 3, descripcion: "POA Proyectos Especiales" },
  ];

  const [selectedPOA, setSelectedPOA] = useState<POA | null>(null);
  const [searchPOA, setSearchPOA] = useState("");
  const [openPOA, setOpenPOA] = useState(false);

  const wrapperPOARef = useRef<HTMLDivElement>(null);
  const inputPOARef = useRef<HTMLInputElement>(null);

  // Campos del formulario
  const [fechaRegistro, setFechaRegistro] = useState("");

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperPOARef.current && !wrapperPOARef.current.contains(event.target as Node)) {
        setOpenPOA(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPOA = poaOptions.filter((p) =>
    p.descripcion.toLowerCase().includes(searchPOA.toLowerCase())
  );

  const handleSelectPOA = (poa: POA) => {
    setSelectedPOA(poa);
    setSearchPOA(poa.descripcion);
    setOpenPOA(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      poa_id_poa: selectedPOA?.id ?? null,
      fecha_registro: fechaRegistro,
    });

    // Aquí haces el POST a tu API
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Seguimiento POA Trimestral
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* FECHA REGISTRO */}
        <div>
          <label className="block text-sm font-medium mb-1">Fecha de Registro</label>
          <input
            type="date"
            value={fechaRegistro}
            onChange={(e) => setFechaRegistro(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* POA */}
        <div ref={wrapperPOARef} className="relative">
          <label className="block text-sm font-medium mb-1">POA</label>

          <input
            ref={inputPOARef}
            type="text"
            placeholder="Buscar POA..."
            value={searchPOA}
            onChange={(e) => {
              setSearchPOA(e.target.value);
              setOpenPOA(true);
            }}
            onFocus={() => setOpenPOA(true)}
            className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />

          {openPOA && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow text-sm">
              {filteredPOA.length > 0 ? (
                filteredPOA.map((poa) => (
                  <li
                    key={poa.id}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                      selectedPOA?.id === poa.id ? "bg-blue-100 font-medium" : ""
                    }`}
                    onClick={() => handleSelectPOA(poa)}
                  >
                    {poa.descripcion}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-500">No se encontró</li>
              )}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Guardar Seguimiento POA Trimestral
        </button>
      </form>
    </div>
  );
};

export default FormSeguimientoPOATrimestral;

"use client";
import React, { useState, useRef, useEffect } from "react";

interface PEI {
  id: number;
  año_inicio: string;
  año_fin: string;
}

const AREAForm = () => {
  const peiOptions: PEI[] = [
    { id: 1, año_inicio: "2023-01-01", año_fin: "2023-12-31" },
    { id: 2, año_inicio: "2024-01-01", año_fin: "2024-12-31" },
    { id: 3, año_inicio: "2025-01-01", año_fin: "2025-12-31" },
  ];

  const [descripcion, setDescripcion] = useState("");
  const [selectedPEI, setSelectedPEI] = useState<PEI | null>(null);
  const [searchPEI, setSearchPEI] = useState("");
  const [openPEI, setOpenPEI] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtrar PEIs por búsqueda
  const filteredPEI = peiOptions.filter((p) =>
    `${p.año_inicio} - ${p.año_fin}`.includes(searchPEI)
  );

  // Click fuera del componente cierra el dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenPEI(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPEI = (pei: PEI) => {
    setSelectedPEI(pei);
    setSearchPEI(`${pei.año_inicio} - ${pei.año_fin}`);
    setOpenPEI(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      descripcion,
      PEI_id: selectedPEI?.id ?? null,
    });
    // Aquí va tu lógica para enviar a la API
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Formulario Área Estratégica</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Descripción */}
        <div>
          <label className="block font-medium mb-1">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            placeholder="Descripción del área estratégica..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* PEI */}
        <div ref={wrapperRef} className="relative mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Seleccionar PEI
          </label>
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar PEI..."
            value={searchPEI}
            onChange={(e) => {
              setSearchPEI(e.target.value);
              setOpenPEI(true);
            }}
            onFocus={() => setOpenPEI(true)}
            className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />

          {openPEI && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm animate-fadeIn">
              {filteredPEI.length > 0 ? (
                filteredPEI.map((p) => (
                  <li
                    key={p.id}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                      selectedPEI?.id === p.id ? "bg-blue-100 font-medium" : ""
                    }`}
                    onClick={() => handleSelectPEI(p)}
                  >
                    {p.año_inicio} - {p.año_fin}
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
          Guardar Área Estratégica
        </button>
      </form>
    </div>
  );
};

export default AREAForm;

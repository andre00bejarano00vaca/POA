"use client";
import React, { useState, useRef, useEffect } from "react";

interface AreaEstr {
  id: number;
  descripcion: string;
}

const PoliticaForm = () => {
  // Simulamos áreas estratégicas
  const areaOptions: AreaEstr[] = [
    { id: 1, descripcion: "Mejorar infraestructura tecnológica " },
    { id: 2, descripcion: "Fortalecer investigación académica" },
    { id: 3, descripcion: "Optimizar procesos administrativos" },
  ];

  const [descripcion, setDescripcion] = useState("");
  const [selectedArea, setSelectedArea] = useState<AreaEstr | null>(null);
  const [searchArea, setSearchArea] = useState("");
  const [openArea, setOpenArea] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtrar áreas según búsqueda
  const filteredAreas = areaOptions.filter((a) =>
    a.descripcion.toLowerCase().includes(searchArea.toLowerCase())
  );

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenArea(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectArea = (area: AreaEstr) => {
    setSelectedArea(area);
    setSearchArea(area.descripcion);
    setOpenArea(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      descripcion,
      area_estrategica_id: selectedArea?.id ?? null,
    });
    // Aquí iría la lógica para enviar a tu API
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Formulario Política Desarrollo Institucional</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Descripción */}
        <div>
          <label className="block font-medium mb-1">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            placeholder="Descripción de la política..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Área Estratégica */}
        <div ref={wrapperRef} className="relative mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Área Estratégica
          </label>
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar área estratégica..."
            value={searchArea}
            onChange={(e) => {
              setSearchArea(e.target.value);
              setOpenArea(true);
            }}
            onFocus={() => setOpenArea(true)}
            className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />

          {openArea && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm animate-fadeIn">
              {filteredAreas.length > 0 ? (
                filteredAreas.map((a) => (
                  <li
                    key={a.id}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                      selectedArea?.id === a.id ? "bg-blue-100 font-medium" : ""
                    }`}
                    onClick={() => handleSelectArea(a)}
                  >
                    {a.descripcion}
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
          Guardar Política
        </button>
      </form>
    </div>
  );
};

export default PoliticaForm;

"use client";
import React, { useState, useRef, useEffect } from "react";

interface ProgramaPOA {
  id: number;
  descripcion: string;
}

const ObjetivoInstitucionalACPForm = () => {
  // Datos simulados de Programa POA
  const programaOptions: ProgramaPOA[] = [
    { id: 1, descripcion: "Programa Anual Educativo" },
    { id: 2, descripcion: "Programa de Infraestructura" },
    { id: 3, descripcion: "Programa de Innovación Académica" },
  ];

  // Estados de inputs
  const [descripcion, setDescripcion] = useState("");
  const [OBJETIVO_INSTITUCIONAL_ACPcol, setOBJETIVO_INSTITUCIONAL_ACPcol] = useState("");

  // Estados de referencia
  const [searchPrograma, setSearchPrograma] = useState("");
  const [selectedPrograma, setSelectedPrograma] = useState<ProgramaPOA | null>(null);
  const [openPrograma, setOpenPrograma] = useState(false);

  const wrapperProgramaRef = useRef<HTMLDivElement>(null);

  // Filtrar opciones
  const filteredProgramas = programaOptions.filter((p) =>
    p.descripcion.toLowerCase().includes(searchPrograma.toLowerCase())
  );

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperProgramaRef.current && !wrapperProgramaRef.current.contains(event.target as Node)) {
        setOpenPrograma(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      descripcion,
      OBJETIVO_INSTITUCIONAL_ACPcol,
      Programa_POA_id_ppoa: selectedPrograma?.id ?? null,
    });
    // Aquí envías los datos a tu API
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Formulario Objetivo Institucional ACP</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* DESCRIPCIÓN */}
        <div>
          <label className="block font-medium mb-1">descripcion</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            placeholder="Descripción del objetivo institucional..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* OBJETIVO_INSTITUCIONAL_ACPcol */}
        <div>
          <label className="block font-medium mb-1">Objetivo Institucional ACP</label>
          <input
            type="text"
            value={OBJETIVO_INSTITUCIONAL_ACPcol}
            onChange={(e) => setOBJETIVO_INSTITUCIONAL_ACPcol(e.target.value)}
            placeholder="Código o referencia..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* PROGRAMA POA */}
        <div ref={wrapperProgramaRef} className="relative mb-4">
          <label className="block font-medium mb-1">Programa POA</label>
          <input
            type="text"
            value={searchPrograma}
            onChange={(e) => {
              setSearchPrograma(e.target.value);
              setOpenPrograma(true);
            }}
            onFocus={() => setOpenPrograma(true)}
            placeholder="Buscar Programa POA..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {openPrograma && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm">
              {filteredProgramas.length > 0 ? (
                filteredProgramas.map((p) => (
                  <li
                    key={p.id}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                      selectedPrograma?.id === p.id ? "bg-blue-100 font-medium" : ""
                    }`}
                    onClick={() => {
                      setSelectedPrograma(p);
                      setSearchPrograma(p.descripcion);
                      setOpenPrograma(false);
                    }}
                  >
                    {p.descripcion}
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
          Guardar Objetivo Institucional ACP
        </button>
      </form>
    </div>
  );
};

export default ObjetivoInstitucionalACPForm;

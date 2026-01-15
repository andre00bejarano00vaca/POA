"use client";
import React, { useState, useRef, useEffect } from "react";

interface Indicador {
  id: number;
  descripcion: string;
}

const ProgramacionTrimestralMetaForm = ({
  indicadores,
}: {
  indicadores: Indicador[];
}) => {
  const [trimestre, setTrimestre] = useState("");
  const [programado, setProgramado] = useState("");
  const [ejecutado, setEjecutado] = useState("");

  const [selectedIndicador, setSelectedIndicador] = useState<Indicador | null>(
    null
  );
  const [searchIndicador, setSearchIndicador] = useState("");
  const [openIndicador, setOpenIndicador] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filtrar indicadores
  const filteredIndicadores = indicadores.filter((i) =>
    i.descripcion.toLowerCase().includes(searchIndicador.toLowerCase())
  );

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpenIndicador(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectIndicador = (i: Indicador) => {
    setSelectedIndicador(i);
    setSearchIndicador(i.descripcion);
    setOpenIndicador(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      trimestre,
      programado,
      ejecutado,
      indicador_pei_id: selectedIndicador?.id ?? null,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Programación Trimestral Meta
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* TRIMESTRE */}
        <div className="col-span-1">
          <label className="block font-medium mb-1">Trimestre</label>
          <select
            value={trimestre}
            onChange={(e) => setTrimestre(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          >
            <option value="">Seleccione…</option>
            <option value="1">1er Trimestre</option>
            <option value="2">2do Trimestre</option>
            <option value="3">3er Trimestre</option>
            <option value="4">4to Trimestre</option>
          </select>
        </div>

        {/* PROGRAMADO */}
        <div>
          <label className="block font-medium mb-1">Programado</label>
          <input
            type="number"
            value={programado}
            onChange={(e) => setProgramado(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* EJECUTADO */}
        <div>
          <label className="block font-medium mb-1">Ejecutado</label>
          <input
            type="number"
            value={ejecutado}
            onChange={(e) => setEjecutado(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* INDICADOR */}
        <div className="col-span-2" ref={wrapperRef}>
          <label className="block font-medium mb-1">Indicador</label>
          <input
            type="text"
            placeholder="Buscar indicador…"
            value={searchIndicador}
            onChange={(e) => {
              setSearchIndicador(e.target.value);
              setOpenIndicador(true);
            }}
            onFocus={() => setOpenIndicador(true)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          {openIndicador && (
            <ul className="absolute z-40 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
              {filteredIndicadores.length > 0 ? (
                filteredIndicadores.map((ind) => (
                  <li
                    key={ind.id}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                      selectedIndicador?.id === ind.id
                        ? "bg-blue-100 font-medium"
                        : ""
                    }`}
                    onClick={() => handleSelectIndicador(ind)}
                  >
                    {ind.descripcion}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-500 text-sm">
                  No se encontró…
                </li>
              )}
            </ul>
          )}
        </div>

        {/* SUBMIT */}
        <div className="col-span-2 mt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 shadow transition"
          >
            Guardar Programación Trimestral
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProgramacionTrimestralMetaForm;

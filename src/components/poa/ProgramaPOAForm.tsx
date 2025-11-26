"use client";
import React, { useState, useRef, useEffect } from "react";

interface ProgrAnualMeta {
  id: number;
  descripcion: string;
}

const ProgramaPOAForm = () => {
  // Datos simulados de PROGR_ANUAL_META
  const metaOptions: ProgrAnualMeta[] = [
    { id: 1, descripcion: "Meta Anual 2025" },
    { id: 2, descripcion: "Meta Anual 2026" },
    { id: 3, descripcion: "Meta Anual 2027" },
  ];

  // Estados de inputs
  const [anio, setAnio] = useState<number | "">("");
  const [fechaRegistro, setFechaRegistro] = useState("");
  const [observaciones, setObservaciones] = useState("");

  // Estados de referencia
  const [searchMeta, setSearchMeta] = useState("");
  const [selectedMeta, setSelectedMeta] = useState<ProgrAnualMeta | null>(null);
  const [openMeta, setOpenMeta] = useState(false);

  const wrapperMetaRef = useRef<HTMLDivElement>(null);

  // Filtrar opciones
  const filteredMetas = metaOptions.filter((m) =>
    m.descripcion.toLowerCase().includes(searchMeta.toLowerCase())
  );

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperMetaRef.current && !wrapperMetaRef.current.contains(event.target as Node)) {
        setOpenMeta(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      anio,
      fecha_registro: fechaRegistro,
      observaciones,
      PROGR_ANUAL_META_id_pam: selectedMeta?.id ?? null,
    });
    // Aquí envías los datos a tu API
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Formulario Programa POA</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* AÑO */}
        <div>
          <label className="block font-medium mb-1">Año</label>
          <input
            type="number"
            value={anio}
            onChange={(e) => setAnio(Number(e.target.value))}
            placeholder="Ingrese el año..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* FECHA_REGISTRO */}
        <div>
          <label className="block font-medium mb-1">fecha de registro</label>
          <input
            type="date"
            value={fechaRegistro}
            onChange={(e) => setFechaRegistro(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* OBSERVACIONES */}
        <div>
          <label className="block font-medium mb-1">observaciones</label>
          <input
            type="text"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Observaciones..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* PROGR_ANUAL_META */}
        <div ref={wrapperMetaRef} className="relative mb-4">
          <label className="block font-medium mb-1">Programa Anual</label>
          <input
            type="text"
            value={searchMeta}
            onChange={(e) => {
              setSearchMeta(e.target.value);
              setOpenMeta(true);
            }}
            onFocus={() => setOpenMeta(true)}
            placeholder="Buscar Meta Anual..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {openMeta && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm">
              {filteredMetas.length > 0 ? (
                filteredMetas.map((m) => (
                  <li
                    key={m.id}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                      selectedMeta?.id === m.id ? "bg-blue-100 font-medium" : ""
                    }`}
                    onClick={() => {
                      setSelectedMeta(m);
                      setSearchMeta(m.descripcion);
                      setOpenMeta(false);
                    }}
                  >
                    {m.descripcion}
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
          Guardar Programa POA
        </button>
      </form>
    </div>
  );
};

export default ProgramaPOAForm;

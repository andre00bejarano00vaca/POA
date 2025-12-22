"use client";
import React, { useState, useRef, useEffect } from "react";

interface Politica {
  id: number;
  descripcion: string;
}

const ObjetivoEstrategicoAMPForm = () => {
  // Datos simulados de Política de Desarrollo
  const politicaOptions: Politica[] = [
    { id: 1, descripcion: "Fortalecer la gestión institucional" },
    { id: 2, descripcion: "Impulsar la innovación educativa" },
    { id: 3, descripcion: "Modernizar infraestructura y procesos" },
  ];

  const [descripcion, setDescripcion] = useState("");
  const [selectedPolitica, setSelectedPolitica] = useState<Politica | null>(null);
  const [searchPolitica, setSearchPolitica] = useState("");
  const [openPolitica, setOpenPolitica] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtrar políticas según búsqueda
  const filteredPoliticas = politicaOptions.filter((p) =>
    p.descripcion.toLowerCase().includes(searchPolitica.toLowerCase())
  );

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenPolitica(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPolitica = (p: Politica) => {
    setSelectedPolitica(p);
    setSearchPolitica(p.descripcion);
    setOpenPolitica(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      descripcion,
      politica_desarrollo_id_pd: selectedPolitica?.id ?? null,
    });

    // Aquí envías los datos a tu API
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Formulario Objetivo Estratégico AMP
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* DESCRIPCION */}
        <div>
          <label className="block font-medium mb-1">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            placeholder="Descripción del objetivo estratégico..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* POLÍTICA DE DESARROLLO */}
        <div ref={wrapperRef} className="relative mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Política de Desarrollo
          </label>

          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar política..."
            value={searchPolitica}
            onChange={(e) => {
              setSearchPolitica(e.target.value);
              setOpenPolitica(true);
            }}
            onFocus={() => setOpenPolitica(true)}
            className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />

          {openPolitica && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm animate-fadeIn">
              {filteredPoliticas.length > 0 ? (
                filteredPoliticas.map((p) => (
                  <li
                    key={p.id}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                      selectedPolitica?.id === p.id ? "bg-blue-100 font-medium" : ""
                    }`}
                    onClick={() => handleSelectPolitica(p)}
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
          Guardar Objetivo Estratégico AMP
        </button>
      </form>
    </div>
  );
};

export default ObjetivoEstrategicoAMPForm;

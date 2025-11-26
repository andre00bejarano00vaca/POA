"use client";
import React, { useState, useRef, useEffect } from "react";

interface Objetivo {
  id: number;
  descripcion: string;
}

const ProductoInstitucionalForm = () => {
  // Datos simulados de Objetivo Estratégico AMP
  const objetivoOptions: Objetivo[] = [
    { id: 1, descripcion: "Incrementar la eficiencia administrativa" },
    { id: 2, descripcion: "Optimizar la calidad educativa" },
    { id: 3, descripcion: "Fortalecer la gestión académica" },
  ];

  const [descripcion, setDescripcion] = useState("");
  const [selectedObjetivo, setSelectedObjetivo] = useState<Objetivo | null>(null);
  const [searchObjetivo, setSearchObjetivo] = useState("");
  const [openObjetivo, setOpenObjetivo] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtrar según búsqueda
  const filteredObjetivos = objetivoOptions.filter((o) =>
    o.descripcion.toLowerCase().includes(searchObjetivo.toLowerCase())
  );

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenObjetivo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectObjetivo = (o: Objetivo) => {
    setSelectedObjetivo(o);
    setSearchObjetivo(o.descripcion);
    setOpenObjetivo(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      descripcion,
      objetivo_estrategico_id: selectedObjetivo?.id ?? null,
    });

    // Aquí envías los datos a tu API
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Formulario Producto Institucional
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* OBJETIVO ESTRATÉGICO AMP */}
        <div ref={wrapperRef} className="relative mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Objetivo Estratégico AMP
          </label>

          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar objetivo estratégico..."
            value={searchObjetivo}
            onChange={(e) => {
              setSearchObjetivo(e.target.value);
              setOpenObjetivo(true);
            }}
            onFocus={() => setOpenObjetivo(true)}
            className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />

          {openObjetivo && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm animate-fadeIn">
              {filteredObjetivos.length > 0 ? (
                filteredObjetivos.map((o) => (
                  <li
                    key={o.id}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                      selectedObjetivo?.id === o.id ? "bg-blue-100 font-medium" : ""
                    }`}
                    onClick={() => handleSelectObjetivo(o)}
                  >
                    {o.descripcion}
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
          Guardar Producto Institucional
        </button>
      </form>
    </div>
  );
};

export default ProductoInstitucionalForm;

"use client";
import React, { useState, useRef, useEffect } from "react";

interface ObjetivoInstitucionalACP {
  id: number;
  descripcion: string;
}

const ProductoForm = () => {
  // Datos simulados de Objetivo Institucional ACP
  const objetivosOptions: ObjetivoInstitucionalACP[] = [
    { id: 1, descripcion: "Fortalecer gestión institucional" },
    { id: 2, descripcion: "Mejorar desempeño académico" },
    { id: 3, descripcion: "Incrementar eficiencia operativa" },
  ];

  // Estados de inputs
  const [descripcion, setDescripcion] = useState("");
  
  // Estados de referencia
  const [searchObjetivo, setSearchObjetivo] = useState("");
  const [selectedObjetivo, setSelectedObjetivo] = useState<ObjetivoInstitucionalACP | null>(null);
  const [openObjetivo, setOpenObjetivo] = useState(false);

  const wrapperObjetivoRef = useRef<HTMLDivElement>(null);

  // Filtrar opciones
  const filteredObjetivos = objetivosOptions.filter((o) =>
    o.descripcion.toLowerCase().includes(searchObjetivo.toLowerCase())
  );

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperObjetivoRef.current && !wrapperObjetivoRef.current.contains(event.target as Node)) {
        setOpenObjetivo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      descripcion,
      OBJETIVO_INSTITUCIONAL_ACP_id_oi: selectedObjetivo?.id ?? null,
    });
    // Aquí enviarías los datos a tu API
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Formulario PRODUCTO</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* DESCRIPCIÓN */}
        <div>
          <label className="block font-medium mb-1">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            placeholder="Descripción del producto..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* OBJETIVO INSTITUCIONAL ACP */}
        <div ref={wrapperObjetivoRef} className="relative mb-4">
          <label className="block font-medium mb-1">Objetivo Institucional ACP</label>
          <input
            type="text"
            value={searchObjetivo}
            onChange={(e) => {
              setSearchObjetivo(e.target.value);
              setOpenObjetivo(true);
            }}
            onFocus={() => setOpenObjetivo(true)}
            placeholder="Buscar objetivo..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {openObjetivo && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm">
              {filteredObjetivos.length > 0 ? (
                filteredObjetivos.map((o) => (
                  <li
                    key={o.id}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                      selectedObjetivo?.id === o.id ? "bg-blue-100 font-medium" : ""
                    }`}
                    onClick={() => {
                      setSelectedObjetivo(o);
                      setSearchObjetivo(o.descripcion);
                      setOpenObjetivo(false);
                    }}
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
          Guardar PRODUCTO
        </button>
      </form>
    </div>
  );
};

export default ProductoForm;

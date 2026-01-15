"use client";
import React, { useState, useRef, useEffect } from "react";

interface EntidadTransferenciaGasto {
  id: number;
  nombre: string;
}

interface BecaEstudio {
  id: number;
  nombre: string;
}

interface FuenteOrganismo {
  id: number;
  nombre: string;
}

const ObjetoGastoForm = () => {
  // Datos de ejemplo
  const entidadOptions: EntidadTransferenciaGasto[] = [
    { id: 1, nombre: "Entidad A" },
    { id: 2, nombre: "Entidad B" },
  ];
  const becaOptions: BecaEstudio[] = [
    { id: 1, nombre: "Beca Excelencia" },
    { id: 2, nombre: "Beca Innovación" },
  ];
  const fuenteOptions: FuenteOrganismo[] = [
    { id: 1, nombre: "Organismo X" },
    { id: 2, nombre: "Organismo Y" },
  ];

  // Estados inputs
  const [codigoGasto, setCodigoGasto] = useState("");
  const [importe, setImporte] = useState("");
  const [codigo, setCodigo] = useState("");

  // Dropdown Entidad Transferencia Gasto
  const [searchEntidad, setSearchEntidad] = useState("");
  const [selectedEntidad, setSelectedEntidad] = useState<EntidadTransferenciaGasto | null>(null);
  const [openEntidad, setOpenEntidad] = useState(false);
  const wrapperEntidadRef = useRef<HTMLDivElement>(null);

  // Dropdown Beca
  const [searchBeca, setSearchBeca] = useState("");
  const [selectedBeca, setSelectedBeca] = useState<BecaEstudio | null>(null);
  const [openBeca, setOpenBeca] = useState(false);
  const wrapperBecaRef = useRef<HTMLDivElement>(null);

  // Dropdown Fuente Organismo
  const [searchFuente, setSearchFuente] = useState("");
  const [selectedFuente, setSelectedFuente] = useState<FuenteOrganismo | null>(null);
  const [openFuente, setOpenFuente] = useState(false);
  const wrapperFuenteRef = useRef<HTMLDivElement>(null);

  const filteredEntidades = entidadOptions.filter((e) =>
    e.nombre.toLowerCase().includes(searchEntidad.toLowerCase())
  );
  const filteredBecas = becaOptions.filter((b) =>
    b.nombre.toLowerCase().includes(searchBeca.toLowerCase())
  );
  const filteredFuentes = fuenteOptions.filter((f) =>
    f.nombre.toLowerCase().includes(searchFuente.toLowerCase())
  );

  // Cerrar dropdowns al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperEntidadRef.current && !wrapperEntidadRef.current.contains(event.target as Node)) {
        setOpenEntidad(false);
      }
      if (wrapperBecaRef.current && !wrapperBecaRef.current.contains(event.target as Node)) {
        setOpenBeca(false);
      }
      if (wrapperFuenteRef.current && !wrapperFuenteRef.current.contains(event.target as Node)) {
        setOpenFuente(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      codigo_gasto: Number(codigoGasto),
      importe: Number(importe),
      codigo,
      ENTIDAD_TRANSFERENCIA_GASTOS_id_etg: selectedEntidad?.id ?? null,
      BECA_ESTUDIO_id_be: selectedBeca?.id ?? null,
      BECA_ESTUDIO_FUENTE_ORGANISMO_id_fo: selectedFuente?.id ?? null,
      BECA_ESTUDIO_BECA_id_beca: selectedBeca?.id ?? null, // asumiendo mismo dropdown
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Formulario OBJETO GASTO</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Código Gasto */}
        <div>
          <label className="block font-medium mb-1">Código Gasto</label>
          <input
            type="number"
            value={codigoGasto}
            onChange={(e) => setCodigoGasto(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Importe */}
        <div>
          <label className="block font-medium mb-1">Importe</label>
          <input
            type="number"
            value={importe}
            onChange={(e) => setImporte(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Código */}
        <div>
          <label className="block font-medium mb-1">Código</label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Entidad Transferencia Gasto */}
        <div ref={wrapperEntidadRef} className="relative mb-5">
          <label className="block text-sm font-medium mb-1">Entidad Transferencia Gasto</label>
          <input
            type="text"
            value={searchEntidad}
            onChange={(e) => {
              setSearchEntidad(e.target.value);
              setOpenEntidad(true);
            }}
            onFocus={() => setOpenEntidad(true)}
            placeholder="Buscar entidad..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {openEntidad && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm">
              {filteredEntidades.map((e) => (
                <li
                  key={e.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedEntidad?.id === e.id ? "bg-blue-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    setSelectedEntidad(e);
                    setSearchEntidad(e.nombre);
                    setOpenEntidad(false);
                  }}
                >
                  {e.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Beca Estudio */}
        <div ref={wrapperBecaRef} className="relative mb-5">
          <label className="block text-sm font-medium mb-1">Beca Estudio</label>
          <input
            type="text"
            value={searchBeca}
            onChange={(e) => {
              setSearchBeca(e.target.value);
              setOpenBeca(true);
            }}
            onFocus={() => setOpenBeca(true)}
            placeholder="Buscar beca..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {openBeca && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm">
              {filteredBecas.map((b) => (
                <li
                  key={b.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedBeca?.id === b.id ? "bg-blue-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    setSelectedBeca(b);
                    setSearchBeca(b.nombre);
                    setOpenBeca(false);
                  }}
                >
                  {b.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Fuente Organismo */}
        <div ref={wrapperFuenteRef} className="relative mb-5">
          <label className="block text-sm font-medium mb-1">Fuente Organismo</label>
          <input
            type="text"
            value={searchFuente}
            onChange={(e) => {
              setSearchFuente(e.target.value);
              setOpenFuente(true);
            }}
            onFocus={() => setOpenFuente(true)}
            placeholder="Buscar fuente..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {openFuente && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm">
              {filteredFuentes.map((f) => (
                <li
                  key={f.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedFuente?.id === f.id ? "bg-blue-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    setSelectedFuente(f);
                    setSearchFuente(f.nombre);
                    setOpenFuente(false);
                  }}
                >
                  {f.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Guardar OBJETO GASTO
        </button>
      </form>
    </div>
  );
};

export default ObjetoGastoForm;

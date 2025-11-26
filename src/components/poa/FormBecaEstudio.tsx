"use client";
import React, { useState, useRef, useEffect } from "react";

interface FuenteOrganismo {
  id: number;
  nombre: string;
}

interface Beca {
  id: number;
  nombre: string;
}

export default function FormBecaEstudio() {
  // Datos mock para selects
  const FUENTES_MOCK: FuenteOrganismo[] = [
    { id: 1, nombre: "Organismo Nacional" },
    { id: 2, nombre: "Organismo Internacional" },
    { id: 3, nombre: "Fundación Educativa" },
  ];

  const BECAS_MOCK: Beca[] = [
    { id: 1, nombre: "Beca Excelencia Académica" },
    { id: 2, nombre: "Beca Deportiva" },
    { id: 3, nombre: "Beca Investigación" },
  ];

  // Estados de inputs
  const [norma, setNorma] = useState("");
  const [fechaAprobacion, setFechaAprobacion] = useState("");
  const [duracion, setDuracion] = useState("");
  const [costoMensual, setCostoMensual] = useState("");
  const [nroBeneficiario, setNroBeneficiario] = useState("");
  const [costoTotal, setCostoTotal] = useState("");

  // Estados para selects
  const [searchFuente, setSearchFuente] = useState("");
  const [selectedFuente, setSelectedFuente] = useState<FuenteOrganismo | null>(null);
  const [openFuente, setOpenFuente] = useState(false);

  const [searchBeca, setSearchBeca] = useState("");
  const [selectedBeca, setSelectedBeca] = useState<Beca | null>(null);
  const [openBeca, setOpenBeca] = useState(false);

  const wrapperFuenteRef = useRef<HTMLDivElement | null>(null);
  const wrapperBecaRef = useRef<HTMLDivElement | null>(null);

  const filteredFuentes = FUENTES_MOCK.filter((f) =>
    f.nombre.toLowerCase().includes(searchFuente.toLowerCase())
  );

  const filteredBecas = BECAS_MOCK.filter((b) =>
    b.nombre.toLowerCase().includes(searchBeca.toLowerCase())
  );

  // Cerrar dropdowns al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperFuenteRef.current && !wrapperFuenteRef.current.contains(e.target as Node)) {
        setOpenFuente(false);
      }
      if (wrapperBecaRef.current && !wrapperBecaRef.current.contains(e.target as Node)) {
        setOpenBeca(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectFuente = (f: FuenteOrganismo) => {
    setSelectedFuente(f);
    setSearchFuente(f.nombre);
    setOpenFuente(false);
  };

  const handleSelectBeca = (b: Beca) => {
    setSelectedBeca(b);
    setSearchBeca(b.nombre);
    setOpenBeca(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFuente || !selectedBeca) {
      alert("Debes seleccionar la Fuente/Organismo y la Beca.");
      return;
    }

    const payload = {
      norma,
      fecha_aprobacion: fechaAprobacion,
      duracion: Number(duracion),
      costo_mensual: Number(costoMensual),
      nro_beneficiario: Number(nroBeneficiario),
      costo_total: Number(costoTotal),
      fuente_organismo_id_fo: selectedFuente.id,
      BECA_id_beca: selectedBeca.id,
    };

    console.log("Payload BECA_ESTUDIO:", payload);
    // Aquí va la petición a tu API
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Formulario BECA_ESTUDIO</h2>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Norma</label>
        <input
          type="text"
          value={norma}
          onChange={(e) => setNorma(e.target.value)}
          placeholder="Ingrese la norma"
          className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Fecha de aprobación</label>
        <input
          type="date"
          value={fechaAprobacion}
          onChange={(e) => setFechaAprobacion(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Duración beca (meses)</label>
          <input
            type="number"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Costo mensual</label>
          <input
            type="number"
            value={costoMensual}
            onChange={(e) => setCostoMensual(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Número de beneficiarios</label>
          <input
            type="number"
            value={nroBeneficiario}
            onChange={(e) => setNroBeneficiario(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Costo total</label>
          <input
            type="number"
            value={costoTotal}
            onChange={(e) => setCostoTotal(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
        </div>
      </div>

      {/* Select Fuente/Organismo */}
      <div ref={wrapperFuenteRef} className="relative mb-5">
        <label className="block text-sm font-medium mb-1 text-gray-700">Fuente / Organismo</label>
        <input
          type="text"
          value={searchFuente}
          onChange={(e) => {
            setSearchFuente(e.target.value);
            setOpenFuente(true);
          }}
          onFocus={() => setOpenFuente(true)}
          placeholder="Buscar fuente..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
        />
        {openFuente && (
          <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm">
            {filteredFuentes.length > 0 ? (
              filteredFuentes.map((f) => (
                <li
                  key={f.id}
                  onClick={() => handleSelectFuente(f)}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedFuente?.id === f.id ? "bg-blue-100 font-medium" : ""
                  }`}
                >
                  {f.nombre}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No se encontraron resultados</li>
            )}
          </ul>
        )}
      </div>

      {/* Select Beca */}
      <div ref={wrapperBecaRef} className="relative mb-5">
        <label className="block text-sm font-medium mb-1 text-gray-700">Beca</label>
        <input
          type="text"
          value={searchBeca}
          onChange={(e) => {
            setSearchBeca(e.target.value);
            setOpenBeca(true);
          }}
          onFocus={() => setOpenBeca(true)}
          placeholder="Buscar beca..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
        />
        {openBeca && (
          <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm">
            {filteredBecas.length > 0 ? (
              filteredBecas.map((b) => (
                <li
                  key={b.id}
                  onClick={() => handleSelectBeca(b)}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedBeca?.id === b.id ? "bg-blue-100 font-medium" : ""
                  }`}
                >
                  {b.nombre}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No se encontraron resultados</li>
            )}
          </ul>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md shadow-sm"
      >
        Guardar BECA_ESTUDIO
      </button>
    </form>
  );
}

"use client";
import React, { useState, useRef, useEffect } from "react";

interface SeguimientoPOA {
  id: number;
  descripcion: string;
}

interface ProgramacionTrimestral {
  id: number;
  descripcion: string;
}

const FormSeguimientoPOATrimestralDet = () => {
  // Datos simulados
  const seguimientoPoaOptions: SeguimientoPOA[] = [
    { id: 1, descripcion: "Seguimiento Trimestral 1" },
    { id: 2, descripcion: "Seguimiento Trimestral 2" },
  ];

  const ptmOptions: ProgramacionTrimestral[] = [
    { id: 10, descripcion: "PTM - Indicador 1 - Trim 1" },
    { id: 11, descripcion: "PTM - Indicador 2 - Trim 2" },
  ];

  const [selectedSPT, setSelectedSPT] = useState<SeguimientoPOA | null>(null);
  const [selectedPTM, setSelectedPTM] = useState<ProgramacionTrimestral | null>(null);

  const [searchSPT, setSearchSPT] = useState("");
  const [searchPTM, setSearchPTM] = useState("");

  const [openSPT, setOpenSPT] = useState(false);
  const [openPTM, setOpenPTM] = useState(false);

  const wrapperSPTRef = useRef<HTMLDivElement>(null);
  const wrapperPTMRef = useRef<HTMLDivElement>(null);

  const [observaciones, setObservaciones] = useState("");

  // Cerrar dropdown al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperSPTRef.current && !wrapperSPTRef.current.contains(event.target as Node)) {
        setOpenSPT(false);
      }
      if (wrapperPTMRef.current && !wrapperPTMRef.current.contains(event.target as Node)) {
        setOpenPTM(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSPT = seguimientoPoaOptions.filter((s) =>
    s.descripcion.toLowerCase().includes(searchSPT.toLowerCase())
  );

  const filteredPTM = ptmOptions.filter((p) =>
    p.descripcion.toLowerCase().includes(searchPTM.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      seguimiento_poa_trimestral_id_spt: selectedSPT?.id ?? null,
      programacion_trimestral_meta_id_ptm: selectedPTM?.id ?? null,
      observaciones,
    });

    // Aquí haces el POST a tu backend
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Seguimiento POA Trimestral - Detalle
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* SEGUIMIENTO POA TRIMESTRAL */}
        <div ref={wrapperSPTRef} className="relative">
          <label className="block text-sm font-medium mb-1">
            Seguimiento POA Trimestral
          </label>

          <input
            type="text"
            placeholder="Buscar seguimiento..."
            value={searchSPT}
            onChange={(e) => {
              setSearchSPT(e.target.value);
              setOpenSPT(true);
            }}
            onFocus={() => setOpenSPT(true)}
            className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm text-smfocus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {openSPT && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 bg-white border border-gray-200 rounded shadow text-sm overflow-y-auto">
              {filteredSPT.length > 0 ? (
                filteredSPT.map((s) => (
                  <li
                    key={s.id}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                      selectedSPT?.id === s.id ? "bg-blue-100 font-medium" : ""
                    }`}
                    onClick={() => {
                      setSelectedSPT(s);
                      setSearchSPT(s.descripcion);
                      setOpenSPT(false);
                    }}
                  >
                    {s.descripcion}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-500">No encontrado</li>
              )}
            </ul>
          )}
        </div>

        {/* PROGRAMACIÓN TRIMESTRAL META */}
        <div ref={wrapperPTMRef} className="relative">
          <label className="block text-sm font-medium mb-1">
            Programación Trimestral Meta
          </label>

          <input
            type="text"
            placeholder="Buscar PTM..."
            value={searchPTM}
            onChange={(e) => {
              setSearchPTM(e.target.value);
              setOpenPTM(true);
            }}
            onFocus={() => setOpenPTM(true)}
            className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm text-smfocus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {openPTM && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 bg-white border border-gray-200 rounded shadow text-sm overflow-y-auto">
              {filteredPTM.length > 0 ? (
                filteredPTM.map((p) => (
                  <li
                    key={p.id}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                      selectedPTM?.id === p.id ? "bg-blue-100 font-medium" : ""
                    }`}
                    onClick={() => {
                      setSelectedPTM(p);
                      setSearchPTM(p.descripcion);
                      setOpenPTM(false);
                    }}
                  >
                    {p.descripcion}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-500">No encontrado</li>
              )}
            </ul>
          )}
        </div>

        {/* OBSERVACIONES */}
        <div>
          <label className="block text-sm font-medium mb-1">Observaciones</label>
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            rows={3}
            placeholder="Escribe una observación..."
            className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm text-smfocus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 roundedhover:bg-blue-700 transition"
        >
          Guardar Detalle de Seguimiento
        </button>
      </form>
    </div>
  );
};

export default FormSeguimientoPOATrimestralDet;

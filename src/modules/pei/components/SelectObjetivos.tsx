"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";

interface ObjetivoEstrategico {
  id: string;
  nombre: string;
}

interface ObjetivoGestion {
  id: string;
  nombre: string;
}

interface SelectObjetivosProps {
  objetivosEstrategicos?: ObjetivoEstrategico[];
  objetivosGestion?: ObjetivoGestion[];
}

const SelectObjetivosRetro: React.FC<SelectObjetivosProps> = ({
  objetivosEstrategicos = [
    { id: "102.100", nombre: "Desarrollar capacidades tecnológicas" },
    { id: "103.200", nombre: "Fortalecer la investigación aplicada" },
  ],
  objetivosGestion = [
    { id: "102.100.01", nombre: "Implementar laboratorios de innovación" },
    { id: "102.100.02", nombre: "Mejorar la infraestructura de aulas" },
    { id: "103.200.01", nombre: "Impulsar proyectos de investigación" },
  ],
}) => {
  const [searchGestion, setSearchGestion] = useState("");
  const [selectedGestion, setSelectedGestion] = useState<ObjetivoGestion | null>(null);
  const [selectedEstrategico, setSelectedEstrategico] = useState<ObjetivoEstrategico | null>(null);
  const [openGestion, setOpenGestion] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filteredGestion = objetivosGestion.filter(
    (obj) =>
      obj.nombre.toLowerCase().includes(searchGestion.toLowerCase()) ||
      obj.id.toLowerCase().includes(searchGestion.toLowerCase())
  );

  useEffect(() => {
    if (selectedGestion) {
      const prefix = selectedGestion.id.split(".").slice(0, 2).join(".");
      const estrategico = objetivosEstrategicos.find((o) => o.id === prefix);
      setSelectedEstrategico(estrategico || null);
    }
  }, [selectedGestion, objetivosEstrategicos]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenGestion(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full mx-auto bg-[#e0e0e0] border border-gray-400 rounded-md shadow-[inset_1px_1px_0_#fff,1px_1px_4px_#555] p-4 font-sans text-gray-900">
      {/* Encabezado */}
      <div className="bg-[#d0d0d0] border-b border-gray-400 px-3 py-2 mb-4 text-[13px] font-bold text-gray-800 shadow-[inset_1px_1px_0_#fff]">
        PROGRAMA OPERATIVO ANUAL
      </div>

      {/* Objetivo de Gestión */}
      <div className="relative mb-3" ref={dropdownRef}>
        <label className="block text-[13px] font-semibold mb-1">Objetivo de Gestión (ACP)</label>

        <input
          type="text"
          placeholder="Buscar por ID o nombre..."
          value={searchGestion}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchGestion(e.target.value)}
          onFocus={() => setOpenGestion(true)}
          className="w-full border border-gray-500 rounded-sm bg-white text-[13px] px-2 py-1 shadow-[inset_1px_1px_2px_#aaa] focus:outline-none"
        />

        {openGestion && (
          <ul className="absolute z-30 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-500 rounded-sm shadow-[1px_1px_3px_#555,inset_1px_1px_0_#fff] text-[13px]">
            {filteredGestion.length > 0 ? (
              filteredGestion.map((item) => (
                <li
                  key={item.id}
                  className={`px-2 py-1 cursor-pointer hover:bg-[#bcd4f6] ${
                    selectedGestion?.id === item.id ? "bg-[#a7c2f0]" : ""
                  }`}
                  onClick={() => {
                    setSelectedGestion(item);
                    setSearchGestion(item.nombre);
                    setOpenGestion(false);
                  }}
                >
                  <span className="font-mono">{item.id}</span> — {item.nombre}
                </li>
              ))
            ) : (
              <li className="px-2 py-1 text-gray-600">No se encontró resultado</li>
            )}
          </ul>
        )}
      </div>

      {/* Objetivo Estratégico */}
      <div className="mb-3">
        <label className="block text-[13px] font-semibold mb-1">Objetivo Estratégico (automático)</label>
        <input
          type="text"
          value={
            selectedEstrategico
              ? `${selectedEstrategico.id} — ${selectedEstrategico.nombre}`
              : ""
          }
          readOnly
          placeholder="Se llenará automáticamente al seleccionar un objetivo de gestión"
          className="w-full border border-gray-500 rounded-sm bg-[#f0f0f0] text-[13px] px-2 py-1 text-gray-800 shadow-[inset_1px_1px_2px_#aaa]"
        />
      </div>

      {/* Resultados visibles */}
      <div className="pt-2 border-t border-gray-400 text-[13px] space-y-1">
        <p>
          <span className="font-semibold">Gestión:</span>{" "}
          {selectedGestion ? `${selectedGestion.id} — ${selectedGestion.nombre}` : "—"}
        </p>
        <p>
          <span className="font-semibold">Estratégico:</span>{" "}
          {selectedEstrategico ? `${selectedEstrategico.id} — ${selectedEstrategico.nombre}` : "—"}
        </p>
      </div>

      {/* Botón */}
      <div className="pt-3 border-t border-gray-400 flex justify-end">
        <button className="bg-[#1c6dd0] hover:bg-[#155bb3] text-white font-semibold text-[13px] py-1.5 px-5 rounded-sm border border-gray-600 shadow-[1px_1px_0_#fff,inset_1px_1px_2px_#0004]">
          REGISTRAR
        </button>
      </div>
    </div>
  );
};

export default SelectObjetivosRetro;

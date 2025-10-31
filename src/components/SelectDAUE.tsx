"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import Link from "next/link";

interface SelectDAUEProps {
  facultades?: string[];
  carreras?: string[];
  className?: string;
}

const defaultFacultades = [
  "Facultad de Tecnología",
  "Facultad del Hábitat",
  "Facultad de Ingeniería",
  "Facultad de Ciencias Sociales",
];

const defaultCarreras = [
  "Carrera de Arte",
  "Carrera de Sistemas",
  "Carrera de Arquitectura",
  "Carrera de Electrónica",
  "Carrera de Derecho",
];

const SelectDAUERetro: React.FC<SelectDAUEProps> = ({
  facultades = defaultFacultades,
  carreras = defaultCarreras,
  className = "",
}) => {
  const [searchDA, setSearchDA] = useState("");
  const [searchUE, setSearchUE] = useState("");
  const [selectedDA, setSelectedDA] = useState("");
  const [selectedUE, setSelectedUE] = useState("");

  const [openDA, setOpenDA] = useState(false);
  const [openUE, setOpenUE] = useState(false);

  const wrapperDARef = useRef<HTMLDivElement | null>(null);
  const wrapperUERef = useRef<HTMLDivElement | null>(null);
  const inputDARef = useRef<HTMLInputElement | null>(null);
  const inputUERef = useRef<HTMLInputElement | null>(null);

  const filteredDA = facultades.filter((item) =>
    item.toLowerCase().includes(searchDA.toLowerCase())
  );
  const filteredUE = carreras.filter((item) =>
    item.toLowerCase().includes(searchUE.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (openDA && wrapperDARef.current && !wrapperDARef.current.contains(e.target as Node))
        setOpenDA(false);
      if (openUE && wrapperUERef.current && !wrapperUERef.current.contains(e.target as Node))
        setOpenUE(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDA(false);
        setOpenUE(false);
        inputDARef.current?.blur();
        inputUERef.current?.blur();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDA, openUE]);

  const handleSelectDA = (item: string) => {
    setSelectedDA(item);
    setSearchDA(item);
    setOpenDA(false);
  };

  const handleSelectUE = (item: string) => {
    setSelectedUE(item);
    setSearchUE(item);
    setOpenUE(false);
  };

  const onDAInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchDA(e.target.value);
    if (!openDA) setOpenDA(true);
  };

  const onUEInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchUE(e.target.value);
    if (!openUE) setOpenUE(true);
  };

  return (
    <div
      className={`max-w-xl mx-auto mt-10 bg-[#e0e0e0] border border-gray-500 rounded-md shadow-[inset_1px_1px_0_#fff,1px_1px_4px_#555] p-4 font-sans text-gray-900 ${className}`}
    >
      {/* Encabezado retro */}
      <div className="bg-[#d0d0d0] border-b border-gray-400 px-3 py-2 mb-4 text-[13px] font-bold text-gray-800 shadow-[inset_1px_1px_0_#fff]">
        SELECCIÓN DE FACULTAD Y CARRERA
      </div>

      {/* Facultad */}
      <div ref={wrapperDARef} className="relative mb-4">
        <label className="block text-[13px] font-semibold mb-1">DA (Facultad)</label>
        <input
          ref={inputDARef}
          type="text"
          placeholder="Buscar facultad..."
          value={searchDA}
          onChange={onDAInputChange}
          onFocus={() => setOpenDA(true)}
          className="w-full border border-gray-500 rounded-sm bg-white text-[13px] px-2 py-1 shadow-[inset_1px_1px_2px_#aaa] focus:outline-none"
        />

        {openDA && (
          <ul className="absolute z-30 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-500 rounded-sm shadow-[1px_1px_3px_#555,inset_1px_1px_0_#fff] text-[13px]">
            {filteredDA.length > 0 ? (
              filteredDA.map((item) => (
                <li
                  key={item}
                  className={`px-2 py-1 cursor-pointer hover:bg-[#bcd4f6] ${
                    selectedDA === item ? "bg-[#a7c2f0]" : ""
                  }`}
                  onClick={() => handleSelectDA(item)}
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="px-2 py-1 text-gray-600">No se encontró</li>
            )}
          </ul>
        )}
      </div>

      {/* Carrera */}
      <div ref={wrapperUERef} className="relative mb-4">
        <label className="block text-[13px] font-semibold mb-1">UE (Carrera)</label>
        <input
          ref={inputUERef}
          type="text"
          placeholder="Buscar carrera..."
          value={searchUE}
          onChange={onUEInputChange}
          onFocus={() => setOpenUE(true)}
          className="w-full border border-gray-500 rounded-sm bg-white text-[13px] px-2 py-1 shadow-[inset_1px_1px_2px_#aaa] focus:outline-none"
        />

        {openUE && (
          <ul className="absolute z-30 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-500 rounded-sm shadow-[1px_1px_3px_#555,inset_1px_1px_0_#fff] text-[13px]">
            {filteredUE.length > 0 ? (
              filteredUE.map((item) => (
                <li
                  key={item}
                  className={`px-2 py-1 cursor-pointer hover:bg-[#bcd4f6] ${
                    selectedUE === item ? "bg-[#a7c2f0]" : ""
                  }`}
                  onClick={() => handleSelectUE(item)}
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="px-2 py-1 text-gray-600">No se encontró</li>
            )}
          </ul>
        )}
      </div>

      {/* Resultados */}
      <div className="pt-2 border-t border-gray-400 text-[13px] space-y-1">
        <p>
          <span className="font-semibold">Facultad:</span> {selectedDA || "—"}
        </p>
        <p>
          <span className="font-semibold">Carrera:</span> {selectedUE || "—"}
        </p>
      </div>

      {/* Botones */}
      <div className="pt-3 border-t border-gray-400 flex justify-end gap-3">
        {(searchDA && searchUE)?  <button className="bg-[#1c6dd0] hover:bg-[#155bb3] text-white font-semibold text-[13px] py-1.5 px-5 rounded-sm border border-gray-600 shadow-[1px_1px_0_#fff,inset_1px_1px_2px_#0004]">
          <Link href={'/Formulario'}>
          INGRESO
          </Link>
        </button>: 
        <button onClick={()=>{alert('rellana todos los datos')}} className="bg-[#B4B6D1] hover:bg-[#99B6D1] text-white font-semibold text-[13px] py-1.5 px-5 rounded-sm border border-gray-600 shadow-[1px_1px_0_#fff,inset_1px_1px_2px_#0004]">
          INGRESO
        </button>}
        <button className="bg-[#d01c1c] hover:bg-[#b31515] text-white font-semibold text-[13px] py-1.5 px-5 rounded-sm border border-gray-600 shadow-[1px_1px_0_#fff,inset_1px_1px_2px_#0004]">
          SALIR
        </button>
      </div>
    </div>
  );
};

export default SelectDAUERetro;

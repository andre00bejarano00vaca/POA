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

const SelectDAUEModerno: React.FC<SelectDAUEProps> = ({
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
      className={`max-w-lg mx-auto mt-10 bg-white border border-gray-200 rounded-xl shadow-lg p-6 font-sans text-gray-800 transition-all duration-300 hover:shadow-xl ${className}`}
    >
      {/* Encabezado moderno */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Selección de Facultad y Carrera
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Busca y selecciona una opción en cada campo
        </p>
      </div>

      {/* Facultad */}
      <div ref={wrapperDARef} className="relative mb-5">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Facultad
        </label>
        <input
          ref={inputDARef}
          type="text"
          placeholder="Buscar facultad..."
          value={searchDA}
          onChange={onDAInputChange}
          onFocus={() => setOpenDA(true)}
          className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />

        {openDA && (
          <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm animate-fadeIn">
            {filteredDA.length > 0 ? (
              filteredDA.map((item) => (
                <li
                  key={item}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedDA === item ? "bg-blue-100 font-medium" : ""
                  }`}
                  onClick={() => handleSelectDA(item)}
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No se encontró</li>
            )}
          </ul>
        )}
      </div>

      {/* Carrera */}
      <div ref={wrapperUERef} className="relative mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Carrera
        </label>
        <input
          ref={inputUERef}
          type="text"
          placeholder="Buscar carrera..."
          value={searchUE}
          onChange={onUEInputChange}
          onFocus={() => setOpenUE(true)}
          className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />

        {openUE && (
          <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm animate-fadeIn">
            {filteredUE.length > 0 ? (
              filteredUE.map((item) => (
                <li
                  key={item}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedUE === item ? "bg-blue-100 font-medium" : ""
                  }`}
                  onClick={() => handleSelectUE(item)}
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No se encontró</li>
            )}
          </ul>
        )}
      </div>

      {/* Resultados */}
      <div className="border-t border-gray-100 pt-4 text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-semibold">Facultad:</span>{" "}
          {selectedDA || "—"}
        </p>
        <p>
          <span className="font-semibold">Carrera:</span>{" "}
          {selectedUE || "—"}
        </p>
      </div>

      {/* Botones */}
      <div className="pt-5 flex justify-end gap-3">
        {(searchDA && searchUE) ? (
          <Link href="/Formulario">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 px-5 rounded-md shadow-sm transition-colors">
              Ingreso
            </button>
          </Link>
        ) : (
          <button
            onClick={() => alert("Rellena todos los datos")}
            className="bg-gray-400 hover:bg-gray-500 text-white font-medium text-sm py-2 px-5 rounded-md shadow-sm transition-colors"
          >
            Ingreso
          </button>
        )}
        <button className="bg-red-500 hover:bg-red-600 text-white font-medium text-sm py-2 px-5 rounded-md shadow-sm transition-colors">
          Salir
        </button>
      </div>
    </div>
  );
};

export default SelectDAUEModerno;

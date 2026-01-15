"use client";
import React, { useState, useRef, useEffect } from "react";

interface Actividad {
  id: number;
  descripcion: string;
}

const PresupuestoForm = () => {
  const actividadOptions: Actividad[] = [
    { id: 1, descripcion: "Actividad 1" },
    { id: 2, descripcion: "Actividad 2" },
  ];

  const [anio, setAnio] = useState("");
  const [fechaRealizado, setFechaRealizado] = useState("");
  const [montoSolicitado, setMontoSolicitado] = useState("");
  const [montoEjecutado, setMontoEjecutado] = useState("");

  const [searchActividad, setSearchActividad] = useState("");
  const [selectedActividad, setSelectedActividad] = useState<Actividad | null>(null);
  const [openActividad, setOpenActividad] = useState(false);
  const wrapperActividadRef = useRef<HTMLDivElement>(null);

  const filteredActividades = actividadOptions.filter((a) =>
    a.descripcion.toLowerCase().includes(searchActividad.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperActividadRef.current && !wrapperActividadRef.current.contains(event.target as Node)) {
        setOpenActividad(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      anio: Number(anio),
      fecha_realizado: fechaRealizado,
      monto_solicitado: Number(montoSolicitado),
      monto_ejecutado: Number(montoEjecutado),
      ACTIVIDAD_id_act: selectedActividad?.id ?? null,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Formulario PRESUPUESTO</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Año</label>
          <input
            type="number"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Fecha Realizado</label>
          <input
            type="date"
            value={fechaRealizado}
            onChange={(e) => setFechaRealizado(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Monto Solicitado</label>
          <input
            type="number"
            value={montoSolicitado}
            onChange={(e) => setMontoSolicitado(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Monto Ejecutado</label>
          <input
            type="number"
            value={montoEjecutado}
            onChange={(e) => setMontoEjecutado(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* ACTIVIDAD */}
        <div ref={wrapperActividadRef} className="relative mb-5">
          <label className="block text-sm font-medium mb-1">Actividad</label>
          <input
            type="text"
            value={searchActividad}
            onChange={(e) => {
              setSearchActividad(e.target.value);
              setOpenActividad(true);
            }}
            onFocus={() => setOpenActividad(true)}
            placeholder="Buscar actividad..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {openActividad && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm">
              {filteredActividades.map((a) => (
                <li
                  key={a.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedActividad?.id === a.id ? "bg-blue-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    setSelectedActividad(a);
                    setSearchActividad(a.descripcion);
                    setOpenActividad(false);
                  }}
                >
                  {a.descripcion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Guardar PRESUPUESTO
        </button>
      </form>
    </div>
  );
};

export default PresupuestoForm;

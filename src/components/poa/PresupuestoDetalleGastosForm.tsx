"use client";
import React, { useState, useRef, useEffect } from "react";

interface Presupuesto {
  id: number;
  nombre: string;
}

interface ObjetoGasto {
  id: number;
  descripcion: string;
}

const PresupuestoDetalleGastosForm = () => {
  // Datos de ejemplo
  const presupuestoOptions: Presupuesto[] = [
    { id: 1, nombre: "Presupuesto 2025" },
    { id: 2, nombre: "Presupuesto 2026" },
  ];
  const objetoGastoOptions: ObjetoGasto[] = [
    { id: 1, descripcion: "Gasto Administrativo" },
    { id: 2, descripcion: "Gasto Operativo" },
  ];

  // Estados inputs
  const [importe, setImporte] = useState("");
  const [montoGasto, setMontoGasto] = useState("");

  // Dropdown PRESUPUESTO
  const [searchPresupuesto, setSearchPresupuesto] = useState("");
  const [selectedPresupuesto, setSelectedPresupuesto] = useState<Presupuesto | null>(null);
  const [openPresupuesto, setOpenPresupuesto] = useState(false);
  const wrapperPresupuestoRef = useRef<HTMLDivElement>(null);

  // Dropdown OBJETO_GASTO
  const [searchObjeto, setSearchObjeto] = useState("");
  const [selectedObjeto, setSelectedObjeto] = useState<ObjetoGasto | null>(null);
  const [openObjeto, setOpenObjeto] = useState(false);
  const wrapperObjetoRef = useRef<HTMLDivElement>(null);

  const filteredPresupuestos = presupuestoOptions.filter((p) =>
    p.nombre.toLowerCase().includes(searchPresupuesto.toLowerCase())
  );
  const filteredObjetos = objetoGastoOptions.filter((o) =>
    o.descripcion.toLowerCase().includes(searchObjeto.toLowerCase())
  );

  // Cerrar dropdowns al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperPresupuestoRef.current && !wrapperPresupuestoRef.current.contains(event.target as Node)) {
        setOpenPresupuesto(false);
      }
      if (wrapperObjetoRef.current && !wrapperObjetoRef.current.contains(event.target as Node)) {
        setOpenObjeto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      importe: Number(importe),
      monto_gasto: Number(montoGasto),
      PRESUPUESTO_id_pres: selectedPresupuesto?.id ?? null,
      OBJETO_GASTO_id_og: selectedObjeto?.id ?? null,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Formulario PRESUPUESTO DETALLE GASTOS</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Monto Gasto */}
        <div>
          <label className="block font-medium mb-1">Monto Gasto</label>
          <input
            type="number"
            value={montoGasto}
            onChange={(e) => setMontoGasto(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* PRESUPUESTO */}
        <div ref={wrapperPresupuestoRef} className="relative mb-5">
          <label className="block text-sm font-medium mb-1">Presupuesto</label>
          <input
            type="text"
            value={searchPresupuesto}
            onChange={(e) => {
              setSearchPresupuesto(e.target.value);
              setOpenPresupuesto(true);
            }}
            onFocus={() => setOpenPresupuesto(true)}
            placeholder="Buscar presupuesto..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {openPresupuesto && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm">
              {filteredPresupuestos.map((p) => (
                <li
                  key={p.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedPresupuesto?.id === p.id ? "bg-blue-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    setSelectedPresupuesto(p);
                    setSearchPresupuesto(p.nombre);
                    setOpenPresupuesto(false);
                  }}
                >
                  {p.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* OBJETO_GASTO */}
        <div ref={wrapperObjetoRef} className="relative mb-5">
          <label className="block text-sm font-medium mb-1">Objeto Gasto</label>
          <input
            type="text"
            value={searchObjeto}
            onChange={(e) => {
              setSearchObjeto(e.target.value);
              setOpenObjeto(true);
            }}
            onFocus={() => setOpenObjeto(true)}
            placeholder="Buscar objeto gasto..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {openObjeto && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm">
              {filteredObjetos.map((o) => (
                <li
                  key={o.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedObjeto?.id === o.id ? "bg-blue-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    setSelectedObjeto(o);
                    setSearchObjeto(o.descripcion);
                    setOpenObjeto(false);
                  }}
                >
                  {o.descripcion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Guardar PRESUPUESTO DETALLE GASTOS
        </button>
      </form>
    </div>
  );
};

export default PresupuestoDetalleGastosForm;

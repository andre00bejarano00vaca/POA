"use client";
import React, { useState, useRef, useEffect } from "react";

interface AccionCortoPlazo {
  id: number;
  descripcion: string;
}

interface Producto {
  id: number;
  descripcion: string;
}

interface UnidadEjecutora {
  id: number;
  nombre: string;
}

const ActividadForm = () => {
  // Datos simulados
  const accionesOptions: AccionCortoPlazo[] = [
    { id: 1, descripcion: "Acción 1" },
    { id: 2, descripcion: "Acción 2" },
  ];

  const productosOptions: Producto[] = [
    { id: 1, descripcion: "Producto 1" },
    { id: 2, descripcion: "Producto 2" },
  ];

  const unidadesOptions: UnidadEjecutora[] = [
    { id: 1, nombre: "Unidad 1" },
    { id: 2, nombre: "Unidad 2" },
  ];

  // Estados de inputs
  const [categProgramatica, setCategProgramatica] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("");
  const [clase, setClase] = useState("");
  const [fechaIni, setFechaIni] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [docVerif, setDocVerif] = useState("");
  const [causasDesv, setCausasDesv] = useState("");

  // Estados referencias
  const [searchAccion, setSearchAccion] = useState("");
  const [selectedAccion, setSelectedAccion] = useState<AccionCortoPlazo | null>(null);
  const [openAccion, setOpenAccion] = useState(false);
  const wrapperAccionRef = useRef<HTMLDivElement>(null);

  const [searchProducto, setSearchProducto] = useState("");
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
  const [openProducto, setOpenProducto] = useState(false);
  const wrapperProductoRef = useRef<HTMLDivElement>(null);

  const [searchUnidad, setSearchUnidad] = useState("");
  const [selectedUnidad, setSelectedUnidad] = useState<UnidadEjecutora | null>(null);
  const [openUnidad, setOpenUnidad] = useState(false);
  const wrapperUnidadRef = useRef<HTMLDivElement>(null);

  // Filtrado
  const filteredAcciones = accionesOptions.filter((a) =>
    a.descripcion.toLowerCase().includes(searchAccion.toLowerCase())
  );
  const filteredProductos = productosOptions.filter((p) =>
    p.descripcion.toLowerCase().includes(searchProducto.toLowerCase())
  );
  const filteredUnidades = unidadesOptions.filter((u) =>
    u.nombre.toLowerCase().includes(searchUnidad.toLowerCase())
  );

  // Click fuera para cerrar dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperAccionRef.current && !wrapperAccionRef.current.contains(event.target as Node)) {
        setOpenAccion(false);
      }
      if (wrapperProductoRef.current && !wrapperProductoRef.current.contains(event.target as Node)) {
        setOpenProducto(false);
      }
      if (wrapperUnidadRef.current && !wrapperUnidadRef.current.contains(event.target as Node)) {
        setOpenUnidad(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      categ_programatica: categProgramatica,
      descripcion,
      tipo,
      clase,
      fecha_ini: fechaIni,
      fecha_final: fechaFinal,
      doc_verif: docVerif,
      causas_desv: causasDesv,
      ACCION_CORTO_PLAZO_id_acp: selectedAccion?.id ?? null,
      PRODUCTO_id_prod: selectedProducto?.id ?? null,
      UNIDAD_EJECUTORA_id_ue: selectedUnidad?.id ?? null,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Formulario ACTIVIDAD</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Categoría Programática</label>
          <input
            type="text"
            value={categProgramatica}
            onChange={(e) => setCategProgramatica(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tipo</label>
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Clase</label>
          <input
            type="text"
            value={clase}
            onChange={(e) => setClase(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Fecha Inicio</label>
          <input
            type="date"
            value={fechaIni}
            onChange={(e) => setFechaIni(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Fecha Final</label>
          <input
            type="date"
            value={fechaFinal}
            onChange={(e) => setFechaFinal(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Doc Verificación</label>
          <input
            type="number"
            value={docVerif}
            onChange={(e) => setDocVerif(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Causas Desviación</label>
          <textarea
            value={causasDesv}
            onChange={(e) => setCausasDesv(e.target.value)}
            rows={2}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dropdowns buscables */}
        <div ref={wrapperAccionRef} className="relative mb-4">
          <label className="block font-medium mb-1">Acción Corto Plazo</label>
          <input
            type="text"
            value={searchAccion}
            onChange={(e) => {
              setSearchAccion(e.target.value);
              setOpenAccion(true);
            }}
            onFocus={() => setOpenAccion(true)}
            placeholder="Buscar acción..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {openAccion && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm">
              {filteredAcciones.map((a) => (
                <li
                  key={a.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedAccion?.id === a.id ? "bg-blue-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    setSelectedAccion(a);
                    setSearchAccion(a.descripcion);
                    setOpenAccion(false);
                  }}
                >
                  {a.descripcion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div ref={wrapperProductoRef} className="relative mb-4">
          <label className="block font-medium mb-1">Producto</label>
          <input
            type="text"
            value={searchProducto}
            onChange={(e) => {
              setSearchProducto(e.target.value);
              setOpenProducto(true);
            }}
            onFocus={() => setOpenProducto(true)}
            placeholder="Buscar producto..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {openProducto && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm">
              {filteredProductos.map((p) => (
                <li
                  key={p.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedProducto?.id === p.id ? "bg-blue-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    setSelectedProducto(p);
                    setSearchProducto(p.descripcion);
                    setOpenProducto(false);
                  }}
                >
                  {p.descripcion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div ref={wrapperUnidadRef} className="relative mb-4">
          <label className="block font-medium mb-1">Unidad Ejecutora</label>
          <input
            type="text"
            value={searchUnidad}
            onChange={(e) => {
              setSearchUnidad(e.target.value);
              setOpenUnidad(true);
            }}
            onFocus={() => setOpenUnidad(true)}
            placeholder="Buscar unidad..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {openUnidad && (
            <ul className="absolute z-30 left-0 right-0 mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm">
              {filteredUnidades.map((u) => (
                <li
                  key={u.id}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedUnidad?.id === u.id ? "bg-blue-100 font-medium" : ""
                  }`}
                  onClick={() => {
                    setSelectedUnidad(u);
                    setSearchUnidad(u.nombre);
                    setOpenUnidad(false);
                  }}
                >
                  {u.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Guardar ACTIVIDAD
        </button>
      </form>
    </div>
  );
};

export default ActividadForm;

"use client";

import React, { useEffect, useRef, useState } from "react";

interface PEI { id: number; anio_inicio: number; anio_fin: number; }
interface ObjetivoEstratégico { id: number; descripcion: string; }
interface AccionEstrategica { id: number; descripcion: string; }
interface IndicadorPEI { id: number; descripcion: string; }
interface UnidadSupervisora { id: number; nombre: string; }
interface ProductoInstitucional { id: number; descripcion: string; }

// Datos mock
const PEIS_MOCK: PEI[] = [
  { id: 1, anio_inicio: 2023, anio_fin: 2025 },
  { id: 2, anio_inicio: 2024, anio_fin: 2026 },
];

const OBJETIVOS_MOCK: ObjetivoEstratégico[] = [
  { id: 1, descripcion: "Incrementar la calidad educativa" },
  { id: 2, descripcion: "Fortalecer investigación" },
];

const ACCIONES_MOCK: AccionEstrategica[] = [
  { id: 1, descripcion: "Optimizar procesos internos" },
  { id: 2, descripcion: "Mejorar infraestructura tecnológica" },
];

const INDICADORES_MOCK: IndicadorPEI[] = [
  { id: 1, descripcion: "Indicador 1" },
  { id: 2, descripcion: "Indicador 2" },
];

const UNIDADES_MOCK: UnidadSupervisora[] = [
  { id: 1, nombre: "Unidad Supervisora 1" },
  { id: 2, nombre: "Unidad Supervisora 2" },
];

const PRODUCTOS_MOCK: ProductoInstitucional[] = [
  { id: 1, descripcion: "Producto 1" },
  { id: 2, descripcion: "Producto 2" },
];

export default function FormMatrizPEI() {
  // Campos numéricos
  const [anioBase, setAnioBase] = useState("");
  const [metaTotal, setMetaTotal] = useState("");

  // Selects
  const [searchPEI, setSearchPEI] = useState("");
  const [selectedPEI, setSelectedPEI] = useState<PEI | null>(null);
  const [openPEI, setOpenPEI] = useState(false);
  const wrapperPEIRef = useRef<HTMLDivElement | null>(null);

  const [searchObjetivo, setSearchObjetivo] = useState("");
  const [selectedObjetivo, setSelectedObjetivo] = useState<ObjetivoEstratégico | null>(null);
  const [openObjetivo, setOpenObjetivo] = useState(false);
  const wrapperObjetivoRef = useRef<HTMLDivElement | null>(null);

  const [searchAccion, setSearchAccion] = useState("");
  const [selectedAccion, setSelectedAccion] = useState<AccionEstrategica | null>(null);
  const [openAccion, setOpenAccion] = useState(false);
  const wrapperAccionRef = useRef<HTMLDivElement | null>(null);

  const [searchIndicador, setSearchIndicador] = useState("");
  const [selectedIndicador, setSelectedIndicador] = useState<IndicadorPEI | null>(null);
  const [openIndicador, setOpenIndicador] = useState(false);
  const wrapperIndicadorRef = useRef<HTMLDivElement | null>(null);

  const [searchUnidad, setSearchUnidad] = useState("");
  const [selectedUnidad, setSelectedUnidad] = useState<UnidadSupervisora | null>(null);
  const [openUnidad, setOpenUnidad] = useState(false);
  const wrapperUnidadRef = useRef<HTMLDivElement | null>(null);

  const [searchProducto, setSearchProducto] = useState("");
  const [selectedProducto, setSelectedProducto] = useState<ProductoInstitucional | null>(null);
  const [openProducto, setOpenProducto] = useState(false);
  const wrapperProductoRef = useRef<HTMLDivElement | null>(null);

  // Filtrado dinámico
  const filteredPEI = PEIS_MOCK.filter(p => `${p.anio_inicio}-${p.anio_fin}`.includes(searchPEI));
  const filteredObjetivos = OBJETIVOS_MOCK.filter(o => o.descripcion.toLowerCase().includes(searchObjetivo.toLowerCase()));
  const filteredAcciones = ACCIONES_MOCK.filter(a => a.descripcion.toLowerCase().includes(searchAccion.toLowerCase()));
  const filteredIndicadores = INDICADORES_MOCK.filter(i => i.descripcion.toLowerCase().includes(searchIndicador.toLowerCase()));
  const filteredUnidades = UNIDADES_MOCK.filter(u => u.nombre.toLowerCase().includes(searchUnidad.toLowerCase()));
  const filteredProductos = PRODUCTOS_MOCK.filter(p => p.descripcion.toLowerCase().includes(searchProducto.toLowerCase()));

  // Click fuera para cerrar dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperPEIRef.current && !wrapperPEIRef.current.contains(e.target as Node)) setOpenPEI(false);
      if (wrapperObjetivoRef.current && !wrapperObjetivoRef.current.contains(e.target as Node)) setOpenObjetivo(false);
      if (wrapperAccionRef.current && !wrapperAccionRef.current.contains(e.target as Node)) setOpenAccion(false);
      if (wrapperIndicadorRef.current && !wrapperIndicadorRef.current.contains(e.target as Node)) setOpenIndicador(false);
      if (wrapperUnidadRef.current && !wrapperUnidadRef.current.contains(e.target as Node)) setOpenUnidad(false);
      if (wrapperProductoRef.current && !wrapperProductoRef.current.contains(e.target as Node)) setOpenProducto(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPEI || !selectedObjetivo || !selectedAccion || !selectedIndicador || !selectedUnidad || !selectedProducto) {
      alert("Debes seleccionar todas las referencias.");
      return;
    }

    const payload = {
      PEI_id_pei: selectedPEI.id,
      OBJETIVO_ESTRATEGICO_AMP_id_oea: selectedObjetivo.id,
      ACCION_ESTRATEGICA_INS_id_aei: selectedAccion.id,
      INDICADOR_PEI_ID_imp: selectedIndicador.id,
      unidad_supervisora: selectedUnidad.id,
      PRODUCTO_INSTITUCIONAL_id_pi: selectedProducto.id,
      anio_base: Number(anioBase),
      meta_total: Number(metaTotal),
    };

    console.log("Payload enviado:", payload);
  };

  // Función para crear dropdowns genéricos
  const renderDropdown = <T extends { id: number; descripcion?: string; nombre?: string }>(
  label: string,
  search: string,
  setSearch: (val: string) => void,
  selected: T | null,
  setSelected: (val: T) => void,
  open: boolean,
  setOpen: (val: boolean) => void,
  wrapperRef: React.RefObject<HTMLDivElement | null>, // <-- CAMBIO AQUÍ
  options: T[],
  displayFn: (item: T) => string
) => (
    <div ref={wrapperRef} className="relative mb-5">
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input
        type="text"
        value={search}
        placeholder={`Buscar ${label.toLowerCase()}...`}
        onChange={e => { setSearch(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        required
      />
      {open && (
        <ul role="listbox" className="absolute z-30 left-0 right-0 mt-2 max-h-56 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md text-sm">
          {options.length > 0 ? (
            options.map(option => (
              <li
                key={option.id}
                role="option"
                aria-selected={selected?.id === option.id}
                className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${selected?.id === option.id ? "bg-blue-100 font-medium" : ""}`}
                onClick={() => { setSelected(option); setSearch(displayFn(option)); setOpen(false); }}
              >
                {displayFn(option)}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500">No se encontraron resultados</li>
          )}
        </ul>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Formulario Matriz PEI</h2>

      {renderDropdown<PEI>("PEI", searchPEI, setSearchPEI, selectedPEI, setSelectedPEI, openPEI, setOpenPEI, wrapperPEIRef, filteredPEI, p => `${p.anio_inicio}-${p.anio_fin}`)}
      {renderDropdown<ObjetivoEstratégico>("Objetivo Estratégico", searchObjetivo, setSearchObjetivo, selectedObjetivo, setSelectedObjetivo, openObjetivo, setOpenObjetivo, wrapperObjetivoRef, filteredObjetivos, o => o.descripcion)}
      {renderDropdown<AccionEstrategica>("Acción Estratégica", searchAccion, setSearchAccion, selectedAccion, setSelectedAccion, openAccion, setOpenAccion, wrapperAccionRef, filteredAcciones, a => a.descripcion)}
      {renderDropdown<IndicadorPEI>("Indicador PEI", searchIndicador, setSearchIndicador, selectedIndicador, setSelectedIndicador, openIndicador, setOpenIndicador, wrapperIndicadorRef, filteredIndicadores, i => i.descripcion)}
      {renderDropdown<UnidadSupervisora>("Unidad Supervisora", searchUnidad, setSearchUnidad, selectedUnidad, setSelectedUnidad, openUnidad, setOpenUnidad, wrapperUnidadRef, filteredUnidades, u => u.nombre)}
      {renderDropdown<ProductoInstitucional>("Producto Institucional", searchProducto, setSearchProducto, selectedProducto, setSelectedProducto, openProducto, setOpenProducto, wrapperProductoRef, filteredProductos, p => p.descripcion)}

      {/* Año base */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Año Base</label>
        <input
          type="number"
          value={anioBase}
          onChange={e => setAnioBase(e.target.value)}
          placeholder="Ingrese el año base"
          className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
        />
      </div>

      {/* Meta total */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Meta Total</label>
        <input
          type="number"
          value={metaTotal}
          onChange={e => setMetaTotal(e.target.value)}
          placeholder="Ingrese la meta total"
          className="w-full border border-gray-300 rounded-md bg-white text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
        />
      </div>

      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-3 rounded-md shadow-sm transition-all">
        Guardar Matriz PEI
      </button>
    </form>
  );
}

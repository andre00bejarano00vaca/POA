"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";

// --- Interfaces ---
interface FuenteOrganismo {
  id: number;
  nombre: string;
}

interface Beca {
  id: number;
  nombre: string;
}

const BecaEstudioForm = () => {
  // --- Datos ---
  const fuenteOptions: FuenteOrganismo[] = [
    { id: 1, nombre: "Ministerio de Educación" },
    { id: 2, nombre: "Banco de Becas" },
  ];
  const becaOptions: Beca[] = [
    { id: 1, nombre: "Beca Excelencia" },
    { id: 2, nombre: "Beca Innovación" },
  ];

  // --- Estado unificado para campos simples ---
  const [formData, setFormData] = useState({
    norma: "",
    fechaAprobacion: "",
    duracion: "",
    costoMensual: "",
    nroBeneficiario: "",
  });

  // --- Estado Dropdowns ---
  // Fuente
  const [searchFuente, setSearchFuente] = useState("");
  const [selectedFuente, setSelectedFuente] = useState<FuenteOrganismo | null>(null);
  const [openFuente, setOpenFuente] = useState(false);
  const wrapperFuenteRef = useRef<HTMLDivElement>(null);

  // Beca
  const [searchBeca, setSearchBeca] = useState("");
  const [selectedBeca, setSelectedBeca] = useState<Beca | null>(null);
  const [openBeca, setOpenBeca] = useState(false);
  const wrapperBecaRef = useRef<HTMLDivElement>(null);

  // --- Efecto: Cálculo Automático del Costo Total ---
  const costoTotalCalculado = useMemo(() => {
    const mes = Number(formData.costoMensual) || 0;
    const dur = Number(formData.duracion) || 0;
    const ben = Number(formData.nroBeneficiario) || 0;
    return mes * dur * ben;
  }, [formData.costoMensual, formData.duracion, formData.nroBeneficiario]);

  // --- Handlers Genéricos ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Lógica Dropdowns ---
  // Limpiar selección si el usuario altera el texto
  const handleSearchChange = (
    text: string, 
    setSearch: React.Dispatch<React.SetStateAction<string>>, 
    setSelected: React.Dispatch<React.SetStateAction<any>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setSearch(text);
    setSelected(null); // IMPORTANTE: Si escribe, invalidamos la selección anterior
    setOpen(true);
  };

  const filteredFuentes = fuenteOptions.filter((f) =>
    f.nombre.toLowerCase().includes(searchFuente.toLowerCase())
  );
  const filteredBecas = becaOptions.filter((b) =>
    b.nombre.toLowerCase().includes(searchBeca.toLowerCase())
  );

  // Cerrar dropdowns al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperFuenteRef.current && !wrapperFuenteRef.current.contains(event.target as Node)) setOpenFuente(false);
      if (wrapperBecaRef.current && !wrapperBecaRef.current.contains(event.target as Node)) setOpenBeca(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Submit ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación Manual de Dropdowns
    if (!selectedFuente) {
      alert("Debes seleccionar una Fuente/Organismo válida de la lista.");
      return;
    }
    if (!selectedBeca) {
      alert("Debes seleccionar una Beca válida de la lista.");
      return;
    }

    console.log({
      ...formData,
      duracion: Number(formData.duracion),
      costoMensual: Number(formData.costoMensual),
      nroBeneficiario: Number(formData.nroBeneficiario),
      costoTotal: costoTotalCalculado, // Usamos el calculado
      fuente_organismo_id_fo: selectedFuente.id,
      beca_id_beca: selectedBeca.id,
    });
    alert("Formulario enviado correctamente (ver consola)");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg my-10 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Formulario BECA_ESTUDIO</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Norma */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Norma</label>
          <input
            name="norma"
            type="text"
            value={formData.norma}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Fecha Aprobación */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Fecha de Aprobación</label>
          <input
            name="fechaAprobacion"
            type="date"
            value={formData.fechaAprobacion}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Duración */}
          <div>
            <label className="block font-medium mb-1 text-gray-700 text-sm">Duración (meses)</label>
            <input
              name="duracion"
              type="number"
              min="0"
              value={formData.duracion}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Nro Beneficiarios */}
          <div>
            <label className="block font-medium mb-1 text-gray-700 text-sm">Nro. Beneficiarios</label>
            <input
              name="nroBeneficiario"
              type="number"
              min="0"
              value={formData.nroBeneficiario}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Costo Mensual */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Costo Mensual ($)</label>
          <input
            name="costoMensual"
            type="number"
            min="0"
            value={formData.costoMensual}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Costo Total (Read Only) */}
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <label className="block font-medium mb-1 text-gray-700">Costo Total (Calculado)</label>
          <div className="text-xl font-bold text-blue-700">
            ${costoTotalCalculado.toLocaleString()}
          </div>
          <input type="hidden" name="costoTotal" value={costoTotalCalculado} />
        </div>

        <hr className="my-4" />

        {/* Dropdown Fuente */}
        <div ref={wrapperFuenteRef} className="relative mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Fuente/Organismo {selectedFuente && <span className="text-green-600 text-xs ml-2">✓ Seleccionado</span>}
          </label>
          <input
            type="text"
            value={searchFuente}
            onChange={(e) => handleSearchChange(e.target.value, setSearchFuente, setSelectedFuente, setOpenFuente)}
            onFocus={() => setOpenFuente(true)}
            placeholder="Buscar fuente..."
            // Cambiamos el borde a rojo si hay texto pero no hay selección
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
               searchFuente && !selectedFuente ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
            }`}
            required
          />
          {/* Mensaje de error visual si escribe pero no selecciona */}
          {searchFuente && !selectedFuente && (
            <p className="text-xs text-red-500 mt-1">Debes hacer clic en una opción de la lista.</p>
          )}

          {openFuente && filteredFuentes.length > 0 && (
            <ul className="absolute z-30 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg text-sm">
              {filteredFuentes.map((f) => (
                <li
                  key={f.id}
                  className="px-3 py-2 cursor-pointer hover:bg-blue-50"
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

        {/* Dropdown Beca */}
        <div ref={wrapperBecaRef} className="relative mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-700">
             Beca {selectedBeca && <span className="text-green-600 text-xs ml-2">✓ Seleccionada</span>}
          </label>
          <input
            type="text"
            value={searchBeca}
            onChange={(e) => handleSearchChange(e.target.value, setSearchBeca, setSelectedBeca, setOpenBeca)}
            onFocus={() => setOpenBeca(true)}
            placeholder="Buscar beca..."
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
               searchBeca && !selectedBeca ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
            }`}
            required
          />
          {openBeca && filteredBecas.length > 0 && (
            <ul className="absolute z-30 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg text-sm">
              {filteredBecas.map((b) => (
                <li
                  key={b.id}
                  className="px-3 py-2 cursor-pointer hover:bg-blue-50"
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition shadow-md"
        >
          Guardar BECA_ESTUDIO
        </button>
      </form>
    </div>
  );
};

export default BecaEstudioForm;
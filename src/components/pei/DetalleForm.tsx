"use client";
import React, { useState, ChangeEvent } from "react";

interface Option {
  id: string;
  nombre: string;
}

const DetalleFormRetro: React.FC = () => {
  const [indicador, setIndicador] = useState<Option | null>(null);
  const [actividad, setActividad] = useState<Option | null>(null);
  const [unidadMedida, setUnidadMedida] = useState("");
  const [tipo, setTipo] = useState("");
  const [clase, setClase] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const indicadores: Option[] = [
    { id: "71", nombre: "Sistema de seguimiento de Graduados" },
    { id: "72", nombre: "Fortalecimiento de prácticas profesionales" },
  ];

  const actividades: Option[] = [
    { id: "01", nombre: "Ejecución del pago de la deuda pública de la Facultad Integral del Chaco" },
    { id: "02", nombre: "Capacitación en gestión académica universitaria" },
  ];

  const unidadesMedida = ["Porcentaje de ejecución presupuestaria", "Número de beneficiarios", "Monto ejecutado"];
  const tipos = ["Operativo", "Estratégico", "Táctico"];
  const clases = ["Clase A", "Clase B", "Clase C"];

  return (
    <div className="w-[100%] mx-auto  bg-[#e0e0e0] border border-gray-400 rounded-md shadow-[inset_1px_1px_0_#fff,1px_1px_4px_#555] p-4 font-sans text-gray-900">
      {/* Encabezado */}
      <div className="bg-[#d0d0d0] border-b border-gray-400 px-3 py-2 mb-4 text-[13px] font-bold text-gray-800 shadow-[inset_1px_1px_0_#fff]">
        DETALLE
      </div>

      {/* Indicadores */}
      <div className="mb-3">
        <label className="block text-[13px] font-semibold mb-1">Indicadores</label>
        <select
          value={indicador?.id || ""}
          onChange={(e) =>
            setIndicador(indicadores.find((i) => i.id === e.target.value) || null)
          }
          className="w-full border border-gray-500 rounded-sm bg-white text-[13px] px-2 py-1 shadow-[inset_1px_1px_2px_#aaa]"
        >
          <option value="">Seleccione un indicador</option>
          {indicadores.map((i) => (
            <option key={i.id} value={i.id}>
              {i.id} — {i.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Actividad */}
      <div className="mb-3">
        <label className="block text-[13px] font-semibold mb-1">Actividad</label>
        <select
          value={actividad?.id || ""}
          onChange={(e) =>
            setActividad(actividades.find((a) => a.id === e.target.value) || null)
          }
          className="w-full border border-gray-500 rounded-sm bg-white text-[13px] px-2 py-1 shadow-[inset_1px_1px_2px_#aaa]"
        >
          <option value="">Seleccione una actividad</option>
          {actividades.map((a) => (
            <option key={a.id} value={a.id}>
              {a.id} — {a.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Unidad de medida, tipo, clase */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <label className="block text-[13px] font-semibold mb-1">Unidad de Medida</label>
          <select
            value={unidadMedida}
            onChange={(e) => setUnidadMedida(e.target.value)}
            className="w-full border border-gray-500 rounded-sm bg-white text-[13px] px-2 py-1 shadow-[inset_1px_1px_2px_#aaa]"
          >
            <option value="">Seleccione</option>
            {unidadesMedida.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[13px] font-semibold mb-1">Tipo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full border border-gray-500 rounded-sm bg-white text-[13px] px-2 py-1 shadow-[inset_1px_1px_2px_#aaa]"
          >
            <option value="">Seleccione</option>
            {tipos.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[13px] font-semibold mb-1">Clase</label>
          <select
            value={clase}
            onChange={(e) => setClase(e.target.value)}
            className="w-full border border-gray-500 rounded-sm bg-white text-[13px] px-2 py-1 shadow-[inset_1px_1px_2px_#aaa]"
          >
            <option value="">Seleccione</option>
            {clases.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[13px] font-semibold mb-1">Inicio</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFechaInicio(e.target.value)}
            className="w-full border border-gray-500 rounded-sm bg-white text-[13px] px-2 py-1 shadow-[inset_1px_1px_2px_#aaa]"
          />
        </div>
        <div>
          <label className="block text-[13px] font-semibold mb-1">Conclusión</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFechaFin(e.target.value)}
            className="w-full border border-gray-500 rounded-sm bg-white text-[13px] px-2 py-1 shadow-[inset_1px_1px_2px_#aaa]"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-3 border-t border-gray-400 pt-3">
        <button className="bg-[#1c6dd0] hover:bg-[#155bb3] text-white font-semibold text-[13px] py-1.5 px-5 rounded-sm border border-gray-600 shadow-[1px_1px_0_#fff,inset_1px_1px_2px_#0004]">
          REGISTRAR
        </button>
        <button className="bg-[#c62f2f] hover:bg-[#a12020] text-white font-semibold text-[13px] py-1.5 px-5 rounded-sm border border-gray-600 shadow-[1px_1px_0_#fff,inset_1px_1px_2px_#0004]">
          SALIR
        </button>
      </div>
    </div>
  );
};

export default DetalleFormRetro;

"use client";
import React from "react";

interface IndicadorPOAFormProps {
  actividades: { id: number; descripcion: string }[];
}

export default function IndicadorPOAForm({ actividades }: IndicadorPOAFormProps) {
  const [formData, setFormData] = React.useState({
    descripcion: "",
    unidad_medida: "",
    formula: "",
    linea_base: "",
    meta: "",
    actividadId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  return (
<div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Indicador POA</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Unidad de Medida</label>
          <input
            type="text"
            name="unidad_medida"
            value={formData.unidad_medida}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Fórmula</label>
          <input
            type="text"
            name="formula"
            value={formData.formula}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Línea Base</label>
          <input
            type="text"
            name="linea_base"
            value={formData.linea_base}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Meta</label>
          <input
            type="number"
            name="meta"
            value={formData.meta}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* REFERENCIA A ACTIVIDAD */}
        <div>
          <label className="block font-medium mb-1">Actividad</label>
          <select
            name="actividadId"
            value={formData.actividadId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccione una actividad</option>
            {actividades.map((act) => (
              <option key={act.id} value={act.id}>
                {act.descripcion}
              </option>
            ))}
          </select>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Guardar
        </button>
      </form>
    </div>
  );
}

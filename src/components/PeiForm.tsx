"use client";
import React, { useState } from "react";

const PEIForm = () => {
  const [formData, setFormData] = useState({
    año_inicio: "",
    año_fin: "",
    observaciones: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    // Aquí puedes agregar la lógica para enviar a tu API
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Formulario PEI</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="año_inicio" className="block font-medium mb-1">
            Año Inicio
          </label>
          <input
            type="date"
            id="año_inicio"
            name="año_inicio"
            value={formData.año_inicio}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="año_fin" className="block font-medium mb-1">
            Año Fin
          </label>
          <input
            type="date"
            id="año_fin"
            name="año_fin"
            value={formData.año_fin}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="observaciones" className="block font-medium mb-1">
            Observaciones
          </label>
          <textarea
            id="observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Escribe tus observaciones..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Guardar PEI
        </button>
      </form>
    </div>
  );
};

export default PEIForm;
